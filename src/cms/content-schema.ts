import { z } from "zod";
import { faqs, processSteps, reasons, serviceAreas, services, trustItems } from "@/data/site-content";
import { navigation, siteConfig } from "@/lib/site-config";

const shortText = z.string().trim().min(1).max(160);
const paragraph = z.string().trim().min(1).max(1200);
const imagePath = z.string().trim().min(1).max(600).refine(
  (value) => (value.startsWith("/") && !value.startsWith("//")) || /^https:\/\/[a-zA-Z0-9.-]+\.public\.blob\.vercel-storage\.com\//.test(value),
  "Use a local /images path or an uploaded Vercel Blob image.",
);
const optionalImagePath = z.union([z.literal(""), imagePath]).default("");
const googleMapsEmbedUrl = z.string().trim().max(4000).refine((value) => {
  if (!value) return true;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && /(^|\.)google\.[a-z.]+$/i.test(url.hostname) && url.pathname.startsWith("/maps");
  } catch {
    return false;
  }
}, "Paste a Google Maps iframe embed URL.").default("");
const iconName = z.enum(["droplets", "zap", "paint", "wrench", "bath", "chef", "layers", "hammer", "leaf", "building", "siren", "key", "clock", "map", "shield", "message"]);

const legalDocumentSchema = z.object({
  title: shortText,
  intro: z.string().trim().min(1).max(2000),
  lastUpdated: shortText,
  sections: z.array(z.object({ heading: shortText, body: z.string().trim().min(1).max(4000) })).min(1).max(20),
});

export const defaultLegalPages = {
  privacy: {
    title: "Privacy Policy",
    intro: "This policy explains how ABLE Property Maintenance collects, uses and protects personal information submitted through this website or shared when you contact us.",
    lastUpdated: "21 August 2026",
    sections: [
      { heading: "Information we collect", body: "When you request a quotation or contact us, we may collect your name, phone number, email address, WhatsApp number, property location, requested service, preferred contact method, description of the work and any additional message you provide. We also store the enquiry reference, status, submission time and internal service notes. A protected hash derived from the request address and a single-use submission token help prevent spam and duplicate enquiries. Your light or dark theme choice is stored only in your browser." },
      { heading: "How we use information", body: "We use personal information to respond to enquiries, assess requested work, prepare or discuss quotations, arrange services, maintain business records, improve customer support and protect the website from misuse. We do not sell personal information." },
      { heading: "Service providers and disclosure", body: "We use Vercel for hosting and media storage, Neon for database services, Cloudflare Turnstile for anti-bot verification and Google Maps for location information. If optional transactional email is configured, enquiry details may be sent through that email provider to notify ABLE after the database has saved the enquiry. Those providers process information under their own security and privacy commitments. We may also disclose information when required by law, to protect legal rights or with your permission." },
      { heading: "Retention", body: "We keep enquiry and project information only for as long as reasonably needed for customer service, quotations, work records, legal obligations and dispute prevention. Retention periods can vary according to the nature of the enquiry or service." },
      { heading: "Security and international processing", body: "We use access controls, encrypted connections and other reasonable safeguards. No internet service can guarantee absolute security. Some technology providers may process or store data outside Sri Lanka, subject to their contractual and legal safeguards." },
      { heading: "Your choices and rights", body: `You may ask to access, correct or delete personal information we hold about you, subject to applicable legal requirements and legitimate record-keeping needs. Send requests to ${siteConfig.email}. You may also contact Sri Lanka's Data Protection Authority about concerns covered by applicable data-protection law.` },
      { heading: "Updates and contact", body: `We may update this policy when our services or legal responsibilities change. The latest version will appear on this page. Questions can be sent to ${siteConfig.email} or directed to ABLE Property Maintenance at ${siteConfig.address}.` },
    ],
  },
  terms: {
    title: "Website Terms",
    intro: "These terms govern use of the ABLE Property Maintenance website. A separate written quotation or service agreement will govern any work we agree to perform.",
    lastUpdated: "21 August 2026",
    sections: [
      { heading: "Using this website", body: "You may use this website to learn about our services and submit genuine enquiries. You must not misuse the website, attempt unauthorised access, interfere with its operation or submit unlawful, misleading or harmful material." },
      { heading: "Enquiries are not bookings", body: "Sending an enquiry does not create a contract, confirm availability or guarantee attendance. Work is accepted only after ABLE confirms the scope, timing and applicable commercial terms. Urgent requests remain subject to availability and the nature and location of the work." },
      { heading: "Quotations and scope", body: "Any quotation is based on the information and access available at the time. Hidden defects, inaccurate information, changes requested after inspection or additional work may affect price and timing. The accepted written quotation takes priority over general website information." },
      { heading: "Customer responsibilities", body: "Customers must provide accurate information, lawful access to the property and a reasonably safe working environment. Required permissions, owner or landlord approvals and approvals from authorities remain the customer's responsibility unless a written agreement says otherwise." },
      { heading: "Scheduling, changes and payment", body: "Scheduling depends on access, labour, materials, weather and other practical conditions. Payment dates, deposits, cancellation arrangements and charges will be stated in the applicable quotation or agreement. Contact us promptly if requested work or access arrangements change." },
      { heading: "Website information and external services", body: "We aim to keep website information accurate, but service descriptions, availability and examples may change. Maps, messaging links and other third-party services are operated by their respective providers and may have separate terms and privacy practices." },
      { heading: "Intellectual property", body: "Unless otherwise stated, the website design, text, branding and original media belong to ABLE Property Maintenance or are used with permission. They may not be copied or commercially reused without prior written consent." },
      { heading: "Liability and applicable law", body: "Nothing in these terms excludes rights or responsibilities that cannot legally be excluded. To the extent permitted by law, ABLE is not responsible for losses caused solely by reliance on general website information or by third-party services. These website terms are governed by the laws of Sri Lanka." },
      { heading: "Contact", body: `Questions about these terms can be sent to ${siteConfig.email} or directed to ABLE Property Maintenance at ${siteConfig.address}.` },
    ],
  },
};

