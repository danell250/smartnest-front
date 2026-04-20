import { Card } from "@/components/ui/card";
import TrustPageLayout from "@/components/TrustPageLayout";
import { storefrontInfo } from "@/data/storefront";

export default function ReturnsRefunds() {
  return (
    <TrustPageLayout
      title="Returns & Refunds"
      intro="If something is wrong with your order, we want you to know exactly what to do and how quickly to contact us."
    >
      <div className="grid gap-6">
        <Card className="p-8 space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Return Windows</h2>
          <p className="text-foreground">{storefrontInfo.returnsSummary}.</p>
          <ul className="space-y-3 text-muted-foreground">
            <li>Damaged, defective, or incorrect items must be reported within 7 days of delivery.</li>
            <li>Eligible unused items must be returned in original condition within 14 days of delivery.</li>
            <li>Items showing clear signs of use, accidental damage, or missing accessories may not qualify for refund.</li>
          </ul>
        </Card>

        <Card className="p-8 space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">How To Start a Return</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li>1. Contact us on WhatsApp with your order details and photos of the issue.</li>
            <li>2. We review the request and confirm whether a return, replacement, or refund is appropriate.</li>
            <li>3. If approved, we provide the next steps for collection or return shipping.</li>
          </ul>
        </Card>

        <Card className="p-8 space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Refund Handling</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li>Refunds are processed after the returned item is received and inspected.</li>
            <li>Original delivery fees are generally non-refundable unless the item was incorrect, defective, or damaged on arrival.</li>
            <li>Approved refunds are paid back to the original payment method or another verified method agreed with you.</li>
          </ul>
        </Card>
      </div>
    </TrustPageLayout>
  );
}
