"use client";
/* eslint-disable @next/next/no-img-element -- CMS previews must support an image URL while it is being edited. */

import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, ImageUp, MapPinned, Plus, Save, Trash2 } from "lucide-react";
import { saveContentAction } from "@/app/admin/actions";
import type { SiteContent } from "@/cms/content-schema";
import { publicConfig } from "@/cms/public-config";
import { initialActionState } from "./action-state";

type PathPart = string | number;
type CollectionKey = "navigation" | "trustItems" | "services" | "projects" | "processSteps" | "faqs";
type NestedCollectionPath = ["whyChoose", "reasons"] | ["testimonials", "items"];
type StringListPath = ["hero", "bullets"] | ["about", "bullets"] | ["areas", "items"];
type LegalDocumentKey = "privacy" | "terms";
type FieldDefinition = { key: string; label: string; multiline?: boolean; options?: readonly string[]; image?: boolean };
const iconOptions = ["droplets", "zap", "paint", "wrench", "bath", "chef", "layers", "hammer", "leaf", "building", "siren", "key", "clock", "map", "shield", "message"] as const;

export function ContentEditor({ initialContent, databaseReady, mediaReady, storedContent }: { initialContent: SiteContent; databaseReady: boolean; mediaReady: boolean; storedContent: boolean }) {
  const [content, setContent] = useState(initialContent);
  const [logoUploading, setLogoUploading] = useState(false);
  const [savedContentJson, setSavedContentJson] = useState(() => JSON.stringify(initialContent));
  const [state, action, pending] = useActionState(saveContentAction, initialActionState);
  const submittedContentRef = useRef(savedContentJson);
  const contentJson = useMemo(() => JSON.stringify(content), [content]);
  const dirty = contentJson !== savedContentJson;

  useEffect(() => {
    if (state.status === "success" && state.completedAt) setSavedContentJson(submittedContentRef.current);
  }, [state.status, state.completedAt]);

  useEffect(() => {
    const warnBeforeLeaving = (event: BeforeUnloadEvent) => {
      if (!dirty) return;
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warnBeforeLeaving);
    return () => window.removeEventListener("beforeunload", warnBeforeLeaving);
  }, [dirty]);

  function updatePath(path: PathPart[], value: string) {
    setContent((current) => {
      const copy = structuredClone(current) as unknown as Record<string, unknown>;
      let target: Record<string, unknown> = copy;
      for (const part of path.slice(0, -1)) {
        target = target[String(part)] as Record<string, unknown>;
      }
      target[String(path[path.length - 1])] = value;
      return copy as unknown as SiteContent;
    });
  }

  function updateLogoSize(key: "logoWidth" | "logoHeight" | "footerLogoWidth" | "footerLogoHeight" | "logoTitleSize" | "logoSloganSize", value: number) {
    setContent((current) => ({ ...current, business: { ...current.business, [key]: value } }));
  }

  function removeCollectionItem(key: CollectionKey, index: number) {
    setContent((current) => ({ ...current, [key]: current[key].filter((_, itemIndex) => itemIndex !== index) }));
  }

  function addCollectionItem(key: CollectionKey, template: Record<string, string>) {
    setContent((current) => ({ ...current, [key]: [...current[key], template] } as SiteContent));
  }

  function updateStringList(path: StringListPath, index: number, value: string) {
    setContent((current) => {
      const copy = structuredClone(current);
      const list = path[0] === "hero" ? copy.hero.bullets : path[0] === "about" ? copy.about.bullets : copy.areas.items;
      list[index] = value;
      return copy;
    });
  }

  function removeStringListItem(path: StringListPath, index: number) {
    setContent((current) => {
      const copy = structuredClone(current);
      const list = path[0] === "hero" ? copy.hero.bullets : path[0] === "about" ? copy.about.bullets : copy.areas.items;
      list.splice(index, 1);
      return copy;
    });
  }

  function addStringListItem(path: StringListPath) {
    setContent((current) => {
      const copy = structuredClone(current);
      const list = path[0] === "hero" ? copy.hero.bullets : path[0] === "about" ? copy.about.bullets : copy.areas.items;
      list.push("New item");
      return copy;
    });
  }

  function removeNestedItem(path: NestedCollectionPath, index: number) {
    setContent((current) => {
      const copy = structuredClone(current);
      const list = path[0] === "whyChoose" ? copy.whyChoose.reasons : copy.testimonials.items;
      list.splice(index, 1);
      return copy;
    });
  }

  function addNestedItem(path: NestedCollectionPath, template: { title: string; text: string }) {
    setContent((current) => {
      const copy = structuredClone(current);
      const list = path[0] === "whyChoose" ? copy.whyChoose.reasons : copy.testimonials.items;
      list.push(template);
      return copy;
    });
  }

  function removeLegalSection(documentKey: LegalDocumentKey, index: number) {
    setContent((current) => {
      const copy = structuredClone(current);
      copy.legal[documentKey].sections.splice(index, 1);
      return copy;
    });
  }

  function addLegalSection(documentKey: LegalDocumentKey) {
    setContent((current) => {
      const copy = structuredClone(current);
      copy.legal[documentKey].sections.push({ heading: "New section", body: "Add clear and accurate policy information." });
      return copy;
    });
  }

  function setAllSections(open: boolean) {
    document.querySelectorAll<HTMLDetailsElement>("[data-cms-section]").forEach((section) => { section.open = open; });
  }

  return (
    <form action={action} onSubmit={() => { submittedContentRef.current = contentJson; }} aria-busy={pending || logoUploading} className="min-w-0 space-y-6">
      <input type="hidden" name="content" value={contentJson} readOnly />
      <div className="sticky top-2 z-20 flex flex-col gap-3 rounded-2xl border border-[#dfdfda] bg-white/95 p-4 shadow-lg backdrop-blur sm:top-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0"><h2 className="font-black">Website content</h2><p className="mt-1 text-xs text-[#777771]">Open a section, make changes, then publish once.</p><div className="mt-2 flex flex-wrap gap-3"><button type="button" onClick={() => setAllSections(true)} className="text-xs font-bold text-sky-700 hover:underline">Expand all</button><button type="button" onClick={() => setAllSections(false)} className="text-xs font-bold text-[#64645f] hover:underline">Collapse all</button></div></div>
        <div className="flex w-full flex-col items-stretch gap-2 sm:w-auto sm:flex-row sm:items-center sm:justify-end">
          <div aria-live="polite" className="min-w-0 sm:max-w-xs">
            {state.message && !(state.status === "success" && dirty) ? <p role={state.status === "error" ? "alert" : "status"} className={`text-xs font-bold leading-5 ${state.status === "success" ? "text-green-700" : "text-red-700"}`}>{state.message}</p> : <p className={`text-xs font-bold ${dirty ? "text-amber-700" : "text-green-700"}`}>{dirty ? "Unsaved changes" : storedContent ? "All changes published" : "Ready for first publish"}</p>}
          </div>
          <button disabled={pending || logoUploading || !databaseReady} className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#f97316] px-5 py-3 text-sm font-extrabold text-white disabled:cursor-not-allowed disabled:opacity-45"><Save aria-hidden="true" className="h-4 w-4" />{logoUploading ? "Uploading logo…" : pending ? "Publishing…" : "Publish changes"}</button>
        </div>
      </div>

      {!databaseReady ? <div className="rounded-2xl border border-amber-300 bg-amber-50 p-5 text-sm leading-6 text-amber-950">Editing is safely disabled because the database connection could not be verified. Existing live content has not been changed.</div> : null}
      {!mediaReady ? <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4 text-sm leading-6 text-sky-950">Image uploads are optional and currently disabled. Existing local image paths continue to work.</div> : null}

      <EditorCard title="Business details" description="Used by the header, contact area and footer." defaultOpen>
        <FieldGrid>
          <CmsField label="Business name" value={content.business.name} onChange={(v) => updatePath(["business", "name"], v)} />
          <CmsField label="Tagline" value={content.business.tagline} onChange={(v) => updatePath(["business", "tagline"], v)} />
          <CmsField label="Primary phone display" value={content.business.phoneDisplay} onChange={(v) => updatePath(["business", "phoneDisplay"], v)} />
          <CmsField label="Primary phone international" value={content.business.phoneRaw} onChange={(v) => updatePath(["business", "phoneRaw"], v)} />
          <CmsField label="Secondary phone" value={content.business.secondaryPhoneDisplay} onChange={(v) => updatePath(["business", "secondaryPhoneDisplay"], v)} />
          <CmsField label="Email" value={content.business.email} onChange={(v) => updatePath(["business", "email"], v)} />
          <CmsField label="Coverage" value={content.business.coverage} onChange={(v) => updatePath(["business", "coverage"], v)} />
        </FieldGrid>
        <CmsField label="Business description" value={content.business.description} multiline onChange={(v) => updatePath(["business", "description"], v)} />
        <CmsField label="Address" value={content.business.address} multiline onChange={(v) => updatePath(["business", "address"], v)} />
        <LogoMediaField value={content.business.logoImage} name={content.business.name} tagline={content.business.tagline} width={content.business.logoWidth} height={content.business.logoHeight} footerWidth={content.business.footerLogoWidth} footerHeight={content.business.footerLogoHeight} titleSize={content.business.logoTitleSize} sloganSize={content.business.logoSloganSize} mediaReady={mediaReady} onChange={(v) => updatePath(["business", "logoImage"], v)} onWidthChange={(v) => updateLogoSize("logoWidth", v)} onHeightChange={(v) => updateLogoSize("logoHeight", v)} onFooterWidthChange={(v) => updateLogoSize("footerLogoWidth", v)} onFooterHeightChange={(v) => updateLogoSize("footerLogoHeight", v)} onTitleSizeChange={(v) => updateLogoSize("logoTitleSize", v)} onSloganSizeChange={(v) => updateLogoSize("logoSloganSize", v)} onUploadingChange={setLogoUploading} />
      </EditorCard>

      <CollectionEditor title="Navigation" items={content.navigation} maxItems={12} fields={[{ key: "label", label: "Label" }, { key: "href", label: "Section link" }]} onChange={(i, key, v) => updatePath(["navigation", i, key], v)} onRemove={(i) => removeCollectionItem("navigation", i)} onAdd={() => addCollectionItem("navigation", { label: "New link", href: "#contact" })} />

      <EditorCard title="Hero" description="The first section visitors see." defaultOpen>
        <FieldGrid>
          <CmsField label="Urgent badge" value={content.hero.badge} onChange={(v) => updatePath(["hero", "badge"], v)} />
          <CmsField label="Location line" value={content.hero.location} onChange={(v) => updatePath(["hero", "location"], v)} />
          <CmsField label="Headline" value={content.hero.headline} onChange={(v) => updatePath(["hero", "headline"], v)} />
          <CmsField label="Orange headline" value={content.hero.headlineAccent} onChange={(v) => updatePath(["hero", "headlineAccent"], v)} />
        </FieldGrid>
        <CmsField label="Description" value={content.hero.description} multiline onChange={(v) => updatePath(["hero", "description"], v)} />
        <MediaField label="Hero image" value={content.hero.image} mediaReady={mediaReady} onChange={(v) => updatePath(["hero", "image"], v)} />
        <StringListEditor title="Hero trust points" items={content.hero.bullets} maxItems={4} onChange={(i, v) => updateStringList(["hero", "bullets"], i, v)} onRemove={(i) => removeStringListItem(["hero", "bullets"], i)} onAdd={() => addStringListItem(["hero", "bullets"])} />
      </EditorCard>

      <CollectionEditor title="Trust bar" items={content.trustItems} maxItems={8} fields={[{ key: "icon", label: "Icon", options: iconOptions }, { key: "title", label: "Title" }, { key: "text", label: "Description", multiline: true }]} onChange={(i, key, v) => updatePath(["trustItems", i, key], v)} onRemove={(i) => removeCollectionItem("trustItems", i)} onAdd={() => addCollectionItem("trustItems", { icon: "shield", title: "New trust point", text: "Add a clear, factual description." })} />

      <CopyEditor title="Services heading" value={content.servicesSection} onChange={(key, value) => updatePath(["servicesSection", key], value)} />
      <CollectionEditor title="Services" items={content.services} maxItems={24} fields={[{ key: "icon", label: "Icon", options: iconOptions }, { key: "title", label: "Service name" }, { key: "text", label: "Description", multiline: true }]} onChange={(i, key, v) => updatePath(["services", i, key], v)} onRemove={(i) => removeCollectionItem("services", i)} onAdd={() => addCollectionItem("services", { icon: "wrench", title: "New service", text: "Describe the service accurately." })} />

      <EditorCard title="About section">
        <CopyFields value={content.about} keys={["eyebrow", "title", "description", "body", "badgeLabel", "badgeValue"]} multiline={["description", "body"]} onChange={(key, value) => updatePath(["about", key], value)} />
        <MediaField label="About image" value={content.about.image} mediaReady={mediaReady} onChange={(v) => updatePath(["about", "image"], v)} />
        <StringListEditor title="About points" items={content.about.bullets} maxItems={8} onChange={(i, v) => updateStringList(["about", "bullets"], i, v)} onRemove={(i) => removeStringListItem(["about", "bullets"], i)} onAdd={() => addStringListItem(["about", "bullets"])} />
      </EditorCard>

      <CopyEditor title="Why choose us heading" value={content.whyChoose} onChange={(key, value) => updatePath(["whyChoose", key], value)} />
      <EditorCard title="Why choose us points"><SimpleNestedCollection title="Reasons" items={content.whyChoose.reasons} maxItems={12} fields={[{ key: "title", label: "Title" }, { key: "text", label: "Description", multiline: true }]} onChange={(i, key, v) => updatePath(["whyChoose", "reasons", i, key], v)} onRemove={(i) => removeNestedItem(["whyChoose", "reasons"], i)} onAdd={() => addNestedItem(["whyChoose", "reasons"], { title: "New reason", text: "Explain this benefit clearly." })} /></EditorCard>

      <CopyEditor title="Projects heading" value={content.projectsSection} onChange={(key, value) => updatePath(["projectsSection", key], value)} />
      <CollectionEditor title="Project gallery" items={content.projects} maxItems={18} fields={[{ key: "title", label: "Title" }, { key: "service", label: "Service" }, { key: "location", label: "Location" }, { key: "image", label: "Image URL", image: true }]} mediaReady={mediaReady} onChange={(i, key, v) => updatePath(["projects", i, key], v)} onRemove={(i) => removeCollectionItem("projects", i)} onAdd={() => addCollectionItem("projects", { title: "New project", service: "Service", location: "Location", image: "/images/project-exterior-painting.png" })} />

      <CopyEditor title="Process heading" value={content.processSection} onChange={(key, value) => updatePath(["processSection", key], value)} />
      <CollectionEditor title="Process steps" items={content.processSteps} maxItems={8} fields={[{ key: "number", label: "Number" }, { key: "title", label: "Title" }, { key: "text", label: "Description", multiline: true }]} onChange={(i, key, v) => updatePath(["processSteps", i, key], v)} onRemove={(i) => removeCollectionItem("processSteps", i)} onAdd={() => addCollectionItem("processSteps", { number: "05", title: "New step", text: "Describe this step." })} />

      <EditorCard title="Testimonials">
        <CopyFields value={content.testimonials} keys={["eyebrow", "title", "description"]} multiline={["description"]} onChange={(key, value) => updatePath(["testimonials", key], value)} />
        <SimpleNestedCollection title="Review cards" items={content.testimonials.items} maxItems={12} fields={[{ key: "title", label: "Title" }, { key: "text", label: "Review text", multiline: true }]} onChange={(i, key, v) => updatePath(["testimonials", "items", i, key], v)} onRemove={(i) => removeNestedItem(["testimonials", "items"], i)} onAdd={() => addNestedItem(["testimonials", "items"], { title: "New review", text: "Add a verified, permission-approved customer review." })} />
      </EditorCard>

      <EditorCard title="Service areas">
        <CopyFields value={content.areas} keys={["eyebrow", "title", "description", "urgentTitle", "urgentText"]} multiline={["description", "urgentText"]} onChange={(key, value) => updatePath(["areas", key], value)} />
        <StringListEditor title="Area names" items={content.areas.items} maxItems={30} onChange={(i, v) => updateStringList(["areas", "items"], i, v)} onRemove={(i) => removeStringListItem(["areas", "items"], i)} onAdd={() => addStringListItem(["areas", "items"])} />
      </EditorCard>

      <CopyEditor title="FAQ heading" value={content.faqSection} onChange={(key, value) => updatePath(["faqSection", key], value)} />
      <CollectionEditor title="FAQs" items={content.faqs} maxItems={20} fields={[{ key: "question", label: "Question" }, { key: "answer", label: "Answer", multiline: true }]} onChange={(i, key, v) => updatePath(["faqs", i, key], v)} onRemove={(i) => removeCollectionItem("faqs", i)} onAdd={() => addCollectionItem("faqs", { question: "New question", answer: "Add a clear and accurate answer." })} />

      <MapEditor value={content.map} fallbackEmbedUrl={publicConfig(content.business).mapEmbedUrl} onChange={(key, value) => updatePath(["map", key], value)} />
      <CopyEditor title="Contact section" value={content.contact} onChange={(key, value) => updatePath(["contact", key], value)} />
      <CopyEditor title="Final call to action" value={content.finalCta} onChange={(key, value) => updatePath(["finalCta", key], value)} />
      <LegalEditor title="Privacy page" value={content.legal.privacy} onChange={(key, value) => updatePath(["legal", "privacy", key], value)} onSectionChange={(index, key, value) => updatePath(["legal", "privacy", "sections", index, key], value)} onSectionRemove={(index) => removeLegalSection("privacy", index)} onSectionAdd={() => addLegalSection("privacy")} />
      <LegalEditor title="Terms page" value={content.legal.terms} onChange={(key, value) => updatePath(["legal", "terms", key], value)} onSectionChange={(index, key, value) => updatePath(["legal", "terms", "sections", index, key], value)} onSectionRemove={(index) => removeLegalSection("terms", index)} onSectionAdd={() => addLegalSection("terms")} />
    </form>
  );
}

function EditorCard({ title, description, children, defaultOpen = false }: { title: string; description?: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const sectionId = `cms-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
  return <details id={sectionId} data-cms-section open={open} onToggle={(event) => setOpen(event.currentTarget.open)} className="group min-w-0 scroll-mt-32 rounded-2xl border border-[#dfdfda] bg-white shadow-sm open:shadow-md"><summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 marker:content-none sm:px-7"><span className="min-w-0"><span className="block break-words text-lg font-black tracking-[-.02em] sm:text-xl">{title}</span>{description ? <span className="mt-1 block text-sm leading-6 text-[#777771]">{description}</span> : null}</span><ChevronDown aria-hidden="true" className="h-5 w-5 shrink-0 text-[#777771] transition-transform group-open:rotate-180" /></summary><div className="space-y-5 border-t border-[#eeeeea] px-4 py-5 sm:px-7 sm:py-6">{children}</div></details>;
}

function FieldGrid({ children }: { children: React.ReactNode }) { return <div className="grid gap-4 md:grid-cols-2">{children}</div>; }

function CmsField({ label, value, onChange, multiline = false, options }: { label: string; value: string; onChange: (value: string) => void; multiline?: boolean; options?: readonly string[] }) {
  const className = "mt-2 min-h-12 w-full rounded-xl border border-[#d9d9d4] bg-white px-3.5 py-3 text-base normal-case tracking-normal outline-none focus:border-[#38bdf8] focus:ring-4 focus:ring-sky-100 sm:text-sm";
  return <label className="block min-w-0 text-xs font-extrabold uppercase tracking-[.08em] text-[#64645f]">{label}{options ? <select value={value} onChange={(e) => onChange(e.target.value)} className={className}>{options.map((option) => <option key={option}>{option}</option>)}</select> : multiline ? <textarea rows={4} value={value} onChange={(e) => onChange(e.target.value)} className={className} /> : <input value={value} onChange={(e) => onChange(e.target.value)} className={className} />}</label>;
}

function LogoMediaField({ value, name, tagline, width, height, footerWidth, footerHeight, titleSize, sloganSize, onChange, onWidthChange, onHeightChange, onFooterWidthChange, onFooterHeightChange, onTitleSizeChange, onSloganSizeChange, onUploadingChange, mediaReady }: { value: string; name: string; tagline: string; width: number; height: number; footerWidth: number; footerHeight: number; titleSize: number; sloganSize: number; onChange: (value: string) => void; onWidthChange: (value: number) => void; onHeightChange: (value: number) => void; onFooterWidthChange: (value: number) => void; onFooterHeightChange: (value: number) => void; onTitleSizeChange: (value: number) => void; onSloganSizeChange: (value: number) => void; onUploadingChange: (uploading: boolean) => void; mediaReady: boolean }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState("");
  const [uploading, setUploading] = useState(false);
  async function upload(file = inputRef.current?.files?.[0]) {
    if (!file) return setStatus("Choose a PNG logo first.");
    if (file.type !== "image/png") return setStatus("Use a PNG image for the navigation and footer logo.");
    if (file.size > 4 * 1024 * 1024) return setStatus("The logo must be smaller than 4 MB.");
    setStatus("Uploading…");
    setUploading(true);
    onUploadingChange(true);
    const data = new FormData(); data.set("file", file);
    try {
      const response = await fetch("/api/admin/media", { method: "POST", body: data });
      const result = await response.json() as { url?: string; message?: string };
      if (!response.ok || !result.url) return setStatus(result.message ?? "Upload failed.");
      onChange(result.url); setStatus("Logo uploaded and ready. Review the preview, then select Publish changes.");
    } catch { setStatus("Upload failed."); }
    finally { setUploading(false); onUploadingChange(false); }
  }
  return (
    <div className="min-w-0 space-y-3">
      <CmsField label="Shared navigation and footer logo PNG" value={value} onChange={onChange} />
      <div className="grid gap-4 rounded-xl border border-[#e7e7e3] bg-white p-4 lg:grid-cols-[minmax(240px,1fr)_minmax(0,1fr)]">
        <div className="flex min-h-32 items-center justify-center overflow-hidden rounded-lg bg-[#f1f1ed] p-4">
          <div className="flex min-w-0 items-center gap-3">
            {value ? <img src={value} alt="Current shared logo" loading="lazy" style={{ width: Math.min(width, 160), height }} className="max-w-full shrink-0 object-contain" /> : <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f97316] text-lg font-black text-white">A</span>}
            <span className="min-w-0 leading-none"><span style={{ fontSize: titleSize, lineHeight: 1.08 }} className="block font-black text-[#111111]">{name}</span><span style={{ fontSize: sloganSize, lineHeight: 1.2 }} className="mt-1.5 block font-extrabold uppercase tracking-[.1em] text-[#64645f]">{tagline}</span></span>
          </div>
        </div>
        <div className="min-w-0"><p className="text-xs font-bold text-[#64645f]">Transparent PNG recommended · maximum 4 MB. Selecting a file uploads it immediately.</p><input ref={inputRef} type="file" accept="image/png" disabled={!mediaReady || uploading} onChange={(event) => { setStatus(""); const file = event.target.files?.[0]; if (file) void upload(file); }} className="mt-3 min-w-0 max-w-full text-xs" /><div className="mt-3 flex flex-col items-stretch gap-2 sm:flex-row sm:flex-wrap sm:items-center"><button type="button" onClick={() => void upload()} disabled={!mediaReady || uploading} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#d9d9d4] px-3 py-2 text-sm font-bold disabled:opacity-40"><ImageUp aria-hidden="true" className="h-4 w-4" />{uploading ? "Uploading…" : "Upload again"}</button>{value ? <button type="button" onClick={() => { onChange(""); setStatus("Text logo selected. Publish changes to update the navigation and footer."); }} disabled={uploading} className="inline-flex min-h-11 items-center justify-center rounded-lg border border-[#d9d9d4] px-3 py-2 text-sm font-bold disabled:opacity-40">Use text logo</button> : null}</div>{status ? <span role="status" className="mt-2 block text-xs font-semibold leading-5 text-[#64645f]">{status}</span> : null}</div>
      </div>
      <LogoSizePanel title="Navigation logo size" note="Mobile navigation automatically limits wide logos so the menu button remains visible."><LogoRange label="Width" value={width} min={80} max={240} step={4} disabled={uploading} onChange={onWidthChange} /><LogoRange label="Height" value={height} min={28} max={56} step={2} disabled={uploading} onChange={onHeightChange} /></LogoSizePanel>
      <LogoSizePanel title="Footer logo size"><LogoRange label="Width" value={footerWidth} min={80} max={280} step={4} disabled={uploading} onChange={onFooterWidthChange} /><LogoRange label="Height" value={footerHeight} min={28} max={72} step={2} disabled={uploading} onChange={onFooterHeightChange} /></LogoSizePanel>
      <LogoSizePanel title="Company name and slogan size" note="These text sizes apply beside the logo in both the navigation and footer."><LogoRange label="Company name" value={titleSize} min={12} max={24} step={1} disabled={uploading} onChange={onTitleSizeChange} /><LogoRange label="Slogan" value={sloganSize} min={8} max={14} step={1} disabled={uploading} onChange={onSloganSizeChange} /></LogoSizePanel>
    </div>
  );
}

function LogoSizePanel({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return <fieldset className="grid gap-4 rounded-xl border border-[#e7e7e3] bg-[#fafaf8] p-4 sm:grid-cols-2"><legend className="px-1 text-xs font-black uppercase tracking-[.1em] text-[#64645f]">{title}</legend>{children}{note ? <p className="text-xs leading-5 text-[#777771] sm:col-span-2">{note}</p> : null}</fieldset>;
}

function LogoRange({ label, value, min, max, step, disabled, onChange }: { label: string; value: number; min: number; max: number; step: number; disabled: boolean; onChange: (value: number) => void }) {
  return <label className="block text-xs font-extrabold uppercase tracking-[.08em] text-[#64645f]">{label} <span className="normal-case tracking-normal text-[#111111]">{value}px</span><input type="range" min={min} max={max} step={step} value={value} disabled={disabled} onChange={(event) => onChange(Number(event.target.value))} className="mt-3 block w-full accent-[#f97316]" /></label>;
}

function MediaField({ label, value, onChange, mediaReady }: { label: string; value: string; onChange: (value: string) => void; mediaReady: boolean }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState("");
  const [uploading, setUploading] = useState(false);
  async function upload() {
    const file = inputRef.current?.files?.[0];
    if (!file) return setStatus("Choose an image first.");
    if (!["image/jpeg", "image/png", "image/webp", "image/avif"].includes(file.type)) return setStatus("Use a JPG, PNG, WebP or AVIF image.");
    if (file.size > 4 * 1024 * 1024) return setStatus("The image must be smaller than 4 MB.");
    setStatus("Uploading…");
    setUploading(true);
    const data = new FormData(); data.set("file", file);
    try {
      const response = await fetch("/api/admin/media", { method: "POST", body: data });
      const result = await response.json() as { url?: string; message?: string };
      if (!response.ok || !result.url) return setStatus(result.message ?? "Upload failed.");
      onChange(result.url); setStatus("Uploaded. Publish changes to use this image.");
    } catch { setStatus("Upload failed."); }
    finally { setUploading(false); }
  }
  return <div className="min-w-0"><CmsField label={label} value={value} onChange={onChange} /><div className="mt-3 grid gap-3 rounded-xl border border-[#e7e7e3] bg-white p-3 sm:grid-cols-[112px_minmax(0,1fr)] sm:items-center"><div className="aspect-[4/3] overflow-hidden rounded-lg bg-[#f1f1ed]"><img src={value} alt="Current CMS selection" loading="lazy" className="h-full w-full object-cover" /></div><div className="min-w-0"><p className="text-xs font-bold text-[#64645f]">JPG, PNG, WebP or AVIF · maximum 4 MB</p><div className="mt-2 flex flex-col items-stretch gap-2 sm:flex-row sm:flex-wrap sm:items-center"><input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp,image/avif" disabled={!mediaReady || uploading} onChange={() => setStatus("")} className="min-w-0 max-w-full text-xs" /><button type="button" onClick={upload} disabled={!mediaReady || uploading} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#d9d9d4] px-3 py-2 text-sm font-bold disabled:opacity-40"><ImageUp aria-hidden="true" className="h-4 w-4" />{uploading ? "Uploading…" : "Upload"}</button></div>{status ? <span role="status" className="mt-2 block text-xs font-semibold leading-5 text-[#64645f]">{status}</span> : null}</div></div></div>;
}

function CollectionEditor({ title, items, fields, onChange, onRemove, onAdd, maxItems, mediaReady = false }: { title: string; items: readonly Record<string, string>[]; fields: FieldDefinition[]; onChange: (index: number, key: string, value: string) => void; onRemove: (index: number) => void; onAdd: () => void; maxItems: number; mediaReady?: boolean }) {
  return <EditorCard title={title}>{items.map((item, index) => <div key={index} className="min-w-0 rounded-xl border border-[#e7e7e3] bg-[#fafaf8] p-4"><div className="mb-4 flex items-center justify-between gap-3"><span className="text-xs font-black uppercase tracking-[.12em] text-[#999990]">Item {index + 1}</span><button type="button" disabled={items.length <= 1} onClick={() => onRemove(index)} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-30" aria-label={`Remove item ${index + 1}`}><Trash2 aria-hidden="true" className="h-4 w-4" /></button></div><div className="grid min-w-0 gap-4 md:grid-cols-2">{fields.map((field) => field.image ? <MediaField key={field.key} label={field.label} value={item[field.key]} onChange={(value) => onChange(index, field.key, value)} mediaReady={mediaReady} /> : <CmsField key={field.key} label={field.label} value={item[field.key]} multiline={field.multiline} options={field.options} onChange={(value) => onChange(index, field.key, value)} />)}</div></div>)}<button type="button" disabled={items.length >= maxItems} onClick={onAdd} className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#bcbcb5] px-4 py-3 text-sm font-bold hover:border-[#38bdf8] disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"><Plus aria-hidden="true" className="h-4 w-4" />Add item</button></EditorCard>;
}

function SimpleNestedCollection({ title, items, fields, onChange, onRemove, onAdd, maxItems }: { title: string; items: readonly Record<string, string>[]; fields: FieldDefinition[]; onChange: (index: number, key: string, value: string) => void; onRemove: (index: number) => void; onAdd: () => void; maxItems: number }) {
  return <div><h3 className="text-sm font-black">{title}</h3><div className="mt-3 space-y-3">{items.map((item, index) => <div key={index} className="min-w-0 rounded-xl border border-[#e7e7e3] bg-[#fafaf8] p-4"><div className="mb-3 flex items-center justify-between"><span className="text-xs font-black uppercase tracking-[.12em] text-[#999990]">Item {index + 1}</span><button type="button" disabled={items.length <= 1} onClick={() => onRemove(index)} className="flex h-11 w-11 items-center justify-center rounded-lg text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-30" aria-label={`Remove item ${index + 1}`}><Trash2 aria-hidden="true" className="h-4 w-4" /></button></div><div className="grid min-w-0 gap-4 md:grid-cols-2">{fields.map((field) => <CmsField key={field.key} label={field.label} value={item[field.key]} multiline={field.multiline} onChange={(value) => onChange(index, field.key, value)} />)}</div></div>)}</div><button type="button" disabled={items.length >= maxItems} onClick={onAdd} className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#bcbcb5] px-4 py-3 text-sm font-bold hover:border-[#38bdf8] disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"><Plus aria-hidden="true" className="h-4 w-4" />Add item</button></div>;
}

function StringListEditor({ title, items, onChange, onRemove, onAdd, maxItems }: { title: string; items: readonly string[]; onChange: (index: number, value: string) => void; onRemove: (index: number) => void; onAdd: () => void; maxItems: number }) {
  return <div><h3 className="text-sm font-black">{title}</h3><div className="mt-3 space-y-2">{items.map((item, index) => <div key={index} className="flex min-w-0 gap-2"><input value={item} onChange={(e) => onChange(index, e.target.value)} className="min-h-12 min-w-0 flex-1 rounded-xl border border-[#d9d9d4] px-3.5 py-3 text-base outline-none focus:border-[#38bdf8] sm:text-sm" /><button type="button" disabled={items.length <= 1} onClick={() => onRemove(index)} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#e7e7e3] text-red-600 disabled:cursor-not-allowed disabled:opacity-30" aria-label={`Remove ${item}`}><Trash2 aria-hidden="true" className="h-4 w-4" /></button></div>)}</div><button type="button" disabled={items.length >= maxItems} onClick={onAdd} className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg text-sm font-bold text-sky-700 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"><Plus aria-hidden="true" className="h-4 w-4" />Add item</button></div>;
}

function MapEditor({ value, fallbackEmbedUrl, onChange }: { value: SiteContent["map"]; fallbackEmbedUrl: string; onChange: (key: string, value: string) => void }) {
  const [draft, setDraft] = useState(value.embedUrl);
  const [status, setStatus] = useState("");
  const previewUrl = value.embedUrl || fallbackEmbedUrl;

  function applyMap() {
    const pastedValue = draft.trim();
    if (!pastedValue) {
      onChange("embedUrl", "");
      setStatus("Using the map generated from the business address.");
      return;
    }

    const documentFragment = new DOMParser().parseFromString(pastedValue, "text/html");
    const candidate = documentFragment.querySelector("iframe")?.getAttribute("src")?.trim() || pastedValue;
    try {
      const url = new URL(candidate);
      const isGoogleMap = url.protocol === "https:" && /(^|\.)google\.[a-z.]+$/i.test(url.hostname) && url.pathname.startsWith("/maps");
      if (!isGoogleMap) throw new Error("INVALID_MAP_URL");
      onChange("embedUrl", url.toString());
      setDraft(url.toString());
      setStatus("Google Map applied. Publish changes to show it publicly.");
    } catch {
      setStatus("Paste the iframe code from Google Maps → Share → Embed a map, or its HTTPS embed URL.");
    }
  }

  return <EditorCard title="Map section" description="Set the heading and paste the real Google Maps iframe for this location."><CopyFields value={value} keys={["title", "description"]} multiline={["description"]} onChange={onChange} /><div><label className="block text-xs font-extrabold uppercase tracking-[.08em] text-[#64645f]">Google Maps iframe or embed URL<textarea value={draft} onChange={(event) => { setDraft(event.target.value); setStatus(""); }} rows={4} placeholder={'<iframe src="https://www.google.com/maps/embed?...">'} className="mt-2 min-h-28 w-full rounded-xl border border-[#d9d9d4] bg-white px-3.5 py-3 font-mono text-sm normal-case tracking-normal outline-none focus:border-[#38bdf8] focus:ring-4 focus:ring-sky-100" /></label><div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center"><button type="button" onClick={applyMap} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#111111] px-4 py-3 text-sm font-extrabold text-white"><MapPinned aria-hidden="true" className="h-4 w-4" />Apply Google map</button>{value.embedUrl ? <button type="button" onClick={() => { setDraft(""); onChange("embedUrl", ""); setStatus("Custom map cleared. The business-address map will be used after publishing."); }} className="min-h-11 rounded-xl border border-[#d9d9d4] px-4 py-3 text-sm font-bold">Use business address</button> : null}</div>{status ? <p role="status" className={`mt-3 text-xs font-semibold leading-5 ${status.startsWith("Paste") ? "text-red-700" : "text-green-700"}`}>{status}</p> : null}</div><div className="overflow-hidden rounded-2xl border border-[#d9d9d4] bg-[#f1f1ed]"><iframe title="Google Maps CMS preview" src={previewUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="min-h-[320px] w-full border-0" /></div></EditorCard>;
}

function LegalEditor({ title, value, onChange, onSectionChange, onSectionRemove, onSectionAdd }: { title: string; value: SiteContent["legal"]["privacy"]; onChange: (key: string, value: string) => void; onSectionChange: (index: number, key: string, value: string) => void; onSectionRemove: (index: number) => void; onSectionAdd: () => void }) {
  return <EditorCard title={title} description="Edit the public legal page. Review material changes with a qualified adviser."><CopyFields value={value} keys={["title", "intro", "lastUpdated"]} multiline={["intro"]} onChange={onChange} /><SimpleNestedCollection title="Page sections" items={value.sections} maxItems={20} fields={[{ key: "heading", label: "Heading" }, { key: "body", label: "Content", multiline: true }]} onChange={onSectionChange} onRemove={onSectionRemove} onAdd={onSectionAdd} /></EditorCard>;
}

function CopyEditor({ title, value, onChange }: { title: string; value: Record<string, unknown>; onChange: (key: string, value: string) => void }) {
  const keys = Object.keys(value).filter((key) => typeof value[key] === "string");
  return <EditorCard title={title}><CopyFields value={value} keys={keys} multiline={keys.filter((key) => /description|notice/i.test(key))} onChange={onChange} /></EditorCard>;
}

function CopyFields({ value, keys, multiline, onChange }: { value: Record<string, unknown>; keys: readonly string[]; multiline: readonly string[]; onChange: (key: string, value: string) => void }) {
  return <FieldGrid>{keys.map((key) => <CmsField key={key} label={key.replace(/([A-Z])/g, " $1")} value={String(value[key] ?? "")} multiline={multiline.includes(key)} onChange={(next) => onChange(key, next)} />)}</FieldGrid>;
}
