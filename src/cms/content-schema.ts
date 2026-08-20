import { z } from "zod";
import { faqs, processSteps, projects, reasons, serviceAreas, services, trustItems } from "@/data/site-content";
import { navigation, siteConfig } from "@/lib/site-config";

const shortText = z.string().trim().min(1).max(160);
const paragraph = z.string().trim().min(1).max(1200);
const imagePath = z.string().trim().min(1).max(600).refine(
  (value) => (value.startsWith("/") && !value.startsWith("//")) || /^https:\/\/[a-zA-Z0-9.-]+\.public\.blob\.vercel-storage\.com\//.test(value),
  "Use a local /images path or an uploaded Vercel Blob image.",
);
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

export const siteContentSchema = z.object({
  business: z.object({
    name: shortText,
    tagline: shortText,
    description: paragraph,
    address: paragraph,
    phoneDisplay: shortText,
    phoneRaw: z.string().trim().regex(/^\+\d{8,15}$/),
    secondaryPhoneDisplay: z.string().trim().max(40),
    email: z.email().max(254),
    coverage: shortText,
  }),
  navigation: z.array(z.object({ label: shortText, href: z.string().trim().startsWith("#").max(80) })).min(1).max(12),
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
  projectsSection: z.object({ eyebrow: shortText, title: shortText, description: paragraph, notice: paragraph }),
  projects: z.array(z.object({ title: shortText, service: shortText, location: shortText, image: imagePath })).min(1).max(18),
  processSection: z.object({ eyebrow: shortText, title: shortText, description: paragraph }),
  processSteps: z.array(z.object({ number: shortText, title: shortText, text: paragraph })).min(1).max(8),
  testimonials: z.object({
    eyebrow: shortText,
    title: shortText,
    description: paragraph,
    items: z.array(z.object({ title: shortText, text: paragraph })).min(1).max(12),
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
});

export type SiteContent = z.infer<typeof siteContentSchema>;

export const defaultSiteContent: SiteContent = siteContentSchema.parse({
  business: {
    name: siteConfig.name,
    tagline: siteConfig.tagline,
    description: siteConfig.description,
    address: siteConfig.address,
    phoneDisplay: siteConfig.phoneDisplay,
    phoneRaw: siteConfig.phoneRaw,
    secondaryPhoneDisplay: siteConfig.secondaryPhoneDisplay,
    email: siteConfig.email,
    coverage: "Colombo and projects throughout Sri Lanka",
  },
  navigation: [...navigation],
  hero: {
    badge: "Emergency repair enquiries welcome",
    location: "Colombo & throughout Sri Lanka",
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
    description: "ABLE Property Maintenance is being built as a dependable point of contact for repairs, upkeep and thoughtful home improvements in Colombo and beyond.",
    body: "The approach is simple: understand the issue, recommend a practical route forward and carry out the agreed work with care for the property. Whether you are a homeowner, landlord or property manager, the goal is to make maintenance easier to organise.",
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
  projectsSection: {
    eyebrow: "Project gallery",
    title: "A preview of the work ABLE can showcase",
    description: "These generated images demonstrate the intended gallery style. Replace them with verified ABLE project photos and accurate locations before presenting them as completed work.",
    notice: "No completed projects are being claimed here. Every card is clearly marked as placeholder content.",
  },
  projects: [...projects],
  processSection: {
    eyebrow: "How it works",
    title: "A simple route from enquiry to completion",
    description: "Start with the information you have. ABLE can then help establish the right next step for the job.",
  },
  processSteps: [...processSteps],
  testimonials: {
    eyebrow: "Customer feedback",
    title: "A home for verified reviews",
    description: "This section is intentionally transparent: real customer feedback should only be added after the customer has approved the wording and attribution.",
    items: [
      { title: "Homeowner review placeholder", text: "Add a genuine, permission-approved customer quote here. Do not publish invented reviews." },
      { title: "Landlord review placeholder", text: "Add a genuine, permission-approved customer quote here. Do not publish invented reviews." },
      { title: "Property manager review placeholder", text: "Add a genuine, permission-approved customer quote here. Do not publish invented reviews." },
    ],
  },
  areas: {
    eyebrow: "Service areas",
    title: "Local to Dehiwala. Ready to discuss wider projects.",
    description: "ABLE’s core coverage is Colombo and nearby areas, with suitable maintenance and refurbishment projects considered throughout Sri Lanka.",
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
  finalCta: { eyebrow: "Ready when your property needs attention", title: "Let’s make the next repair easier to organise." },
});
