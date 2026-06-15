import { motion, MotionValue, useTransform } from "motion/react";
import { polaroidCards } from "../data";

interface PolaroidStripProps {
  scrollY: MotionValue<number>;
}

export default function PolaroidStrip({ scrollY }: PolaroidStripProps) {
  // Parallax drift: Translate left at 0.4x of scroll speed
  const xTranslation = useTransform(scrollY, (val) => -val * 0.45);

  return (
    <div className="absolute bottom-[8vh] sm:bottom-[10vh] left-[4vw] sm:left-[8vw] z-[28] w-full overflow-visible pointer-events-none">
      <motion.div 
        style={{ x: xTranslation }}
        className="flex gap-4 sm:gap-6 pointer-events-auto"
      >
        {polaroidCards.map((card, idx) => {
          // Add a subtle alternating tilt to each polaroid for an art-directed journal scrapbook look
          const initialTilt = (idx % 2 === 0 ? 1 : -1) * (idx * 1.5 + 1);

          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 50, rotate: initialTilt }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 1.2, 
                delay: 0.2 + idx * 0.15,
                ease: [0.16, 1, 0.3, 1] 
              }}
              whileHover={{ 
                y: -12, 
                rotate: initialTilt * 0.3,
                scale: 1.05,
                transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
              }}
              className="relative flex-none w-[160px] sm:w-[200px] bg-[#FFFFFF] p-3 shadow-2xl rounded-[2px] cursor-none border border-mountain-cream/20 group overflow-visible"
            >
              {/* Subtle back ambient glow on hover */}
              <div className="absolute inset-0 bg-lime-accent/10 opacity-0 group-hover:opacity-100 blur-xl rounded-lg transition-opacity duration-500 pointer-events-none -z-10" />

              {/* Image Container with high quality Unsplash landscapes */}
              <div className="relative w-full aspect-square overflow-hidden bg-mist-black mb-3">
                <img
                  src={card.imageUrl}
                  alt={card.caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
                
                {/* Visual marker element mimicking 35mm slate / film burn strip */}
                <div className="absolute top-1 right-1 font-mono text-[8px] tracking-widest text-[#FFF] opacity-40">
                  35MM FPS_24
                </div>
              </div>

              {/* Caption in bottom-left in fine mouse-type */}
              <div className="mt-1">
                <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-mouse-gray text-left">
                  {card.caption}
                </p>
                <div className="flex justify-between items-center opacity-30 mt-0.5">
                  <span className="font-mono text-[8px]">EXP 2026.06</span>
                  <span className="font-mono text-[8px]">#{idx + 1}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
