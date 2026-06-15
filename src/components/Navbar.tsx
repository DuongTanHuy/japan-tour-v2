import { motion } from "motion/react";
import { Globe } from "lucide-react";

interface NavbarProps {
  onBookClick: () => void;
}

export default function Navbar({ onBookClick }: NavbarProps) {
  const scrollIntoSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-50 px-6 sm:px-12 py-6 flex items-center justify-between pointer-events-none"
    >
      {/* Wordmark Panel */}
      <div className="flex items-center gap-2 pointer-events-auto group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <Globe className="w-4 h-4 text-lime-accent animate-spin-slow transition-transform group-hover:scale-110" />
        <span className="font-sans text-xs tracking-[0.25em] uppercase font-medium text-kimono-white">
          JAPAN <span className="text-lime-accent">TOURS</span>
        </span>
      </div>

      {/* Nav Actions */}
      <div className="flex items-center gap-8 pointer-events-auto">
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: "About", target: "about" },
            { label: "Included", target: "included" },
            { label: "Contacts", target: "contacts" },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => scrollIntoSection(item.target)}
              className="relative text-xs tracking-[0.2em] uppercase font-medium text-kimono-white/80 hover:text-kimono-white transition-colors duration-300 py-1"
            >
              {item.label}
              <motion.span
                className="absolute bottom-0 left-0 w-full h-[1px] bg-lime-accent"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{ originX: 0 }}
              />
            </button>
          ))}
        </nav>

        {/* Quiet outlined booking pill button */}
        <button
          onClick={onBookClick}
          className="px-5 py-2 text-xs tracking-[0.2em] uppercase border border-kimono-white/30 hover:border-lime-accent rounded-full text-kimono-white hover:text-lime-accent transition-all duration-300 backdrop-blur-sm pointer-events-auto bg-mist-black/20"
        >
          Book
        </button>
      </div>
    </motion.header>
  );
}
