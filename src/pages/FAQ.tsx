import { Card } from "@/components/ui/card";
import TrustPageLayout from "@/components/TrustPageLayout";
import { storefrontInfo } from "@/data/storefront";

export default function FAQ() {
  return (
    <TrustPageLayout
      title="Frequently Asked Questions"
      intro="Here are the key answers customers usually want before placing an order."
    >
      <div className="grid gap-6">
        <Card className="p-8 space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Who am I buying from?</h2>
          <p className="text-muted-foreground">{storefrontInfo.businessName}.</p>
        </Card>
        <Card className="p-8 space-y-3">
          <h2 className="text-xl font-semibold text-foreground">How do I contact you?</h2>
          <p className="text-muted-foreground">The fastest channel is WhatsApp on {storefrontInfo.whatsappDisplay}.</p>
        </Card>
        <Card className="p-8 space-y-3">
          <h2 className="text-xl font-semibold text-foreground">How long does delivery take?</h2>
          <p className="text-muted-foreground">{storefrontInfo.deliveryEstimate}. {storefrontInfo.deliveryExtended}.</p>
        </Card>
        <Card className="p-8 space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Can I return an item?</h2>
          <p className="text-muted-foreground">{storefrontInfo.returnsSummary}.</p>
        </Card>
        <Card className="p-8 space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Is checkout secure?</h2>
          <p className="text-muted-foreground">
            We do not ask you to enter card details directly on this site. Orders are confirmed first, then secure payment instructions are shared after stock and delivery details are verified.
          </p>
        </Card>
        <Card className="p-8 space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Are displayed prices final?</h2>
          <p className="text-muted-foreground">{storefrontInfo.pricingNote}</p>
        </Card>
        <Card className="p-8 space-y-3">
          <h2 className="text-xl font-semibold text-foreground">What about load shedding?</h2>
          <p className="text-muted-foreground">
            Our robot vacuums feature automatic "Resume Cleaning" technology. If power is lost, they will return to their dock (if battery permits) and resume exactly where they left off once power is restored. Most models also have a "Battery-Safe" mode for scheduled cleans.
          </p>
        </Card>
        <Card className="p-8 space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Do you have local support?</h2>
          <p className="text-muted-foreground">
            Yes, SmartNest SA is a registered South African business. We provide local technical support via WhatsApp and handle all warranty claims locally to ensure you're never left in the dark.
          </p>
        </Card>
      </div>
    </TrustPageLayout>
  );
}
