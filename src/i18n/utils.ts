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

// Đường dẫn ngôn ngữ khác giả định slug giống nhau (đúng cho home/blog index/projects/about).
// Trang bài viết cụ thể phải tự tính altPath chính xác qua translationKey rồi override giá trị này.
export function getDefaultAlternatePath(pathname: string, lang: Lang): string {
  const bare = pathname.replace(/^\/en(\/|$)/, "/");
  const otherLang: Lang = lang === "vi" ? "en" : "vi";
  return otherLang === "vi" ? bare : `/en${bare === "/" ? "" : bare}`;
}
