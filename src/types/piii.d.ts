declare module "piii" {
  export default class Piii {
    constructor(options?: {
      filters?: any[];
      repeated?: boolean;
      aliases?: Record<string, string[]>;
      censor?: string | ((badWord: string) => string);
      cleaner?: (str: string) => string;
    });
    filter(string: string): string;
    has(string: string): boolean;
  }
}

declare module "piii-filters" {
  const filters: Record<string, any>;
  export default filters;
}
