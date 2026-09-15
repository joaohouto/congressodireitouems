import { createClient } from "@supabase/supabase-js";
import { randomUUID } from "crypto";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "";

export const supabase =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      })
    : null;

const AVATARS_BUCKET = process.env.SUPABASE_AVATARS_BUCKET || "avatars";

// Strict whitelist of permitted image MIME types
const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]);

const MAX_AVATAR_SIZE_BYTES = 500 * 1024; // 500KB max (compressed crops are ~30KB)

/**
 * Validates the image buffer by inspecting its magic bytes (file signature).
 * This prevents uploading arbitrary or malicious files disguised with an image MIME type.
 */
function isValidImageSignature(buffer: Buffer, mimeType: string): boolean {
  if (buffer.length < 12) return false;

  // JPEG: FF D8 FF
  if (mimeType === "image/jpeg" || mimeType === "image/jpg") {
    return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  }

  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (mimeType === "image/png") {
    return (
      buffer[0] === 0x89 &&
      buffer[1] === 0x50 &&
      buffer[2] === 0x4e &&
      buffer[3] === 0x47
    );
  }

  // WebP: RIFF ... WEBP
  if (mimeType === "image/webp") {
    return (
      buffer[0] === 0x52 &&
      buffer[1] === 0x49 &&
      buffer[2] === 0x46 &&
      buffer[3] === 0x46 &&
      buffer[8] === 0x57 &&
      buffer[9] === 0x45 &&
      buffer[10] === 0x42 &&
      buffer[11] === 0x50
    );
  }

  return false;
}

/**
 * Uploads an avatar image buffer to Supabase Storage and returns its permanent public URL.
 */
export async function uploadAvatarToSupabase(
  imageBuffer: Buffer,
  contentType: string = "image/jpeg",
): Promise<string> {
  if (!supabase) {
    console.warn(
      "[Supabase] Credenciais não configuradas (NEXT_PUBLIC_SUPABASE_URL ou chave de acesso).",
    );
    return "";
  }

  const normalizedMime = contentType.toLowerCase().trim();

  // 1. Strict MIME type whitelist
  if (!ALLOWED_MIME_TYPES.has(normalizedMime)) {
    console.error("[Supabase Storage] Tipo MIME não permitido:", normalizedMime);
    return "";
  }

  // 2. Maximum file size check
  if (imageBuffer.length > MAX_AVATAR_SIZE_BYTES) {
    console.error(
      `[Supabase Storage] Imagem excede tamanho máximo permitido (${imageBuffer.length} > ${MAX_AVATAR_SIZE_BYTES} bytes).`,
    );
    return "";
  }

  // 3. Magic bytes validation
  if (!isValidImageSignature(imageBuffer, normalizedMime)) {
    console.error(
      "[Supabase Storage] Assinatura do arquivo inválida (magic bytes não correspondem ao tipo de imagem).",
    );
    return "";
  }

  const extension = normalizedMime.includes("png")
    ? "png"
    : normalizedMime.includes("webp")
      ? "webp"
      : "jpg";

  // Prevent path traversal by generating a strictly controlled random filename
  const filename = `${Date.now()}-${randomUUID()}.${extension}`;

  try {
    const { data, error } = await supabase.storage
      .from(AVATARS_BUCKET)
      .upload(filename, imageBuffer, {
        contentType: normalizedMime,
        cacheControl: "31536000",
        upsert: false,
      });

    if (error) {
      console.error("[Supabase Storage] Erro ao fazer upload:", error.message);

      // Se o bucket não existir, tenta criá-lo automaticamente e refaz o upload
      if (
        error.message.includes("Bucket not found") ||
        error.message.includes("bucket does not exist")
      ) {
        try {
          await supabase.storage.createBucket(AVATARS_BUCKET, {
            public: true,
          });

          const retry = await supabase.storage
            .from(AVATARS_BUCKET)
            .upload(filename, imageBuffer, {
              contentType: normalizedMime,
              cacheControl: "31536000",
              upsert: false,
            });

          if (!retry.error) {
            const { data: publicData } = supabase.storage
              .from(AVATARS_BUCKET)
              .getPublicUrl(filename);
            return publicData.publicUrl;
          }
        } catch (createErr) {
          console.error(
            "[Supabase Storage] Não foi possível criar bucket automaticamente:",
            createErr,
          );
        }
      }

      return "";
    }

    const { data: publicData } = supabase.storage
      .from(AVATARS_BUCKET)
      .getPublicUrl(data.path);

    return publicData.publicUrl;
  } catch (err) {
    console.error("[Supabase Storage] Exceção durante upload:", err);
    return "";
  }
}

/**
 * Parses a base64 data URL (e.g. data:image/jpeg;base64,...), validates the payload,
 * converts to Buffer, and uploads to Supabase Storage. Returns the public URL.
 */
export async function uploadAvatarDataUrlToSupabase(
  dataUrl: string,
): Promise<string> {
  if (!dataUrl || !dataUrl.startsWith("data:")) {
    return "";
  }

  // Prevent parsing huge data URLs that could cause ReDoS or memory spikes
  if (dataUrl.length > 750 * 1024) {
    console.error("[Supabase Storage] Data URL excede o limite máximo permitido.");
    return "";
  }

  const matches = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
  if (!matches) {
    return "";
  }

  const contentType = matches[1].toLowerCase().trim();
  const base64Data = matches[2];

  if (!ALLOWED_MIME_TYPES.has(contentType)) {
    console.error(
      "[Supabase Storage] Tipo de imagem não permitido no data URL:",
      contentType,
    );
    return "";
  }

  let buffer: Buffer;
  try {
    buffer = Buffer.from(base64Data, "base64");
  } catch {
    console.error("[Supabase Storage] Falha ao decodificar Base64.");
    return "";
  }

  return uploadAvatarToSupabase(buffer, contentType);
}
