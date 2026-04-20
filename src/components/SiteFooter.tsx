import { storefrontInfo, storefrontLinks } from "@/data/storefront";

export default function SiteFooter() {
  return (
    <footer className="bg-foreground text-white py-12">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-semibold mb-4">{storefrontInfo.businessName}</h4>
            <p className="text-sm opacity-75">Premium robot vacuum solutions for South African homes.</p>
            <p className="text-sm opacity-75 mt-3">{storefrontInfo.pricingNote}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm opacity-75">
              <li><a href="/products" className="hover:opacity-100">Browse Products</a></li>
              <li><a href="/faq" className="hover:opacity-100">FAQ</a></li>
              <li><a href="/shipping-delivery" className="hover:opacity-100">Shipping & Delivery</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm opacity-75">
              <li><a href="/contact" className="hover:opacity-100">Contact Us</a></li>
              <li><a href={storefrontLinks.whatsapp} target="_blank" rel="noreferrer" className="hover:opacity-100">WhatsApp: {storefrontInfo.whatsappDisplay}</a></li>
              <li><a href="/returns-refunds" className="hover:opacity-100">Returns & Refunds</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Policies</h4>
            <ul className="space-y-2 text-sm opacity-75">
              <li><a href="/privacy-policy" className="hover:opacity-100">Privacy Policy</a></li>
              <li><a href="/terms-of-service" className="hover:opacity-100">Terms of Service</a></li>
              <li><a href="/shipping-delivery" className="hover:opacity-100">Delivery Estimates</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/20 pt-8 mt-8">
          <div className="text-center text-sm opacity-75">
            <p>&copy; 2026 {storefrontInfo.businessName}. All rights reserved.</p>
            <p className="mt-2 text-xs opacity-50">SmartNest SA is a proud South African company. Secure encrypted payments.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
