import { ComponentType } from "react";
import { motion } from "motion/react";
import { Compass, Plane, Car, Hotel } from "lucide-react";
import { bentoItems } from "../data";

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Compass: Compass,
  Plane: Plane,
  Car: Car,
  Hotel: Hotel,
};

export default function BentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full py-12">
      {bentoItems.map((item, idx) => {
        const IconComponent = iconMap[item.iconName] || Compass;

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              duration: 0.8, 
              delay: idx * 0.12, 
              ease: [0.16, 1, 0.3, 1] 
            }}
            whileHover={{
              y: -6,
              transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
            }}
            className="group relative bg-[#FFFFFF]/[0.03] backdrop-blur-md border border-[#FFFFFF]/10 p-8 sm:p-10 rounded-2xl cursor-none overflow-hidden transition-colors duration-500 hover:border-lime-accent"
          >
            {/* Subtle base lighting overlay behind card */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4F87A]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            {/* Soft background warm amber-yellow glow inside on hover */}
            <div className="absolute -right-16 -top-16 w-32 h-32 bg-[#D4F87A] rounded-full filter blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none" />

            {/* Icon */}
            <div className="mb-6 flex items-center justify-start">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 text-lime-accent transition-transform duration-500 group-hover:scale-110">
                <IconComponent className="w-6 h-6 stroke-[1.25]" />
              </div>
            </div>

            {/* Header small caps with spacing */}
            <h5 className="font-sans text-xs tracking-[0.25em] uppercase font-semibold text-[#FAFAFA] mb-2">
              {item.title}
            </h5>

            {/* Description */}
            <p className="text-sm text-mouse-gray group-hover:text-kimono-white transition-colors duration-400 font-sans leading-relaxed">
              {item.description}
            </p>

            {/* Decorative film reel coordinate label for Kinfolk metadata vibe */}
            <div className="mt-8 pt-4 border-t border-white/[0.03] flex justify-between items-center opacity-30 group-hover:opacity-50 transition-opacity duration-300">
              <span className="font-mono text-[8px] uppercase tracking-widest text-[#FFFFFF]">
                SEC_02 // 2026
              </span>
              <span className="font-mono text-[8px] text-lime-accent font-semibold">
                + OK // OK
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
