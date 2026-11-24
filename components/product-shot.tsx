/**
 * Real screenshot of the Locksy extension, swapped to match the site theme.
 * Files live in public/screens/<name>-dark.png and <name>-light.png and are
 * rendered by the extension's own theme tests (`node tests/themes.test.js
 * --screenshots` in the extension repo), using synthetic data only.
 */

export type ShotName = "locked" | "biometric" | "popup" | "recovery"

const SIZES: Record<ShotName, { w: number; h: number }> = {
  locked: { w: 1012, h: 700 },
  biometric: { w: 1012, h: 700 },
  popup: { w: 420, h: 432 },
  recovery: { w: 420, h: 600 },
}

export default function ProductShot({
  name,
  alt,
  className = "",
  priority = false,
}: {
  name: ShotName
  alt: string
  className?: string
  priority?: boolean
}) {
  const { w, h } = SIZES[name]
  const common = {
    width: w,
    height: h,
    loading: priority ? ("eager" as const) : ("lazy" as const),
    decoding: "async" as const,
  }
  return (
    <>
      <img src={`/screens/${name}-light.png`} alt={alt} {...common} className={`block dark:hidden ${className}`} />
      <img src={`/screens/${name}-dark.png`} alt={alt} {...common} className={`hidden dark:block ${className}`} />
    </>
  )
}
