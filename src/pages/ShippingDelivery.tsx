import { Card } from "@/components/ui/card";
import TrustPageLayout from "@/components/TrustPageLayout";
import { storefrontInfo } from "@/data/storefront";

export default function ShippingDelivery() {
  return (
    <TrustPageLayout
      title="Shipping & Delivery"
      intro="We keep delivery expectations clear from the start. The estimates below are based on current supplier dispatch windows and standard delivery timelines into South Africa."
    >
      <div className="grid gap-6">
        <Card className="p-8 space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Estimated Delivery Times</h2>
          <p className="text-foreground">{storefrontInfo.deliveryEstimate}.</p>
          <p className="text-muted-foreground">
            Many supplier listings currently indicate dispatch windows of around 3 to 7 days, including several listings marked
            as 5-day dispatch and some marked as 7-day delivery. We use that as the basis for our standard estimate.
          </p>
          <p className="text-muted-foreground">{storefrontInfo.deliveryExtended}.</p>
        </Card>

        <Card className="p-8 space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">How Orders Move</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li>1. We review your order and confirm availability.</li>
            <li>2. You receive an order confirmation and payment instructions.</li>
            <li>3. Once payment is confirmed, dispatch is arranged with the supplier.</li>
            <li>4. Tracking details are shared as soon as they are available.</li>
          </ul>
        </Card>

        <Card className="p-8 space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Delivery Notes</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li>Delivery estimates are not guarantees and may change during supplier peak periods, customs processing, or courier disruptions.</li>
            <li>Orders to remote or outlying areas may take longer than metro deliveries.</li>
            <li>Displayed prices include VAT and standard tracked delivery within South Africa.</li>
          </ul>
        </Card>
      </div>
    </TrustPageLayout>
  );
}
