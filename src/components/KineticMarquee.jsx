import React from 'react';
import { 
  FigmaLogo, 
  Layout, 
  Palette, 
  Lightning, 
  Devices, 
  Cpu, 
  PenNib, 
  Cube, 
  Code, 
  Sparkle, 
  Compass, 
  Browsers, 
  Eye, 
  UserFocus 
} from '@phosphor-icons/react';

export const KineticMarquee = () => {
  const marqueeItems = [
    { label: "UI/UX Product Design", icon: Layout },
    { label: "Design Systems & Token Architecture", icon: FigmaLogo },
    { label: "Midjourney AI Asset Generation", icon: Cpu },
    { label: "Micro-Animations & Motion Design", icon: Lightning },
    { label: "Figma Prototyping", icon: Devices },
    { label: "Brand Strategy & Visual Identity", icon: Palette },
    { label: "UX Research & Journey Mapping", icon: UserFocus },
    { label: "Responsive Web Architecture", icon: Browsers },
    { label: "Typography & Layout Craft", icon: PenNib },
    { label: "3D Spatial Visualization", icon: Cube },
    { label: "Design Thinking & Wireframing", icon: Compass },
    { label: "Front-end Code Collaboration", icon: Code },
  ];

  return (
    <div className="w-full bg-zinc-950 text-white border-y border-zinc-800 py-4 mt-6 mb-12 overflow-hidden select-none">
      <div className="animate-marquee-left flex items-center gap-8 whitespace-nowrap">
        {[...marqueeItems, ...marqueeItems].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm font-mono tracking-wider text-zinc-300 font-medium">
              <Icon size={16} weight="duotone" className="text-orange-400" />
              <span>{item.label}</span>
              <span className="text-zinc-600 font-bold">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
