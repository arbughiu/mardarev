import type { Media } from "@/payload/payload-types";

export function getMediaUrl(
  media: Media | string | number | null | undefined,
): string | null {
  if (!media) return null;
  if (typeof media === "string") return media;
  if (typeof media === "number") return null;
  return media.url ?? null;
}
