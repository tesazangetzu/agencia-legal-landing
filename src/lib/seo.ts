import { site } from "@/data/site";

export function absoluteUrl(path = "/"): string {
  const base = site.url.replace(/\/+$/, "");
  if (!path || path === "/") return `${base}/`;
  const normalized = path.replace(/^\/+/, "").replace(/\/+$/, "");
  return `${base}/${normalized}`;
}

export function legalServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: site.name,
    url: absoluteUrl("/"),
    description: site.description,
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.street}, ${site.address.district}`,
      addressLocality: site.address.city,
      addressCountry: site.address.countryCode,
    },
    areaServed: site.countryCode,
    priceRange: "$$",
    openingHours: site.openingHours,
  };
}
