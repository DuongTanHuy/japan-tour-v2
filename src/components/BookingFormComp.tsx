import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookingRequest } from "../types";
import { Ticket, ClipboardCheck, Sparkles, X, Compass, Calendar, User, Heart } from "lucide-react";

interface BookingFormCompProps {
  onSuccess: () => void;
}

export default function BookingFormComp({ onSuccess }: BookingFormCompProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    comment: ""
  });
  const [loading, setLoading] = useState(false);
  const [pastBookings, setPastBookings] = useState<BookingRequest[]>([]);
  const [showTicketsModal, setShowTicketsModal] = useState(false);
  const [newTicketCreated, setNewTicketCreated] = useState<BookingRequest | null>(null);

  useEffect(() => {
    // Load existing local bookings
    try {
      const stored = localStorage.getItem("japan_tours_requests");
      if (stored) {
        setPastBookings(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to parse bookings", e);
    }
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setLoading(true);

    setTimeout(() => {
      const newBooking: BookingRequest = {
        id: "JP-" + Math.floor(100000 + Math.random() * 900000),
        name: formData.name,
        phone: formData.phone,
        comment: formData.comment || "Ready for misty mountain mornings.",
        createdAt: new Date().toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric"
        })
      };

      const updated = [newBooking, ...pastBookings];
      setPastBookings(updated);
      localStorage.setItem("japan_tours_requests", JSON.stringify(updated));

      // Display boarding ticket immediately
      setNewTicketCreated(newBooking);
      setFormData({ name: "", phone: "", comment: "" });
      setLoading(false);
      onSuccess();
    }, 1200);
  };

  return (
    <div className="relative w-full min-h-[500px] flex items-center justify-start py-12 px-2">
      {/* Absolute floating check bookings pill indicator if they have tickets */}
      {pastBookings.length > 0 && (
        <button
          onClick={() => setShowTicketsModal(true)}
          className="absolute -top-12 right-0 bg-lime-accent text-mist-black px-4 py-2 rounded-full font-mono text-[9px] uppercase tracking-[0.2em] font-bold shadow-lg hover:shadow-lime-accent/30 transition-all duration-300 hover:scale-105 select-none z-30 flex items-center gap-1 cursor-none interactive-hover"
        >
          <Ticket className="w-3 h-3 animate-pulse" />
          Tickets ({pastBookings.length})
        </button>
      )}

      {/* Main glass card */}
      <div className="w-full max-w-lg bg-black/55 backdrop-blur-xl border border-[#FFFFFF]/10 rounded-2xl p-8 sm:p-12 relative overflow-hidden">
        {/* Soft atmospheric gradient lines inside */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-lime-accent via-sakura-pink to-lime-accent" />

        <AnimatePresence mode="wait">
          {!newTicketCreated ? (
            <motion.form
              key="booking-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
              onSubmit={handleSubmit}
            >
              <div>
                <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-lime-accent font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Leave a request
                </span>
                <h4 className="font-serif text-3xl sm:text-4xl text-kimono-white font-light tracking-tight mt-2 leading-tight">
                  Want to join us, but still have questions?
                </h4>
              </div>

              {/* Form Input fields */}
              <div className="space-y-6">
                <div className="relative group">
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent border-b border-white/20 hover:border-white/40 focus:border-lime-accent outline-none text-sm py-3 text-kimono-white font-sans transition-all duration-300 peer placeholder-transparent cursor-none group-hover:cursor-none"
                    placeholder="Your name"
                    id="user_booking_name"
                  />
                  <label
                    htmlFor="user_booking_name"
                    className="absolute left-0 top-3 text-xs tracking-wider text-mouse-gray pointer-events-none transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-lime-accent peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-[10px] uppercase font-mono"
                  >
                    Your name
                  </label>
                </div>

                <div className="relative group">
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-transparent border-b border-white/20 hover:border-white/40 focus:border-lime-accent outline-none text-sm py-3 text-kimono-white font-sans transition-all duration-300 peer placeholder-transparent cursor-none"
                    placeholder="Phone number"
                    id="user_booking_phone"
                  />
                  <label
                    htmlFor="user_booking_phone"
                    className="absolute left-0 top-3 text-xs tracking-wider text-mouse-gray pointer-events-none transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-lime-accent peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-[10px] uppercase font-mono"
                  >
                    Phone number
                  </label>
                </div>

                <div className="relative group">
                  <textarea
                    rows={2}
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    className="w-full bg-transparent border-b border-white/20 hover:border-white/40 focus:border-lime-accent outline-none text-sm py-3 text-kimono-white font-sans transition-all duration-300 resize-none peer placeholder-transparent cursor-none"
                    placeholder="Comment"
                    id="user_booking_comment"
                  />
                  <label
                    htmlFor="user_booking_comment"
                    className="absolute left-0 top-3 text-xs tracking-wider text-mouse-gray pointer-events-none transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-lime-accent peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-[10px] uppercase font-mono"
                  >
                    Comment (e.g. preferred month / dietary prep)
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-mountain-cream text-mist-black hover:bg-lime-accent rounded-full font-mono text-xs font-semibold tracking-[0.25em] uppercase hover:scale-[1.01] transition-all duration-500 flex items-center justify-center cursor-none interactive-hover"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-mist-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  "SEND REQUEST"
                )}
              </button>
            </motion.form>
          ) : (
            /* Inside form ticket visualizer when booked */
            <motion.div
              key="success-ticket"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="text-center py-4 space-y-6"
            >
              <div className="mx-auto w-12 h-12 rounded-full bg-lime-accent/15 flex items-center justify-center text-lime-accent border border-lime-accent/30 animate-bounce">
                <ClipboardCheck className="w-6 h-6" />
              </div>
              
              <div>
                <h4 className="font-serif text-2xl text-kimono-white font-normal">
                  You are officially listed!
                </h4>
                <p className="text-xs text-mouse-gray mt-1 max-w-xs mx-auto">
                  We have registered your travel inquiry and generated your pre-boarding boarding layout below:
                </p>
              </div>

              {/* Boarding ticket visualization */}
              <div className="bg-[#141414] border border-mountain-cream/20 text-[#FAFAFA] p-5 rounded-lg text-left font-mono text-[11px] leading-relaxed relative">
                {/* Vintage stamp hole aesthetics */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-mist-black -ml-2 rounded-r-full border-r border-[#333]" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-mist-black -mr-2 rounded-l-full border-l border-[#333]" />

                <div className="border-b border-white/10 pb-3 mb-3 flex justify-between items-center text-[10px]">
                  <span className="text-[#D4F87A] flex items-center gap-1 font-sans tracking-wide">
                    <Compass className="w-3 h-3" /> JAPAN TOURS
                  </span>
                  <span>{newTicketCreated.id}</span>
                </div>

                <div className="space-y-1.5 font-mono">
                  <div>
                    <span className="text-mouse-gray text-[9px] uppercase">PASSENGER:</span>
                    <p className="text-sm font-sans text-kimono-white leading-none font-medium mt-0.5 uppercase tracking-wide">
                      {newTicketCreated.name}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1.5">
                    <div>
                      <span className="text-mouse-gray text-[9px] uppercase">STATUS:</span>
                      <p className="text-[#D4F87A] text-[10px] font-bold">PRE-CONFIRMED</p>
                    </div>
                    <div>
                      <span className="text-mouse-gray text-[9px] uppercase">CLASS:</span>
                      <p className="text-[10px]">CURATED PREMIUM</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1.5">
                    <div>
                      <span className="text-mouse-gray text-[9px] uppercase">DATE EXPEDITION:</span>
                      <p className="text-[10px]">OCTOBER 2026</p>
                    </div>
                    <div>
                      <span className="text-mouse-gray text-[9px] uppercase">CONTACT:</span>
                      <p className="text-[10px] truncate">{newTicketCreated.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Barcode representation */}
                <div className="mt-4 pt-3 border-t border-dashed border-white/20 text-center flex flex-col items-center">
                  <div className="h-6 w-full bg-[linear-gradient(90deg,_#FFF_2px,_transparent_2px,_transparent_5px,_#FFF_5px,_#FFF_6px,_transparent_6px,_#FFF_9px,_#FFF_10px,_transparent_10px,_#FFF_12px,_#FFF_15px,_transparent_15px_)] bg-repeat-x opacity-75" />
                  <span className="text-[7px] text-mouse-gray tracking-[0.4em] mt-1 pr-[-0.4em]">
                    * {newTicketCreated.id} *
                  </span>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setNewTicketCreated(null)}
                  className="px-4 py-1.5 rounded-full border border-white/20 hover:border-white/40 text-mouse-gray hover:text-kimono-white text-[10px] font-mono uppercase tracking-widest cursor-none interactive-hover"
                >
                  Leave another
                </button>
                <button
                  onClick={() => {
                    setShowTicketsModal(true);
                    setNewTicketCreated(null);
                  }}
                  className="px-4 py-1.5 rounded-full bg-[#FAFAFA] hover:bg-lime-accent text-[#0A0A0A] text-[10px] font-mono uppercase tracking-widest font-semibold cursor-none interactive-hover"
                >
                  My Boarding Tickets
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ALL TICKETS MODAL */}
      <AnimatePresence>
        {showTicketsModal && (
          <div className="fixed inset-0 z-[999] bg-[#0A0A0A]/95 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#121212] border border-[#FAFAFA]/10 w-full max-w-2xl rounded-3xl p-6 sm:p-10 relative max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={() => setShowTicketsModal(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full border border-white/10 hover:border-white/30 text-mouse-gray hover:text-white flex items-center justify-center transition-colors cursor-none interactive-hover"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="mb-8">
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-lime-accent flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> OFFICIAL RESERVATION REGISTRY
                </span>
                <h3 className="font-serif text-3xl text-kimono-white mt-1">
                  Your curated boarding passes
                </h3>
                <p className="text-xs text-mouse-gray mt-1">
                  Keep this page bookmarked. Your physical tickets, premium JR-Pass templates, and regional tea ceremony permits will sync here automatically.
                </p>
              </div>

              {/* Tickets List */}
              <div className="space-y-6">
                {pastBookings.map((ticket, idx) => (
                  <motion.div
                    key={ticket.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="border border-mountain-cream/20 bg-[#161616] p-6 rounded-2xl relative font-mono text-[11px] hover:border-lime-accent transition-colors duration-400 group"
                  >
                    {/* Header line */}
                    <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-4">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <span className="text-[#D4F87A] flex items-center gap-1 font-sans text-[10px] font-bold">
                          JAPAN EXPEDITION
                        </span>
                        <span className="text-[9px] text-mouse-gray">/ 10 DAYS</span>
                      </div>
                      <span className="text-lime-accent font-bold text-[10px]">
                        CODE: {ticket.id}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <span className="text-[9px] text-mouse-gray uppercase">EXPLORER Name:</span>
                        <p className="text-xs font-sans font-bold text-kimono-white mt-0.5">
                          {ticket.name}
                        </p>
                      </div>
                      <div>
                        <span className="text-[9px] text-mouse-gray uppercase">CONTACT REG:</span>
                        <p className="text-xs text-kimono-white mt-0.5">
                          {ticket.phone}
                        </p>
                      </div>
                      <div>
                        <span className="text-[9px] text-mouse-gray uppercase">DATE SUBMITTED:</span>
                        <p className="text-xs text-kimono-white mt-0.5">
                          {ticket.createdAt}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 bg-black/40 p-3 rounded-lg text-mouse-gray italic leading-relaxed font-sans text-xs">
                      "{ticket.comment}"
                    </div>

                    {/* Flight status metadata */}
                    <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap justify-between items-center text-[9px] text-mouse-gray">
                      <span className="flex items-center gap-1 text-lime-accent font-semibold font-mono">
                        <User className="w-3 h-3" /> CONFIRMED WITH ASSIGNED CONCIERGE
                      </span>
                      <span>MOSCOW — OSAKA // TOKYO — MOSCOW</span>
                    </div>

                    {/* Fun decorative barcode right side on large grids */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 h-14 w-8 opacity-10 flex flex-col items-center justify-between pointer-events-none group-hover:opacity-20 transition-opacity duration-300">
                      <div className="h-10 w-full bg-[linear-gradient(0deg,_#FFF_1px,_transparent_1px,_transparent_3px,_#FFF_3px)] bg-repeat-y" />
                      <span className="text-[6px]">{idx + 1}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Reset memory */}
              <div className="mt-8 pt-4 border-t border-white/10 flex justify-between items-center">
                <button
                  onClick={() => {
                    const confirmed = window.confirm("Are you sure you want to cancel these travel reservations?");
                    if (confirmed) {
                      localStorage.removeItem("japan_tours_requests");
                      setPastBookings([]);
                      setShowTicketsModal(false);
                    }
                  }}
                  className="font-mono text-[9px] text-sakura-pink hover:text-white uppercase tracking-widest cursor-none interactive-hover flex items-center gap-1"
                >
                  Cancel all reservations
                </button>
                <button
                  onClick={() => setShowTicketsModal(false)}
                  className="px-6 py-2 rounded-full bg-lime-accent text-mist-black font-mono text-[9px] uppercase tracking-widest font-bold cursor-none interactive-hover"
                >
                  Return to Journal
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
