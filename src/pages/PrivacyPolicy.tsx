import { Card } from "@/components/ui/card";
import TrustPageLayout from "@/components/TrustPageLayout";

export default function PrivacyPolicy() {
  return (
    <TrustPageLayout
      title="Privacy Policy"
      intro="We only use the information needed to process orders, support customers, and improve the shopping experience."
    >
      <div className="grid gap-6">
        <Card className="p-8 space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">What We Collect</h2>
          <p className="text-muted-foreground">
            We may collect your name, phone number, email address, delivery address, and order details when you place an order or contact us.
          </p>
        </Card>
        <Card className="p-8 space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">How We Use It</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li>To confirm and fulfill your order</li>
            <li>To share delivery updates and support messages</li>
            <li>To resolve disputes, returns, and refunds</li>
          </ul>
        </Card>
        <Card className="p-8 space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Payment & Security</h2>
          <p className="text-muted-foreground">
            We do not ask you to type card details directly into this site. Payment is finalized only through secure payment instructions or verified payment channels shared after order confirmation.
          </p>
        </Card>
      </div>
    </TrustPageLayout>
  );
}
