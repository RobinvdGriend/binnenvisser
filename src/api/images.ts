import { CMS_URL } from "@/config";

interface GetImageUrlOptions {
  fit?: "cover" | "contain" | "inside" | "outside";
  width?: number;
  format?: "auto" | "jpg" | "png" | "webp" | "tiff";
  withoutEnlargement?: "true" | "false";
}

export function getImageUrl(
  imageId: string,
  options: GetImageUrlOptions = {}
): string {
  const { fit = "outside", width, format = "auto", withoutEnlargement = "false" } = options;

  const url = new URL(`${CMS_URL}/assets/${imageId}`);

  if (width) {
    const params = new URLSearchParams({
      fit: fit,
      width: String(width),
      format: format,
      withoutEnlargement,
    });

    return url.toString() + '?' + params;
  } else {
    return url.toString();
  }
}
