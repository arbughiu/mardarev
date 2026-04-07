import type { Media } from "@/payload/payload-types";

export function getMediaUrl(
  media: Media | string | number | null | undefined,
): string | null {
  if (!media) return null;
  if (typeof media === "string") return media;
  if (typeof media === "number") return null;
  const url = media.url ?? null;
  if (!url) return null;
  // Strip absolute serverURL prefix so Next.js Image treats it as same-origin
  try {
    const parsed = new URL(url);
    return parsed.pathname;
  } catch {
    return url;
  }
}
