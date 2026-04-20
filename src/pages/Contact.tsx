import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import TrustPageLayout from "@/components/TrustPageLayout";
import { storefrontInfo, storefrontLinks } from "@/data/storefront";

export default function Contact() {
  return (
    <TrustPageLayout
      title="Contact Us"
      intro="Need help before or after ordering? The fastest way to reach us is on WhatsApp."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-8 space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Support</h2>
          <p className="text-muted-foreground">WhatsApp: {storefrontInfo.whatsappDisplay}</p>
          <p className="text-muted-foreground">Hours: {storefrontInfo.supportHours}</p>
          <p className="text-muted-foreground">Response time: {storefrontInfo.supportResponse}</p>
          <Button asChild className="w-full">
            <a href={storefrontLinks.whatsapp} target="_blank" rel="noreferrer">Message Us on WhatsApp</a>
          </Button>
        </Card>
        <Card className="p-8 space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Before You Message</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li>Include your order name or product name if you already placed an order.</li>
            <li>For delivery issues, send your tracking details if available.</li>
            <li>For returns, include clear photos of the item and packaging.</li>
          </ul>
        </Card>
      </div>
    </TrustPageLayout>
  );
}
