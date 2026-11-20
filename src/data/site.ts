export const site = {
  name: "Lex Aurea",
  legalName: "Lex Aurea Abogados",
  tagline: "Asesoría legal con criterio y cercanía",
  description:
    "Despacho de abogados en Lima, Perú. Asesoría en derecho corporativo, civil y laboral para empresas y personas, con criterio estratégico y trato directo.",
  url: "https://lexaurea.example",
  locale: "es_PE",
  city: "Lima",
  country: "Perú",
  countryCode: "PE",
  email: "contacto@lexaurea.example",
  phone: "+51 999 999 999",
  phoneHref: "tel:+51999999999",
  whatsapp: "+51 999 999 999",
  whatsappHref: "https://wa.me/51999999999",
  address: {
    street: "Av. Rivera Navarrete 475, piso 12",
    district: "San Isidro",
    city: "Lima",
    country: "Perú",
    countryCode: "PE",
  },
  hours: "Lunes a viernes, 9:00–18:00 (GMT-5)",
  openingHours: "Mo-Fr 09:00-18:00",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Av.+Rivera+Navarrete+475+San+Isidro+Lima",
  ogImage: "/og-image.png",
} as const;

export const navigation = [
  { label: "Servicios", href: "#servicios" },
  { label: "Equipo", href: "#equipo" },
  { label: "Proceso", href: "#proceso" },
  { label: "FAQ", href: "#faq" },
  { label: "Contacto", href: "#contacto" },
] as const;
