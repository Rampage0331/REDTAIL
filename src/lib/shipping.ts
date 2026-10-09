import { getProductById } from '@/lib/products';

const SHIPPO_API = 'https://api.goshippo.com';
const PRINTNODE_API = 'https://api.printnode.com';

export type CartItem = { id: string; color: string; size: string; quantity: number };

export type StripeAddress = {
  line1?: string | null;
  line2?: string | null;
  city?: string | null;
  state?: string | null;
  postal_code?: string | null;
  country?: string | null;
};

// Estimated bagged weight per shirt in ounces, by size. Replace with real
// kitchen-scale numbers once the printed shirts are in hand.
const SHIRT_WEIGHT_OZ: Record<string, number> = {
  S: 7.5,
  M: 8,
  L: 8.5,
  XL: 9,
  XXL: 10,
  '3XL': 11,
};
const DEFAULT_SHIRT_OZ = 9;
const MAILER_WEIGHT_OZ = 1;

type ShippoRate = {
  object_id: string;
  provider: string;
  amount: string;
  servicelevel: { token: string; name: string };
};

type ShippoMessage = { source?: string; code?: string; text?: string };

export type LabelResult = {
  transactionId: string;
  labelUrl: string;
  trackingNumber: string;
  trackingUrl: string | null;
  carrier: string;
  service: string;
};

function shirtOz(size: string) {
  return SHIRT_WEIGHT_OZ[size] ?? DEFAULT_SHIRT_OZ;
}

function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not set`);
  return value;
}

function shippoMessages(messages: ShippoMessage[] | undefined) {
  return (messages ?? []).map((m) => m.text).filter(Boolean).join('; ');
}

async function shippoPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${SHIPPO_API}${path}`, {
    method: 'POST',
    headers: {
      Authorization: `ShippoToken ${requireEnv('SHIPPO_API_TOKEN')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`Shippo ${path} failed (${res.status}): ${JSON.stringify(data).slice(0, 300)}`);
  }
  return data as T;
}

function addressFrom() {
  return {
    name: requireEnv('SHIP_FROM_NAME'),
    street1: requireEnv('SHIP_FROM_STREET1'),
    street2: process.env.SHIP_FROM_STREET2 ?? '',
    city: requireEnv('SHIP_FROM_CITY'),
    state: requireEnv('SHIP_FROM_STATE'),
    zip: requireEnv('SHIP_FROM_ZIP'),
    country: process.env.SHIP_FROM_COUNTRY ?? 'US',
    email: process.env.SHIP_FROM_EMAIL ?? '',
    phone: requireEnv('SHIP_FROM_PHONE'),
  };
}

// USPS works through Shippo with no extra carrier signup; other carriers
// (e.g. UPS) fail at purchase until their account is activated in Shippo.
function pickRate(rates: ShippoRate[], domestic: boolean): ShippoRate | undefined {
  const cheapest = (list: ShippoRate[]) => [...list].sort((a, b) => Number(a.amount) - Number(b.amount))[0];
  const usps = rates.filter((r) => r.provider === 'USPS');
  if (domestic) {
    const groundAdvantage = usps.find((r) => r.servicelevel?.token === 'usps_ground_advantage');
    if (groundAdvantage) return groundAdvantage;
  }
  return cheapest(usps) ?? cheapest(rates);
}

export async function buyLabel(input: {
  name: string;
  email?: string | null;
  address: StripeAddress;
  items: CartItem[];
  orderRef: string;
}): Promise<LabelResult> {
  const country = input.address.country ?? 'US';
  const domestic = country === 'US';
  const from = addressFrom();

  if (!input.address.line1 || !input.address.city || !input.address.postal_code) {
    throw new Error('Order is missing a complete shipping address');
  }

  const totalQty = input.items.reduce((sum, i) => sum + i.quantity, 0);
  const contentsOz = input.items.reduce((sum, i) => sum + shirtOz(i.size) * i.quantity, 0);

  let customsDeclaration: string | undefined;
  if (!domestic) {
    const declaration = await shippoPost<{ object_id: string }>('/customs/declarations/', {
      contents_type: 'MERCHANDISE',
      non_delivery_option: 'RETURN',
      certify: true,
      certify_signer: from.name,
      incoterm: 'DDU',
      eel_pfc: country === 'CA' ? 'NOEEI_30_36' : 'NOEEI_30_37_a',
      items: input.items.map((item) => ({
        description: '100% cotton t-shirt',
        quantity: item.quantity,
        net_weight: (shirtOz(item.size) * item.quantity).toFixed(1),
        mass_unit: 'oz',
        value_amount: ((getProductById(item.id)?.price ?? 0) * item.quantity).toFixed(2),
        value_currency: 'USD',
        origin_country: 'US',
        tariff_number: '6109.10',
      })),
    });
    customsDeclaration = declaration.object_id;
  }

  const shipment = await shippoPost<{ rates: ShippoRate[]; messages?: ShippoMessage[] }>('/shipments/', {
    address_from: from,
    address_to: {
      name: input.name,
      street1: input.address.line1,
      street2: input.address.line2 ?? '',
      city: input.address.city,
      state: input.address.state ?? '',
      zip: input.address.postal_code,
      country,
      email: input.email ?? '',
    },
    parcels: [
      {
        length: '13',
        width: '10',
        height: String(Math.max(1, totalQty)),
        distance_unit: 'in',
        weight: (contentsOz + MAILER_WEIGHT_OZ).toFixed(1),
        mass_unit: 'oz',
      },
    ],
    ...(customsDeclaration ? { customs_declaration: customsDeclaration } : {}),
    metadata: input.orderRef,
    async: false,
  });

  const rate = pickRate(shipment.rates ?? [], domestic);
  if (!rate) {
    throw new Error(`No shipping rates returned. ${shippoMessages(shipment.messages)}`.trim());
  }

  const transaction = await shippoPost<{
    status: string;
    object_id: string;
    label_url: string;
    tracking_number: string;
    tracking_url_provider: string | null;
    messages?: ShippoMessage[];
  }>('/transactions/', {
    rate: rate.object_id,
    label_file_type: 'PDF_4x6',
    metadata: input.orderRef,
    async: false,
  });

  if (transaction.status !== 'SUCCESS' || !transaction.label_url) {
    throw new Error(`Label purchase failed. ${shippoMessages(transaction.messages)}`.trim());
  }

  return {
    transactionId: transaction.object_id,
    labelUrl: transaction.label_url,
    trackingNumber: transaction.tracking_number,
    trackingUrl: transaction.tracking_url_provider,
    carrier: rate.provider,
    service: rate.servicelevel?.name ?? '',
  };
}

export async function printLabel(labelUrl: string, title: string): Promise<number> {
  const auth = Buffer.from(`${requireEnv('PRINTNODE_API_KEY')}:`).toString('base64');
  const printerId = Number(requireEnv('PRINTNODE_PRINTER_ID'));
  const paper = process.env.PRINTNODE_PAPER;

  const res = await fetch(`${PRINTNODE_API}/printjobs`, {
    method: 'POST',
    headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      printerId,
      title,
      contentType: 'pdf_uri',
      content: labelUrl,
      source: 'REDTAIL website',
      options: { fit_to_page: true, ...(paper ? { paper } : {}) },
    }),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(`PrintNode failed (${res.status}): ${JSON.stringify(data).slice(0, 300)}`);
  }
  return Number(data);
}
