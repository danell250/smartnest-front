export const storefrontInfo = {
  businessName: "SmartNest SA",
  whatsappDisplay: "072 569 9473",
  whatsappNumber: "27725699473",
  supportHours: "Monday to Friday, 09:00 to 17:00",
  supportResponse: "Within 1 business day",
  location: "South Africa",
  deliveryEstimate: "7-10 business days for most orders, with tracked delivery included",
  deliveryExtended: "Remote areas, pre-orders, and supplier delays may take up to 15 business days",
  returnsSummary: "7 days for damaged, defective, or incorrect items and 14 days for eligible unused returns",
  pricingNote: "All displayed prices are retail prices in South African Rand and include VAT plus standard tracked delivery within South Africa. PayPal checkout shows the USD equivalent before payment.",
  paypalUsdToZarRate: Number(import.meta.env.VITE_PAYPAL_USD_TO_ZAR_RATE || 18.5),
  paypalClientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || "AXxjiGRRXzL0lhWXhz9lUCYnIXg0Sfz-9-kDB7HbdwYPOrlspRzyS6TQWAlwRC2GlYSd4lze25jluDLj",
};

export const storefrontLinks = {
  whatsapp: `https://wa.me/${storefrontInfo.whatsappNumber}`,
};

export const buildWhatsAppOrderLink = (message: string) =>
  `${storefrontLinks.whatsapp}?text=${encodeURIComponent(message)}`;
