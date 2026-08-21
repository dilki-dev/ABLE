export type IconName =
  | "droplets" | "zap" | "paint" | "wrench" | "bath" | "chef"
  | "layers" | "hammer" | "leaf" | "building" | "siren" | "key"
  | "clock" | "map" | "shield" | "message";

export const trustItems = [
  { icon: "clock", title: "Responsive support", text: "Clear updates from enquiry to completion." },
  { icon: "map", title: "Colombo & island-wide", text: "Local coverage with wider projects considered." },
  { icon: "shield", title: "Careful workmanship", text: "Practical solutions with respect for your property." },
  { icon: "message", title: "Straightforward quotes", text: "Discuss the scope before work begins." },
] as const;

export const services = [
  { icon: "droplets", title: "Plumbing", text: "Leak checks, fixture replacement and everyday plumbing repairs." },
  { icon: "zap", title: "Electrical Work", text: "Fault finding, fittings and practical electrical improvements." },
  { icon: "paint", title: "Painting & Decorating", text: "Interior and exterior preparation, painting and finishing." },
  { icon: "wrench", title: "General Repairs", text: "Reliable attention to the small issues that affect your property." },
  { icon: "bath", title: "Bathroom Fitting", text: "Functional bathroom upgrades, fixtures, finishes and fitting." },
  { icon: "chef", title: "Kitchen Fitting", text: "Cabinet, surface, fixture and practical kitchen improvements." },
  { icon: "layers", title: "Flooring", text: "Installation and repair support for suitable floor finishes." },
  { icon: "hammer", title: "Carpentry", text: "Doors, cabinetry, fittings and made-to-measure timber repairs." },
  { icon: "leaf", title: "Gardening & Outdoor Maintenance", text: "Tidy, cared-for outdoor spaces and routine upkeep." },
  { icon: "building", title: "Property Refurbishment", text: "Coordinated repairs and improvements that refresh tired residential and commercial spaces." },
  { icon: "building", title: "Property Renovation", text: "Planned property upgrades combining suitable trades, finishes and practical improvements." },
  { icon: "siren", title: "Emergency Repairs", text: "Urgent repair enquiries assessed according to availability." },
  { icon: "key", title: "Landlord Property Maintenance", text: "Practical maintenance support between and during tenancies." },
] as const;

export const reasons = [
  { title: "One point of contact", text: "Keep conversations simple, even when a job involves several trades." },
  { title: "Respectful on-site care", text: "A tidy, considerate approach inside homes and managed properties." },
  { title: "Practical recommendations", text: "Focus on useful fixes and improvements that suit the property." },
  { title: "Clear communication", text: "Understand the next step, expected scope and any decisions needed." },
  { title: "Flexible project sizes", text: "Ask about a focused repair, a room upgrade or wider refurbishment." },
  { title: "Local understanding", text: "Solutions considered for Sri Lankan homes, climate and property needs." },
] as const;

export const processSteps = [
  { number: "01", title: "Tell us what you need", text: "Call, WhatsApp or send the quote form with useful details and photos." },
  { number: "02", title: "Review the job", text: "We discuss the scope and arrange a site visit when it is needed." },
  { number: "03", title: "Agree the approach", text: "Confirm the work, timing and quote before the job moves ahead." },
  { number: "04", title: "Complete with care", text: "Work is carried out with practical communication and a tidy finish." },
] as const;

export const serviceAreas = ["Dehiwala", "Mount Lavinia", "Colombo", "Nugegoda", "Rajagiriya", "Battaramulla", "Moratuwa", "Island-wide projects"] as const;

export const faqs = [
  { question: "What types of property do you work on?", answer: "ABLE supports homeowners, landlords, property managers and businesses with suitable repair, maintenance, refurbishment and renovation work. Share the property type and scope so the team can confirm whether the job is a suitable fit." },
  { question: "Do you work outside Colombo?", answer: "Our primary service area is Colombo and Greater Colombo. Selected projects may be undertaken island-wide depending on the work, timing and travel required." },
  { question: "Can I request several services in one visit?", answer: "Yes. List every issue in your enquiry so the work can be reviewed together and the right approach can be discussed." },
  { question: "Do you provide emergency repairs?", answer: "Urgent enquiries are welcome and assessed according to team availability, location and the nature of the issue. The website does not promise 24/7 attendance." },
  { question: "How do I get a quote?", answer: "Call, WhatsApp or complete the quote form. Photos, measurements and a clear description help with the first review; some jobs may need a site visit." },
] as const;
