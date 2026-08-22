export const specialistQuoteServices = [
  "Rope Access Painting",
  "High-Rise Building Repairs",
  "Rope Access Glass & Cladding Cleaning",
  "Gondola Access Services",
  "External Building Refurbishment",
  "Re-Siliconing & Sealant Repairs",
  "Concrete & Structural Repairs",
  "High-Rise Roof Repairs",
] as const;

export const specialistProjectCategories = [
  "Rope Access Painting",
  "Rope Access Repairs",
  "Glass & Cladding Cleaning",
  "Gondola Services",
  "External Building Refurbishment",
  "Structural / Concrete Repair",
] as const;

export type SpecialistService = {
  slug: string;
  title: string;
  shortTitle: string;
  h1: string;
  eyebrow: string;
  description: string;
  intro: string;
  quoteService: (typeof specialistQuoteServices)[number];
  includes: string[];
  considerations: string[];
  process: string[];
  faqs: { question: string; answer: string }[];
  related: string[];
};

export const specialistServices: SpecialistService[] = [
  {
    slug: "rope-access-painting",
    title: "Rope Access Painting Colombo | High-Rise Exterior Painting | ABLE",
    shortTitle: "Rope Access Painting",
    h1: "Rope Access Painting for High-Rise Buildings in Colombo",
    eyebrow: "High-rise exterior painting",
    description: "Rope access painting for suitable high-rise buildings across Colombo and Greater Colombo, including exterior preparation, finishing and difficult-access maintenance.",
    intro: "ABLE provides exterior painting and associated refurbishment for suitable high-rise façades and difficult-access building areas. Rope access may offer a practical way to reach exterior walls where conventional access is difficult, but the appropriate method depends on the property and the work required.",
    quoteService: "Rope Access Painting",
    includes: ["Exterior wall and façade painting", "Surface preparation and finishing", "Difficult-access building areas", "External building refurbishment", "Re-siliconing and related exterior repairs"],
    considerations: ["Building design and available access", "Condition and extent of the surface", "Site conditions and nearby occupied areas", "The scope, materials and safety requirements"],
    process: ["Send the building location, photographs and a clear description of the exterior areas.", "ABLE reviews the scope and arranges a site assessment when required.", "The suitable access method, preparation, finish and quotation are discussed before work is agreed."],
    faqs: [
      { question: "Can rope access be used for every high-rise painting job?", answer: "No. Suitability depends on the building design, access, scope, site conditions and safety requirements. The working method is reviewed for each property." },
      { question: "Can you assess difficult-access exterior walls?", answer: "Yes. Share photographs and the building location to begin the review. A site assessment may be needed before the access method and quotation can be confirmed." },
    ],
    related: ["rope-access-building-repairs", "gondola-access-services"],
  },
  {
    slug: "rope-access-building-repairs",
    title: "High-Rise Building Repairs Colombo | Rope Access Repairs | ABLE",
    shortTitle: "High-Rise Building Repairs",
    h1: "High-Rise Building Repairs & Rope Access Work in Colombo",
    eyebrow: "Repairs at height",
    description: "High-rise building repairs across Colombo and Greater Colombo, including plastering, crack remedial work, concrete repairs and difficult-access exterior maintenance.",
    intro: "ABLE undertakes suitable repair and remedial work on multi-storey and difficult-access exterior areas. The service is intended for building maintenance and repair at height; it does not represent structural-engineering design or certification.",
    quoteService: "High-Rise Building Repairs",
    includes: ["Rope access plastering", "Crack repairs and remedial works", "Concrete repairs and structural repair support", "Masonry restoration works", "High-rise roof repairs", "Exterior repair and refurbishment work"],
    considerations: ["The visible condition and likely cause of damage", "Access to the affected exterior area", "Materials, weather exposure and surrounding property", "Whether appropriate professional assessment is required"],
    process: ["Provide photographs, location and details of cracking, damage or water entry where known.", "ABLE reviews access and scope; some structural repairs may require appropriate professional assessment before work proceeds.", "The agreed repair approach and quotation are confirmed before scheduling."],
    faqs: [
      { question: "Do you handle concrete or masonry repairs at height?", answer: "ABLE considers suitable concrete repair, masonry restoration and associated exterior remedial work. The exact scope and any need for professional assessment are reviewed first." },
      { question: "Do high-rise roof repairs include general residential roofing?", answer: "No. This service is limited to suitable high-rise or difficult-access repair work. It does not include general roof replacement or roof installation." },
    ],
    related: ["rope-access-painting", "rope-access-glass-cladding-cleaning", "gondola-access-services"],
  },
  {
    slug: "rope-access-glass-cladding-cleaning",
    title: "Rope Access Glass & Cladding Cleaning Colombo | ABLE",
    shortTitle: "Glass & Cladding Cleaning",
    h1: "Rope Access Glass & Cladding Cleaning in Colombo",
    eyebrow: "High-rise façade cleaning",
    description: "Glass, cladding and external façade cleaning for suitable high-rise buildings across Colombo and Greater Colombo, with related sealant repairs where appropriate.",
    intro: "Rope access can provide a practical access method for suitable high-rise façades where conventional access may be difficult. ABLE considers external glass, cladding and façade cleaning for apartments, offices, commercial buildings and other managed multi-storey properties.",
    quoteService: "Rope Access Glass & Cladding Cleaning",
    includes: ["High-rise external glass cleaning", "Cladding surface cleaning", "External façade cleaning", "Difficult-access glazing", "Re-siliconing and sealant repairs where relevant"],
    considerations: ["Façade design and glazing access", "Cladding or exterior surface type", "Soiling, staining and the requested finish", "Building access, occupants and site conditions"],
    process: ["Share current photographs, the building location and the areas requiring cleaning.", "ABLE reviews the surface and suitable access options for the property.", "The proposed scope, treatment and quotation are confirmed before work begins."],
    faqs: [
      { question: "Do you provide both glass and cladding cleaning?", answer: "Yes, for suitable buildings and surfaces. The treatment is selected according to the glazing, cladding or façade surface and its condition." },
      { question: "Can sealant repairs be included?", answer: "Re-siliconing and related sealant repairs can be considered where relevant. The affected joints and access requirements need to be assessed." },
    ],
    related: ["gondola-access-services", "rope-access-building-repairs"],
  },
  {
    slug: "gondola-access-services",
    title: "Gondola Painting & Cleaning Services Colombo | ABLE",
    shortTitle: "Gondola Access Services",
    h1: "Gondola Painting, Cleaning & Exterior Repairs in Colombo",
    eyebrow: "Suspended platform access",
    description: "Gondola access services for suitable high-rise buildings in Colombo and Greater Colombo, including exterior painting, glass and cladding cleaning, and sealant repairs.",
    intro: "A building service gondola is a suspended access platform used on suitable properties to reach external façades for maintenance, painting, cleaning and repair work. Not every building has suitable gondola infrastructure, so access and property compatibility are assessed for each enquiry.",
    quoteService: "Gondola Access Services",
    includes: ["Gondola exterior wall painting and repairs", "High-rise external glass cleaning", "Exterior cladding cleaning", "Façade maintenance", "Re-siliconing and glazing or cladding sealant repairs"],
    considerations: ["Available and suitable building gondola infrastructure", "External wall, glazing and cladding configuration", "The requested painting, cleaning or repair scope", "Site access, operating conditions and safety requirements"],
    process: ["Send building information, photographs and details of the available gondola system if known.", "ABLE reviews whether gondola access is appropriate for the requested work.", "The maintenance scope, surface treatment and quotation are agreed before scheduling."],
    faqs: [
      { question: "Does every building support gondola access?", answer: "No. Suitable infrastructure and access must be available, and the method has to fit the building and scope. These points are reviewed for each property." },
      { question: "Can gondola access be used for painting and cleaning?", answer: "ABLE considers suitable exterior painting, wall repairs, glass cleaning, cladding cleaning and related sealant repairs using building service gondolas." },
    ],
    related: ["rope-access-painting", "rope-access-glass-cladding-cleaning"],
  },
];

export const highRiseHub = {
  slug: "high-rise-rope-access",
  title: "High-Rise Rope Access Services Colombo | ABLE",
  h1: "High-Rise Rope Access & Building Maintenance in Colombo",
  description: "High-rise rope access and gondola services across Colombo and Greater Colombo for suitable exterior painting, cleaning, sealant maintenance and building repairs.",
};

export function allQuoteServices(generalServices: readonly { title: string }[]) {
  return [...new Set([...generalServices.map((service) => service.title), ...specialistQuoteServices])];
}

export function specialistServiceBySlug(slug: string) {
  return specialistServices.find((service) => service.slug === slug);
}
