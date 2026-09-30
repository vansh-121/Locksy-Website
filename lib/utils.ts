import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Turn a heading's text into a stable URL-fragment id. Used to give blog
// article headings anchors so the table of contents can link to them and AI
// answer engines can deep-link/cite a specific section. Mirrors the slug rules
// used elsewhere (lowercase, alphanumeric + hyphens).
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}