export const siteContentSchema = z.object({
  business: z.object({
    name: shortText,
    logoImage: optionalImagePath,
    logoWidth: z.number().int().min(80).max(240).default(180),
    logoHeight: z.number().int().min(28).max(56).default(44),
    footerLogoWidth: z.number().int().min(80).max(280).default(200),
    footerLogoHeight: z.number().int().min(28).max(72).default(56),
    logoTitleSize: z.number().int().min(12).max(24).default(18),
    logoSloganSize: z.number().int().min(8).max(14).default(10),
    tagline: shortText,
    description: paragraph,
    address: paragraph,
    phoneDisplay: shortText,
    phoneRaw: z.string().trim().regex(/^\+\d{8,15}$/),
    secondaryPhoneDisplay: z.string().trim().max(40),
    email: z.email().max(254),
    coverage: shortText,
  }),
  navigation: z.array(z.object({ label: shortText, href: z.string().trim().max(80).refine((value) => value.startsWith("#") || /^\/[a-z0-9/-]*$/.test(value), "Use a homepage anchor or internal path.") })).min(1).max(12),
  hero: z.object({
    badge: shortText,
    location: shortText,
    headline: shortText,
    headlineAccent: shortText,
    description: paragraph,
    bullets: z.array(shortText).min(1).max(4),
    image: imagePath,
  }),
  trustItems: z.array(z.object({ icon: iconName, title: shortText, text: paragraph })).min(1).max(8),
  servicesSection: z.object({ eyebrow: shortText, title: shortText, description: paragraph }),
  services: z.array(z.object({ icon: iconName, title: shortText, text: paragraph })).min(1).max(24),
  about: z.object({
    eyebrow: shortText,
    title: shortText,
    description: paragraph,
    body: paragraph,
    image: imagePath,
    badgeLabel: shortText,
    badgeValue: shortText,
    bullets: z.array(shortText).min(1).max(8),
  }),
  whyChoose: z.object({
    eyebrow: shortText,
    title: shortText,
    description: paragraph,
    reasons: z.array(z.object({ title: shortText, text: paragraph })).min(1).max(12),
  }),
  projectsSection: z.object({ eyebrow: shortText, title: shortText, description: paragraph, notice: z.string().trim().max(1200).default("") }),
  projects: z.array(z.object({ title: shortText, service: shortText, location: shortText, image: imagePath })).max(18).default([]),
  processSection: z.object({ eyebrow: shortText, title: shortText, description: paragraph }),
  processSteps: z.array(z.object({ number: shortText, title: shortText, text: paragraph })).min(1).max(8),
  testimonials: z.object({
    eyebrow: shortText,
    title: shortText,
    description: paragraph,
    items: z.array(z.object({ title: shortText, text: paragraph })).max(12).default([]),
  }),
  areas: z.object({
    eyebrow: shortText,
    title: shortText,
    description: paragraph,
    urgentTitle: shortText,
    urgentText: paragraph,
    items: z.array(shortText).min(1).max(30),
  }),
  faqSection: z.object({ eyebrow: shortText, title: shortText, description: paragraph }),
  faqs: z.array(z.object({ question: shortText, answer: paragraph })).min(1).max(20),
  map: z.object({ title: shortText, description: paragraph, embedUrl: googleMapsEmbedUrl }),
  contact: z.object({ eyebrow: shortText, title: shortText, description: paragraph }),
  finalCta: z.object({ eyebrow: shortText, title: shortText }),
  legal: z.object({ privacy: legalDocumentSchema, terms: legalDocumentSchema }).default(defaultLegalPages),
});

