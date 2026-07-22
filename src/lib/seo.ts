import { siteConfig } from "../site.config";
import { getLocalizedPath } from "../i18n/utils";
import type { Lang } from "../i18n/ui";

export function personJsonLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: new URL(getLocalizedPath("/about", lang), siteConfig.url).toString(),
    image: new URL(siteConfig.avatar, siteConfig.url).toString(),
    jobTitle: "Marketing & Event Operations Manager",
    description: siteConfig.description[lang],
    worksFor: {
      "@type": "Organization",
      name: "Aseanwindow",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ho Chi Minh City",
      addressCountry: "VN",
    },
    sameAs: [
      siteConfig.social.github,
      siteConfig.social.facebook,
      siteConfig.social.linkedin,
      siteConfig.social.twitter,
    ].filter(Boolean),
  };
}
