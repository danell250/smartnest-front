import { Button } from "@/components/ui/button";
import SiteFooter from "@/components/SiteFooter";

export default function TrustPageLayout({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between py-4">
          <a href="/" className="flex items-center gap-2">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663463860697/SLdhiRT72VUh4Up8w2TPrH/smartnest-sa-logo-4SozQvwRC7AYGTMjDcFgTA.webp"
              alt="SmartNest SA"
              className="w-10 h-10"
            />
            <span className="font-bold text-xl text-foreground">SmartNest SA</span>
          </a>
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost">
              <a href="/products">Products</a>
            </Button>
            <Button asChild>
              <a href="/contact">Contact</a>
            </Button>
          </div>
        </div>
      </nav>

      <main className="py-12">
        <div className="container max-w-4xl space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-foreground">{title}</h1>
            <p className="text-lg text-muted-foreground">{intro}</p>
          </div>
          {children}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
