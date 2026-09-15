export interface Area {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CroppedImageResult {
  blob: Blob;
  dataUrl: string;
  width: number;
  height: number;
  sizeBytes: number;
}

/**
 * Loads an image from a URL or data URL and returns an HTMLImageElement.
 */
function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });
}

function getRadianAngle(degreeValue: number): number {
  return (degreeValue * Math.PI) / 180;
}

/**
 * Returns the new bounding area of a rotated image.
 */
function rotateSize(width: number, height: number, rotation: number) {
  const rotRad = getRadianAngle(rotation);
  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}

/**
 * Crops and compresses an image on an off-screen HTML5 Canvas.
 * Constrains the output to max 400x400 (retina-ready for 127px avatar),
 * converted to JPEG at 85% quality (~25KB - 40KB).
 * Note: JPEG is used for 100% compatibility with @vercel/og (Satori).
 */
export async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area,
  rotation = 0,
  maxDimension = 400,
): Promise<CroppedImageResult> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Não foi possível inicializar o contexto 2D do Canvas.");
  }

  const rotRad = getRadianAngle(rotation);

  // Calculate bounding box of the rotated image
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.width,
    image.height,
    rotation,
  );

  // Set canvas size to match the bounding box
  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  // Translate canvas context to a central point on canvas to allow rotating around the center
  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  ctx.translate(-image.width / 2, -image.height / 2);

  // Draw rotated image
  ctx.drawImage(image, 0, 0);

  // Create a new canvas for the final cropped and resized image
  const croppedCanvas = document.createElement("canvas");
  const croppedCtx = croppedCanvas.getContext("2d");

  if (!croppedCtx) {
    throw new Error("Não foi possível inicializar o canvas de corte.");
  }

  // Determine output dimensions (scaled down to maxDimension for performance and storage)
  const targetDimension = Math.min(
    maxDimension,
    Math.max(pixelCrop.width, pixelCrop.height),
  );

  croppedCanvas.width = targetDimension;
  croppedCanvas.height = targetDimension;

  // Fill background with white in case of transparent png
  croppedCtx.fillStyle = "#ffffff";
  croppedCtx.fillRect(0, 0, targetDimension, targetDimension);

  croppedCtx.imageSmoothingEnabled = true;
  croppedCtx.imageSmoothingQuality = "high";

  // Draw the cropped area into the scaled canvas
  croppedCtx.drawImage(
    canvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    targetDimension,
    targetDimension,
  );

  // Export as JPEG (fully supported by Satori ImageResponse)
  const format = "image/jpeg";
  return new Promise<CroppedImageResult>((resolve, reject) => {
    croppedCanvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Falha ao exportar imagem do Canvas."));
          return;
        }

        const dataUrl = croppedCanvas.toDataURL(format, 0.85);
        resolve({
          blob,
          dataUrl,
          width: targetDimension,
          height: targetDimension,
          sizeBytes: blob.size,
        });
      },
      format,
      0.85,
    );
  });
}
