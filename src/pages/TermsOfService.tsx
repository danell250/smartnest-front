import { Card } from "@/components/ui/card";
import TrustPageLayout from "@/components/TrustPageLayout";
import { storefrontInfo } from "@/data/storefront";

export default function TermsOfService() {
  return (
    <TrustPageLayout
      title="Terms of Service"
      intro="These terms explain the basics of how orders, pricing, delivery, and returns work when you buy from SmartNest SA."
    >
      <div className="grid gap-6">
        <Card className="p-8 space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Pricing</h2>
          <p className="text-muted-foreground">{storefrontInfo.pricingNote}</p>
          <p className="text-muted-foreground">
            If delivery or special-order charges apply, those are confirmed with you before payment is finalized.
          </p>
        </Card>
        <Card className="p-8 space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Orders</h2>
          <p className="text-muted-foreground">
            Orders are subject to stock confirmation, supplier availability, and successful payment. We may cancel and refund orders that cannot be fulfilled on acceptable terms.
          </p>
        </Card>
        <Card className="p-8 space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Delivery & Returns</h2>
          <p className="text-muted-foreground">
            Delivery timelines are estimates, not guarantees. Returns and refunds are handled according to our Returns & Refunds policy.
          </p>
        </Card>
      </div>
    </TrustPageLayout>
  );
}
