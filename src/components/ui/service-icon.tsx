import {
  Bath, Building2, ChefHat, Clock3, Droplets, Hammer, KeyRound, Layers3,
  Leaf, MapPin, MessageSquareText, PaintRoller, ShieldCheck, Siren, Wrench, Zap,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/data/site-content";

const icons: Record<IconName, LucideIcon> = {
  bath: Bath,
  building: Building2,
  chef: ChefHat,
  clock: Clock3,
  droplets: Droplets,
  hammer: Hammer,
  key: KeyRound,
  layers: Layers3,
  leaf: Leaf,
  map: MapPin,
  message: MessageSquareText,
  paint: PaintRoller,
  shield: ShieldCheck,
  siren: Siren,
  wrench: Wrench,
  zap: Zap,
};

export function ServiceIcon({ name, className = "h-6 w-6" }: { name: IconName; className?: string }) {
  const Icon = icons[name];
  return <Icon aria-hidden="true" className={className} strokeWidth={1.8} />;
}
