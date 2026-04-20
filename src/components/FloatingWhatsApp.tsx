import { MessageCircle } from "lucide-react";
import { storefrontInfo, storefrontLinks } from "@/data/storefront";

export default function FloatingWhatsApp() {
  return (
    <a
      href={storefrontLinks.whatsapp}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
      aria-label="Contact us on WhatsApp"
    >
      <div className="absolute right-full mr-4 bg-white text-foreground px-4 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap hidden md:block pointer-events-none border border-border">
        <p className="text-sm font-semibold">Questions? Chat with us!</p>
        <p className="text-xs opacity-75">Local Support: {storefrontInfo.whatsappDisplay}</p>
      </div>
      <MessageCircle className="w-8 h-8 fill-current" />
    </a>
  );
}
