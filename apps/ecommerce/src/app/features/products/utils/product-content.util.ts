export interface ParsedProductContent {
  intro: string;
  bullets: string[];
}

/** Parses API fields like `25| intro; bullet one; bullet two` */
export function parseProductContent(raw?: string | null): ParsedProductContent {
  if (!raw?.trim()) {
    return { intro: '', bullets: [] };
  }

  const withoutPrefix = raw.includes('|') ? raw.split('|').slice(1).join('|').trim() : raw.trim();
  const segments = withoutPrefix
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean);

  if (!segments.length) {
    return { intro: '', bullets: [] };
  }

  return {
    intro: segments[0],
    bullets: segments.slice(1),
  };
}

export function getDisplayPrice(product: {
  price: number;
  priceAfterDiscount?: number | null;
}): { current: number; original: number | null } {
  const hasDiscount =
    product.priceAfterDiscount != null && product.priceAfterDiscount < product.price;

  return {
    current: hasDiscount ? product.priceAfterDiscount! : product.price,
    original: hasDiscount ? product.price : null,
  };
}

export function getEstimatedDeliveryDate(daysFromNow = 11): string {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}
