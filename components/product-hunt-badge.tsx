"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

const PH_URL =
  "https://www.producthunt.com/products/locksy-tab-locker-password-protection?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-locksy-tab-locker-password-protection"
const POST_ID = "1035827"

/** Product Hunt "Featured" badge, using Product Hunt's dark or light badge to match the site theme. */
export default function ProductHuntBadge({ className = "" }: { className?: string }) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  // Default to dark (the site default) until the theme is known, so the server and client agree.
  const theme = mounted && resolvedTheme === "light" ? "light" : "dark"

  return (
    <a
      href={PH_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex opacity-80 transition-opacity hover:opacity-100 ${className}`}
      title="Locksy on Product Hunt"
    >
      <img
        src={`https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=${POST_ID}&theme=${theme}`}
        alt="Locksy: Tab Locker & Password Protection, featured on Product Hunt"
        width={200}
        height={43}
        loading="lazy"
        className="h-8 w-auto"
      />
    </a>
  )
}
