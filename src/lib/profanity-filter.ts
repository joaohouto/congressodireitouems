// @ts-ignore
import PiiiModule from "piii";
// @ts-ignore
import piiiFiltersModule from "piii-filters";

const Piii = PiiiModule?.default || PiiiModule;
const piiiFilters = piiiFiltersModule?.default || piiiFiltersModule;

let piiiInstance: any = null;

function getPiiiInstance() {
  if (!piiiInstance) {
    try {
      const filters = piiiFilters ? Object.values(piiiFilters) : [];
      piiiInstance = new Piii({
        filters,
      });
    } catch (error) {
      console.error("Erro ao inicializar Piii:", error);
    }
  }
  return piiiInstance;
}

/**
 * Verifica se o texto contém palavras inadequadas usando a biblioteca Piii e piii-filters.
 */
export function containsProfanity(text: string): boolean {
  if (!text || typeof text !== "string") return false;

  const piii = getPiiiInstance();
  if (piii && typeof piii.has === "function") {
    try {
      return piii.has(text);
    } catch (err) {
      console.error("Erro ao executar filtro de profanidades:", err);
    }
  }

  return false;
}
