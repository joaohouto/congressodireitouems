import axios from "axios";

export type InstagramProfileResult =
  | { outcome: "ok"; igAvatar: string; igName: string }
  | { outcome: "not_found"; message: string }
  | { outcome: "rate_limited"; message: string }
  | { outcome: "error"; message: string };

const SOCIAL_CRAWLERS = [
  "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
  "WhatsApp/2.21.12.21 A",
  "Twitterbot/1.0",
  "TelegramBot (like TwitterBot)",
];

const successCache = new Map<
  string,
  { result: Extract<InstagramProfileResult, { outcome: "ok" }>; expiresAt: number }
>();
const SUCCESS_CACHE_MS = 10 * 60 * 1000;

function pruneSuccessCache() {
  const now = Date.now();
  for (const [key, entry] of successCache.entries()) {
    if (now > entry.expiresAt) {
      successCache.delete(key);
    }
  }
}

export function sanitizeInstagramUsername(raw: string): string {
  if (!raw) return "";

  let cleaned = raw.trim();

  // If user pasted a full URL (e.g. https://instagram.com/username)
  try {
    if (cleaned.startsWith("http://") || cleaned.startsWith("https://")) {
      const url = new URL(cleaned);
      const pathParts = url.pathname.split("/").filter(Boolean);
      if (pathParts.length > 0) {
        cleaned = pathParts[0];
      }
    }
  } catch {
    // Ignore URL parse error
  }

  // Remove leading @ and unwanted characters
  cleaned = cleaned.replace(/^@+/, "");
  // Keep only valid instagram username characters: letters, numbers, underscores, dots
  cleaned = cleaned.replace(/[^a-zA-Z0-9._]/g, "");

  return cleaned.toLowerCase();
}

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&#064;/g, "@")
    .replace(/&#x2022;/g, "•")
    .replace(/&bull;/g, "•")
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&#xed;/g, "í")
    .replace(/&#xe1;/g, "á")
    .replace(/&#xe9;/g, "é")
    .replace(/&#xf3;/g, "ó")
    .replace(/&#xfa;/g, "ú")
    .replace(/&#xe3;/g, "ã")
    .replace(/&#xf5;/g, "õ")
    .replace(/&#xe7;/g, "ç");
}

async function convertImageToBase64DataUrl(imageUrl: string): Promise<string> {
  if (!imageUrl) return "";

  try {
    const cleanUrl = imageUrl.replace(/&amp;/g, "&");

    // Only allow HTTP/HTTPS URLs
    if (!cleanUrl.startsWith("http://") && !cleanUrl.startsWith("https://")) {
      return "";
    }

    const response = await axios.get(cleanUrl, {
      responseType: "arraybuffer",
      timeout: 4000,
      maxContentLength: 5 * 1024 * 1024, // 5MB limit
      maxBodyLength: 5 * 1024 * 1024,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
        Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
      },
    });

    const contentType =
      response.headers["content-type"] || "image/jpeg";
    const base64 = Buffer.from(response.data).toString("base64");
    return `data:${contentType};base64,${base64}`;
  } catch (error) {
    console.error("Erro ao converter avatar do Instagram para base64:", error);
    return imageUrl.replace(/&amp;/g, "&");
  }
}

async function fetchInstagramProfileViaCrawler(
  username: string,
): Promise<InstagramProfileResult> {
  const cleanUser = sanitizeInstagramUsername(username);
  if (!cleanUser) {
    return { outcome: "not_found", message: "Usuário inválido!" };
  }

  let lastStatus = 0;

  for (const userAgent of SOCIAL_CRAWLERS) {
    try {
      const response = await axios.get(
        `https://www.instagram.com/${cleanUser}/`,
        {
          headers: {
            "User-Agent": userAgent,
            Accept:
              "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
          },
          timeout: 5000,
        },
      );

      const html = response.data as string;

      // Check for not found page indications
      if (
        html.includes("Page Not Found") ||
        html.includes("Esta página não está disponível") ||
        html.includes("Sorry, this page") ||
        html.includes("The link you followed may be broken")
      ) {
        return {
          outcome: "not_found",
          message: "Não encontramos esse usuário no Instagram!",
        };
      }

      // Match og:image or twitter:image
      const ogImageMatch =
        html.match(/property="og:image"\s+content="([^"]+)"/i) ||
        html.match(/content="([^"]+)"\s+property="og:image"/i) ||
        html.match(/name="twitter:image"\s+content="([^"]+)"/i) ||
        html.match(/content="([^"]+)"\s+name="twitter:image"/i);

      // Match og:title or twitter:title
      const ogTitleMatch =
        html.match(/property="og:title"\s+content="([^"]+)"/i) ||
        html.match(/content="([^"]+)"\s+property="og:title"/i) ||
        html.match(/name="twitter:title"\s+content="([^"]+)"/i) ||
        html.match(/content="([^"]+)"\s+name="twitter:title"/i);

      const rawImageUrl = ogImageMatch ? ogImageMatch[1] : "";
      const rawTitle = ogTitleMatch ? ogTitleMatch[1] : "";

      if (rawImageUrl || rawTitle) {
        const decodedTitle = decodeHtmlEntities(rawTitle);

        // Pattern is usually "Full Name (@username) • Instagram..." or "(@username) • Instagram..."
        let fullName = "";
        const nameMatch = decodedTitle.match(/^(.*?)\s*\(@[a-zA-Z0-9._]+\)/);
        if (nameMatch && nameMatch[1].trim()) {
          fullName = nameMatch[1].trim();
        } else {
          fullName = cleanUser;
        }

        // Convert the avatar URL to permanent base64 data URL
        let base64Avatar = "";
        if (rawImageUrl) {
          base64Avatar = await convertImageToBase64DataUrl(rawImageUrl);
        }

        return {
          outcome: "ok",
          igAvatar: base64Avatar,
          igName: fullName,
        };
      } else {
        // Page loaded without profile metadata -> user does not exist
        return {
          outcome: "not_found",
          message: "Não encontramos esse usuário no Instagram!",
        };
      }
    } catch (error: any) {
      lastStatus = error?.response?.status || 500;
      if (error?.response?.status === 404) {
        return {
          outcome: "not_found",
          message: "Não encontramos esse usuário no Instagram!",
        };
      }
    }
  }

  if (lastStatus === 429) {
    return {
      outcome: "rate_limited",
      message: "O Instagram está temporariamente sobrecarregado. Tente novamente em instantes.",
    };
  }

  return {
    outcome: "error",
    message: "Não foi possível obter os dados do Instagram neste momento.",
  };
}

export async function fetchInstagramProfile(
  username: string,
): Promise<InstagramProfileResult> {
  const clean = sanitizeInstagramUsername(username);
  if (!clean) {
    return { outcome: "not_found", message: "Informe um usuário válido!" };
  }

  const cached = successCache.get(clean);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.result;
  }

  const result = await fetchInstagramProfileViaCrawler(clean);

  if (result.outcome === "ok") {
    if (successCache.size > 100) {
      pruneSuccessCache();
    }
    successCache.set(clean, {
      result,
      expiresAt: Date.now() + SUCCESS_CACHE_MS,
    });
  }

  return result;
}
