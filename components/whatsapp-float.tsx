import WhatsAppIcon from "./whatsapp-icon"
import { WHATSAPP_CHANNEL_URL } from "@/lib/social-links"

// Side tab pinned to the left edge, vertically centred. Collapsed to just the
// icon by default and expands on hover, so it stays out of the way of content.
//
// z-40 deliberately sits below the header (z-50) and the cookie banner
// (z-[100]), and the left edge keeps it clear of the Crisp widget on the right.
export default function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_CHANNEL_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Follow the Locksy Support channel on WhatsApp"
      title="Follow Locksy Support on WhatsApp"
      className="group fixed left-0 top-1/2 z-40 flex -translate-y-1/2 items-center rounded-r-2xl bg-[#25D366] p-3 text-white shadow-lg shadow-black/20 transition-all duration-300 hover:bg-[#1ebe5b] hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] print:hidden"
    >
      <WhatsAppIcon className="h-6 w-6 flex-shrink-0" />
      <span className="ml-0 max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300 group-hover:ml-2 group-hover:max-w-[12rem] group-hover:opacity-100">
        Join our WhatsApp
      </span>
    </a>
  )
}
