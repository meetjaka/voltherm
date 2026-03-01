import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";

export function BentoGridDemo() {
  return (
    <BentoGrid className="max-w-6xl mx-auto">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          className={cn(
            i === 3 || i === 6 ? "md:col-span-2" : "",
            "bg-white/60 hover:bg-white backdrop-blur-md border border-slate-200/60 shadow-lg shadow-slate-200/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/30"
          )}
        />
      ))}
    </BentoGrid>
  );
}
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-primary/10 via-white to-secondary/10 border border-slate-100 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
  </div>
);
const items = [
  {
    title: "High-Density Cells",
    description: "Industry-leading Wh/kg allowing for longer ranges in EV vehicles.",
    header: <Skeleton />,
    icon: <IconClipboardCopy className="h-5 w-5 text-primary" />,
  },
  {
    title: "Smart BMS",
    description: "AI-driven balancing that extends total pack lifespan by up to 40%.",
    header: <Skeleton />,
    icon: <IconFileBroken className="h-5 w-5 text-secondary" />,
  },
  {
    title: "Thermal Armor",
    description: "Active liquid cooling and phase-change materials for absolute safety.",
    header: <Skeleton />,
    icon: <IconSignature className="h-5 w-5 text-purple-500" />,
  },
  {
    title: "Modular Integration",
    description:
      "Stackable architectures designed for rapid deployment in grid-scale energy storage facilities and large industrial applications.",
    header: <Skeleton />,
    icon: <IconTableColumn className="h-5 w-5 text-primary" />,
  },
  {
    title: "Rapid Diagnostics",
    description: "Over-the-air updates and milliseconds-level fault detection.",
    header: <Skeleton />,
    icon: <IconArrowWaveRightUp className="h-5 w-5 text-secondary" />,
  },
  {
    title: "Circular Lifecycle",
    description: "Designed for 95% material recovery at end-of-life recycling.",
    header: <Skeleton />,
    icon: <IconBoxAlignTopLeft className="h-5 w-5 text-purple-500" />,
  },
  {
    title: "Global Certification",
    description: "Exceeding UL, IEC, and UN transport standards for battery units out of the box.",
    header: <Skeleton />,
    icon: <IconBoxAlignRightFilled className="h-5 w-5 text-primary" />,
  },
];

export default BentoGridDemo;
