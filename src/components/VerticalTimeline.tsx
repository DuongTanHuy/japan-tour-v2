import { motion } from "motion/react";
import { timelineTour } from "../data";
import { useRef, useEffect, useState } from "react";

export default function VerticalTimeline() {
  return (
    <div className="relative w-full py-8">
      {/* Hairline timeline center axis line */}
      <div className="absolute left-6 md:left-8 top-0 bottom-0 w-[1px] bg-kimono-white/10" />

      <div className="space-y-24 md:space-y-36">
        {timelineTour.map((item, index) => {
          return (
            <TimelineItem 
              key={item.id} 
              item={item} 
              index={index} 
            />
          );
        })}
      </div>
    </div>
  );
}

interface TimelineItemProps {
  key?: string;
  item: typeof timelineTour[0];
  index: number;
}

function TimelineItem({ item, index }: TimelineItemProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative grid grid-cols-1 md:grid-cols-12 gap-8 items-start pl-12 md:pl-0"
    >
      {/* Node pin indicator */}
      <div className="absolute left-[20px] md:left-[31px] top-2 z-10">
        <motion.div 
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2, ease: "easeOut" }}
          className="w-[12px] h-[12px] rounded-full bg-lime-accent shadow-[0_0_12px_rgba(212,248,122,0.6)] border border-mist-black"
        />
      </div>

      {/* Days & Location Column */}
      <div className="md:col-span-4 text-left md:pr-8 md:text-right">
        <motion.p 
          className="font-mono text-xs tracking-[0.2em] uppercase text-lime-accent"
          initial={{ opacity: 0, x: -15 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -15 }}
          transition={{ duration: 0.8, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {item.days}
        </motion.p>
        <motion.h4 
          className="font-display font-medium text-4xl tracking-tight text-kimono-white mt-1 uppercase"
          initial={{ opacity: 0, x: -15 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -15 }}
          transition={{ duration: 0.8, delay: index * 0.2 + 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {item.city}
        </motion.h4>
      </div>

      {/* Content description & Scrapbook photo cluster Column */}
      <div className="md:col-span-8 flex flex-col sm:flex-row gap-8 items-start justify-between">
        {/* Short info */}
        <div className="max-w-sm text-left">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 + 0.2 }}
            className="text-sm text-mouse-gray leading-relaxed font-sans mt-1"
          >
            {item.city === "Osaka" && (
              "The dynamic street kitchen of Western Japan. Wander underneath the monumental neon signs of Dotonbori, explore the sprawling historic Osaka castle parklands, and discover unmatched local delicacies."
            )}
            {item.city === "Kyoto" && (
              "The spiritual capital of timeless Japan. Feel the hush of ancient cedar-clad temples, stroll along the quiet stone laneways of Higashiyama, and enjoy traditional kaiseki dining in hidden spots."
            )}
            {item.city === "Tokyo" && (
              "The colossal modern metropolis. Experience the breathtaking human motion of Shibuya, explore futuristic art galleries, nested shrine groves, and Michelin-starred ramen taverns at night."
            )}
          </motion.p>
        </div>

        {/* Photo collage Scrapbook container - responsive layout */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, delay: index * 0.2 + 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-[240px] h-[190px] sm:w-[280px] sm:h-[220px] mx-auto sm:mx-0 group cursor-none"
        >
          {/* Photo A (Background-ish / Left tilted) */}
          <motion.div
            className="absolute left-2 top-2 w-[140px] sm:w-[160px] aspect-[4/3] bg-white p-2 rounded-[2px] shadow-lg border border-mountain-cream/15 overflow-hidden z-10"
            animate={{
              rotate: -4,
              x: 0,
              y: 0,
            }}
            whileHover={{
              rotate: -12,
              x: -18,
              y: -8,
              scale: 1.05,
              zIndex: 30,
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.7)"
            }}
            transition={{ type: "spring", stiffness: 180, damping: 15 }}
          >
            <div className="w-full h-full bg-mist-black overflow-hidden relative">
              <img
                src={item.photos[0]}
                alt={`${item.city} scene 1`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute bottom-1 left-1 bg-black/50 text-[#FAFAFA] font-mono text-[6px] tracking-widest px-1 py-0.5 rounded">
                SLIDE A
              </div>
            </div>
          </motion.div>

          {/* Photo B (Foreground / Right tilted) */}
          <motion.div
            className="absolute right-2 bottom-2 w-[140px] sm:w-[160px] aspect-[4/3] bg-white p-2 rounded-[2px] shadow-xl border border-mountain-cream/15 overflow-hidden z-20"
            animate={{
              rotate: 3,
              x: 0,
              y: 0,
            }}
            whileHover={{
              rotate: 10,
              x: 18,
              y: 8,
              scale: 1.05,
              zIndex: 30,
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.7)"
            }}
            transition={{ type: "spring", stiffness: 180, damping: 15 }}
          >
            <div className="w-full h-full bg-mist-black overflow-hidden relative">
              <img
                src={item.photos[1]}
                alt={`${item.city} scene 2`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute bottom-1 right-1 bg-black/50 text-[#FAFAFA] font-mono text-[6px] tracking-widest px-1 py-0.5 rounded">
                SLIDE B
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
