export interface QuickTermSingle {
  text: string;
  ruby?: string;
  jaRuby?: string;
}

export interface QuickTermDefinition extends QuickTermSingle {
  short?: string;
  slug?: string;
  others?: QuickTermSingle[];
  ref?: {
    w?: {
      ja?: string;
      en?: string;
    };
  };
}

//export const toSlug = (name: string) => {
//  const q = quickTerms[name];
//  if (!q) return 'error--';
//  return q.text || q.ruby;
//};
