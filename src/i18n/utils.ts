import { ui, defaultLang, type Lang, type UiKey } from "./ui";

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as Lang;
  return defaultLang as Lang;
}

export function useTranslations(lang: Lang) {
  return function t(key: UiKey) {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

export function getLocalizedPath(path: string, lang: Lang) {
  if (lang === defaultLang) return path;
  return `/${lang}${path}`;
}