export type SiteContent = z.infer<typeof siteContentSchema>;

export const defaultSiteContent: SiteContent = siteContentSchema.parse({
  business: {
    name: siteConfig.name,
    logoImage: "",
    logoWidth: 180,
    logoHeight: 44,
    footerLogoWidth: 200,
    footerLogoHeight: 56,
    logoTitleSize: 18,
    logoSloganSize: 10,
    tagline: siteConfig.tagline,
    description: siteConfig.description,
    address: siteConfig.address,
    phoneDisplay: siteConfig.phoneDisplay,
    phoneRaw: siteConfig.phoneRaw,
    secondaryPhoneDisplay: siteConfig.secondaryPhoneDisplay,
    email: siteConfig.email,
    coverage: "Colombo and Greater Colombo, with selected projects island-wide across Sri Lanka",
  },
  navigation: [...navigation],
  hero: {
    badge: "Emergency repair enquiries welcome",
    location: "Colombo, Greater Colombo & selected projects island-wide",
    headline: "Reliable Property Care.",
    headlineAccent: "Built to Last.",
    description: siteConfig.description,
    bullets: ["Multi-service support", "Clear project communication"],
    image: "/images/hero-property-maintenance.png",
  },
  trustItems: [...trustItems],
  servicesSection: {
    eyebrow: "Services",
    title: "Practical care for every part of your property",
    description: "From a focused repair to a wider refurbishment, choose the service that best matches what needs attention.",
  },
  services: [...services],
  about: {
    eyebrow: "About ABLE",
    title: "Property care that feels clear, capable and personal",
    description: "ABLE Property Maintenance provides dependable property maintenance, repair, improvement and renovation services for homeowners, landlords and businesses across Colombo, with selected projects undertaken island-wide.",
    body: "Our approach is straightforward: understand the work required, recommend a practical route forward and complete the agreed scope with care for the property. Homeowners, landlords, property managers and commercial clients can contact one team for focused repairs, ongoing upkeep and coordinated improvements.",
    image: "/images/about-able-team.png",
    badgeLabel: "Based in",
    badgeValue: "Attidiya, Dehiwala",
    bullets: ["Residential maintenance", "Landlord support", "Focused repairs", "Room improvements"],
  },
  whyChoose: {
    eyebrow: "Why choose us",
    title: "Less friction. More confidence in the work.",
    description: "A straightforward service experience built around communication, respect and useful results.",
    reasons: [...reasons],
  },
  projectsSection: { eyebrow: "Completed work", title: "Recent property projects", description: "Verified completed projects will appear here as they are published.", notice: "" },
  projects: [],
  processSection: {
    eyebrow: "How it works",
    title: "A simple route from enquiry to completion",
    description: "Start with the information you have. ABLE can then help establish the right next step for the job.",
  },
  processSteps: [...processSteps],
  testimonials: { eyebrow: "Customer feedback", title: "What customers say", description: "Genuine customer feedback will appear here when permission has been provided.", items: [] },
  areas: {
    eyebrow: "Service areas",
    title: "Serving Colombo and Greater Colombo",
    description: "Our primary service area covers Colombo and Greater Colombo, with selected maintenance, refurbishment and renovation projects undertaken island-wide.",
    urgentTitle: "Urgent repair enquiry?",
    urgentText: "Call or WhatsApp with your location and issue. Attendance depends on availability and the nature of the repair.",
    items: [...serviceAreas],
  },
  faqSection: {
    eyebrow: "FAQ",
    title: "Useful answers before you enquire",
    description: "If your situation is different, send the details and ABLE can confirm whether the job is a suitable fit.",
  },
  faqs: [...faqs],
  map: { title: "Find ABLE in Attidiya", description: siteConfig.address, embedUrl: "" },
  contact: {
    eyebrow: "Request a quote",
    title: "Tell us what needs attention.",
    description: "Share the service, location and useful project details. For the fastest current response, call or use WhatsApp.",
  },
  legal: defaultLegalPages,
  finalCta: { eyebrow: "Ready when your property needs attention", title: "Let’s make the next repair easier to organise." },
});
