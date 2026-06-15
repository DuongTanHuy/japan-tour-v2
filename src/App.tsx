import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Lenis from "lenis";
import {
  Instagram,
  Facebook,
  Send,
  Globe,
  ChevronDown,
  Check,
  Sparkles,
} from "lucide-react";

import Navbar from "./components/Navbar";
import PolaroidStrip from "./components/PolaroidStrip";
import VerticalTimeline from "./components/VerticalTimeline";
import BentoGrid from "./components/BentoGrid";
import BookingFormComp from "./components/BookingFormComp";
import CustomCursor from "./components/CustomCursor";

import { HERO_BG_IMAGE, HERO_FG_IMAGE, BOOK_BG_IMAGE } from "./data";

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [booked, setBooked] = useState(false);

  // Initialize Lenis smooth scroll on mount
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Set up scroll tracking for custom parallax
  const { scrollY } = useScroll();

  // "Mountains translate up at 0.3x scroll, "JAPAN" typography at 0.5x, kimono figure stays fixed"
  const yMountains = useTransform(scrollY, (val) => -val * 0.3);
  const yJapanText = useTransform(scrollY, (val) => -val * 0.6); // text translates faster so it climbs above mountain line on scroll

  // Scroll down to booking helper
  const scrollToBooking = () => {
    const el = document.getElementById("contacts");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-mist-black text-kimono-white selection:bg-lime-accent selection:text-mist-black overflow-hidden font-sans"
    >
      {/* Cinematic Custom Cursor overlay */}
      <CustomCursor />

      {/* Floating Header Navbar */}
      <Navbar onBookClick={scrollToBooking} />

      {/* FIXED/FLOATING RIGHT SOCIAL BAR (faint outline) */}
      <div className="fixed right-6 sm:right-10 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-6 items-center pointer-events-none">
        <div className="w-[1px] h-16 bg-white/10" />
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="text-white/40 hover:text-lime-accent transition-colors duration-400 p-2 border border-white/5 hover:border-lime-accent/50 rounded-full bg-black/30 backdrop-blur-sm pointer-events-auto cursor-none interactive-hover"
        >
          <Instagram className="w-4 h-4" />
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noreferrer"
          className="text-white/40 hover:text-lime-accent transition-colors duration-400 p-2 border border-white/5 hover:border-lime-accent/50 rounded-full bg-black/30 backdrop-blur-sm pointer-events-auto cursor-none interactive-hover"
        >
          <Facebook className="w-4 h-4" />
        </a>
        <a
          href="https://t.me"
          target="_blank"
          rel="noreferrer"
          className="text-white/40 hover:text-lime-accent transition-colors duration-400 p-2 border border-white/5 hover:border-lime-accent/50 rounded-full bg-black/30 backdrop-blur-sm pointer-events-auto cursor-none interactive-hover"
        >
          <Send className="w-4 h-4" />
        </a>
        <div className="w-[1px] h-16 bg-white/10" />
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/30 vertical-text select-none">
          {/* SEC_01 // CO_OR */}
        </span>
      </div>

      {/* ================= HERO SECTION ================= */}
      <section className="relative w-full h-[100svh] overflow-hidden bg-gradient-to-b from-[#161623] via-[#33252d] to-[#402a28] flex items-center justify-center">
        {/* Plane 1: BACKGROUND SKY & misty mountains layer (translates up at 0.3x) */}
        <motion.div
          style={{ y: yMountains }}
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
        >
          {/* Base cinematic misty hills backdrop */}
          <img
            src={HERO_BG_IMAGE}
            alt="Misty mountain sunrise in Japan"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center scale-105 filter brightness-[0.85] contrast-[1.05]"
          />
          {/* Subtle natural sun flare overlay on top center */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#402a28]/10 to-[#0A0A0A] pointer-events-none" />
          <div className="absolute top-[10%] left-[25%] w-[40vw] h-[40vw] bg-[#F5E8D3] opacity-15 rounded-full filter blur-[140px] pointer-events-none" />
        </motion.div>

        {/* Plane 2: MID-GROUND MONUMENTAL TYPOGRAPHY ("JAPAN") */}
        <motion.div
          style={{ y: yJapanText }}
          className="absolute inset-x-0 top-[22vh] sm:top-[20vh] z-10 flex justify-center pointer-events-none w-full border-none outline-none select-none"
        >
          <h1
            className="font-display font-light text-[18vw] leading-none uppercase text-transparent tracking-[0.12em] select-none text-center"
            style={{
              WebkitTextStroke: "1px rgba(245, 232, 211, 0.40)",
              fontFamily: "'Oswald', 'Bebas Neue', sans-serif",
            }}
          >
            JAPAN
          </h1>
        </motion.div>

        {/* Plane 2B: TRANSITION / CROPPING MOUNTAIN OVERLAY (z-15) */}
        {/* This covers the bottom half of the text and lets the text emerge from behind the mountain skyline */}
        <div
          className="absolute bottom-0 left-0 w-full h-[58vh] sm:h-[62vh] pointer-events-none z-15"
          style={{
            maskImage: "linear-gradient(to bottom, transparent 0%, black 15%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 15%)",
          }}
        >
          {/* Layered mountain silhouettes or misty overlay to cover the text base perfectly */}
          <img
            src={HERO_BG_IMAGE}
            alt="Crop mountain layer"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top scale-105 filter brightness-[0.85] opacity-95"
          />
          {/* Gradient to melt the bottom of the mountains into Section 01 pure black */}
          <div className="absolute inset-x-0 bottom-0 h-[25vh] bg-gradient-to-t from-mist-black via-mist-black/60 to-transparent" />
        </div>

        {/* Plane 3: FOREGROUND SOLITARY KIMONO WOMAN (Fixed on the right edge, z-25, and cherry bls) */}
        <div className="absolute bottom-0 right-[2vw] md:right-[5vw] h-[70vh] sm:h-[82vh] max-w-[45vw] z-25 pointer-events-none select-none">
          <img
            src={HERO_FG_IMAGE}
            alt="Kimono figure looking down misty valley"
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain object-bottom filter contrast-[1.02] drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
          />
          {/* Vignette on kimono layer to blend edge */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#0A0A0A]/0 to-[#0A0A0A]/5 pointer-events-none" />
        </div>

        {/* Polaroid Cards strip drifting left across lower-left third */}
        <PolaroidStrip scrollY={scrollY} />

        {/* Plane 3B: Chunky floating BOOK button to the left of the figure with amber filler */}
        <div className="absolute bottom-[4vh] sm:bottom-[8vh] right-[30vw] md:right-[38vw] lg:right-[42vw] z-30 pointer-events-auto">
          <motion.button
            onClick={scrollToBooking}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="relative px-8 py-4 bg-[#F5E8D3]/10 backdrop-blur-md rounded-full border border-[#F5E8D3]/35 text-[#F5E8D3] font-mono text-xs tracking-[0.25em] font-semibold uppercase group overflow-hidden shadow-2xl transition-colors duration-300 hover:text-mist-black select-none pointer-events-auto cursor-none interactive-hover"
          >
            {/* The bottom-up filling amber warm gradient */}
            <span className="absolute bottom-0 left-0 w-full h-0 bg-gradient-to-t from-[#D4F87A] via-[#E2885C] to-[#E9905C]/90 group-hover:h-full transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none -z-10" />

            <span className="relative flex items-center gap-1.5 font-bold">
              PLAN EXPEDITION{" "}
              <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
            </span>
          </motion.button>
        </div>
      </section>

      {/* ================= 01 — ABOUT THE TOUR ================= */}
      <section
        id="about"
        className="relative z-30 bg-mist-black py-24 sm:py-32 px-6 sm:px-12 md:px-20 border-t border-white/5"
      >
        {/* Heading Header Line */}
        <div className="flex items-center gap-8 mb-20">
          <div className="h-[1px] flex-grow bg-white/10" />
          <h2 className="font-display font-light text-5xl sm:text-6xl text-center uppercase tracking-[0.18em] text-[#FAFAFA]">
            ABOUT THE TOUR
          </h2>
          <div className="h-[1px] flex-grow bg-white/10" />
        </div>

        {/* Two Column Section Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column Text Content */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="border-l-2 border-lime-accent/60 pl-6 space-y-6">
              <p className="font-serif text-xl sm:text-2xl font-light text-kimono-white/90 leading-relaxed">
                We've planned a simple and convenient 10-day itinerary for your
                trip to Japan. You'll visit three cities:{" "}
                <motion.span
                  className="font-normal border-b-2 border-lime-accent/30 text-lime-accent"
                  initial={{ backgroundSize: "0% 100%" }}
                  whileInView={{ color: "#D4F87A" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                >
                  Osaka, Kyoto, and Tokyo.
                </motion.span>
              </p>

              <p className="text-sm sm:text-base text-mouse-gray font-sans leading-relaxed">
                No need to worry about routes, schedules, or finding places —
                everything is already organized. We'll show you where to go,
                what to see, and where to eat, so you can simply{" "}
                <span className="text-lime-accent font-medium tracking-wide">
                  enjoy the journey.
                </span>
              </p>
            </div>

            {/* Micro details matching the Kinfolk layout */}
            <div className="grid grid-cols-2 gap-4 pt-8 border-t border-white/5 font-mono text-[10px] text-white/40">
              <div>
                <span className="text-lime-accent font-semibold block mb-1">
                  01 / DURATION
                </span>
                10 Days / 9 Nights
              </div>
              <div>
                <span className="text-lime-accent font-semibold block mb-1">
                  02 / GROUP LIMIT
                </span>
                Maximum 12 Explorers
              </div>
              <div>
                <span className="text-lime-accent font-semibold block mb-1">
                  03 / LEVEL
                </span>
                Curated Walks & Tea Rituals
              </div>
              <div>
                <span className="text-lime-accent font-semibold block mb-1">
                  04 / PERSISTENT
                </span>
                Offline Room Sync Enabled
              </div>
            </div>
          </div>

          {/* Right Column Interactive Vertical Timeline with scrapbook clusters */}
          <div className="lg:col-span-7">
            <VerticalTimeline />
          </div>
        </div>
      </section>

      {/* ================= 02 — WHAT'S INCLUDED ================= */}
      <section
        id="included"
        className="relative z-30 bg-mist-black py-24 sm:py-32 px-6 sm:px-12 md:px-20 border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header left aligned with hairline drawing right */}
          <div className="flex items-center gap-8 mb-16 sm:mb-20">
            <h2 className="font-display font-light text-5xl sm:text-6xl uppercase tracking-[0.18em] text-[#FAFAFA] flex-none">
              WHAT'S INCLUDED
            </h2>
            <div className="h-[1px] flex-grow bg-white/10" />
          </div>

          {/* Bento cards 4-up Grid representation */}
          <BentoGrid />
        </div>
      </section>

      {/* ================= 03 — CONTACT / BOOK ================= */}
      <section
        id="contacts"
        className="relative z-30 w-full min-h-screen py-24 sm:py-32 flex items-center justify-center px-6 sm:px-12 md:px-20 bg-[#07070F]"
      >
        {/* Full-bleed Mt Fuji background image with cherry blossom framing */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <img
            src={BOOK_BG_IMAGE}
            alt="Mount Fuji with cherry blossom blossoms"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-[0.5] contrast-[1.05]"
          />
          {/* Fade transition filters overlay */}
          <div className="absolute inset-x-0 top-0 h-[25vh] bg-gradient-to-b from-mist-black to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-[25vh] bg-gradient-to-t from-mist-black to-transparent pointer-events-none" />
        </div>

        {/* Outer boundaries container */}
        <div className="max-w-7xl mx-auto w-full z-10 relative flex justify-start">
          {/* Frosted Glass form container & Ticket Reservation engine */}
          <BookingFormComp onSuccess={() => setBooked(true)} />
        </div>

        {/* Subtle decorative bottom-left coordinates */}
        <div className="absolute bottom-6 left-6 font-mono text-[8px] text-white/25 select-none pointer-events-none hidden md:block">
          LOCATION MAP: 35.3606° N, 138.7274° E // FUJI JAPAN
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="relative z-30 bg-mist-black pt-16 pb-12 px-6 sm:px-12 md:px-20 border-t border-[#FFFFFF]/10 max-w-full">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Top Divisor */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-white/5">
            {/* Wordmark logo */}
            <div
              className="flex items-center gap-2 group cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <Globe className="w-4 h-4 text-lime-accent group-hover:scale-105 transition-transform" />
              <span className="font-sans text-xs tracking-[0.25em] uppercase font-bold text-kimono-white">
                JAPAN <span className="text-lime-accent">TOURS</span>
              </span>
            </div>

            {/* Repeating Nav links */}
            <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
              {[
                { label: "Home", scroll: 0 },
                { label: "About", target: "about" },
                { label: "Included", target: "included" },
                { label: "Contacts", target: "contacts" },
              ].map((link) => (
                <button
                  key={link.label}
                  onClick={() => {
                    if (link.scroll === 0) {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    } else if (link.target) {
                      const el = document.getElementById(link.target);
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="text-xs uppercase tracking-[0.2em] font-medium text-mouse-gray hover:text-[#FAFAFA] transition-colors duration-300 cursor-none interactive-hover"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Faint bottom socials */}
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-mouse-gray hover:text-lime-accent transition-colors duration-300 cursor-none interactive-hover text-xs font-mono uppercase tracking-widest"
              >
                Instagram
              </a>
              <span className="text-white/10 select-none">/</span>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="text-mouse-gray hover:text-lime-accent transition-colors duration-300 cursor-none interactive-hover text-xs font-mono uppercase tracking-widest"
              >
                Facebook
              </a>
              <span className="text-white/10 select-none">/</span>
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="text-mouse-gray hover:text-lime-accent transition-colors duration-300 cursor-none interactive-hover text-xs font-mono uppercase tracking-widest"
              >
                Telegram
              </a>
            </div>
          </div>

          {/* Bottom attribution labels */}
          <div className="flex flex-col sm:flex-row justify-between items-center text-left text-[9px] font-mono text-mouse-gray/65 gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <p>© 2026 JAPAN TOURS CO. ALL RIGHTS RESERVED.</p>
              <p>LICENSED INDEPENDENT OPERATOR #TYO-9003-JP-2026</p>
            </div>
            <div className="text-center sm:text-right space-y-1">
              <p>CRAFTED FOR CINEMATIC EXQUISITENESS // 35MM GRAIN GRADED</p>
              <p className="text-lime-accent font-semibold tracking-wider">
                CONFIDENTLY DESIGNED, NO DECORATIVE EXTRA NOISE
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
