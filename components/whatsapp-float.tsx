import WhatsAppIcon from "./whatsapp-icon"
import { WHATSAPP_CHANNEL_URL } from "@/lib/social-links"

// Floating support button pinned to the bottom-left corner. Mirrors the Crisp
// chat widget (bottom-right) so both support entry points sit in the corners.
// Collapsed to just the icon by default and expands on hover.
//
// z-40 deliberately sits below the header (z-50) and the cookie banner
// (z-[100]); the bottom-left corner keeps it clear of the Crisp widget on the
// right.
export default function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_CHANNEL_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Follow the Locksy Support channel on WhatsApp"
      title="Follow Locksy Support on WhatsApp"
      className="group fixed bottom-4 left-4 z-40 flex items-center rounded-full bg-[#25D366] p-3 text-white shadow-lg shadow-black/20 transition-all duration-300 hover:bg-[#1ebe5b] hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] print:hidden"
    >
      <WhatsAppIcon className="h-6 w-6 flex-shrink-0" />
      <span className="ml-0 max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300 group-hover:ml-2 group-hover:max-w-[12rem] group-hover:opacity-100">
        Join our WhatsApp
      </span>
    </a>
  )
}
