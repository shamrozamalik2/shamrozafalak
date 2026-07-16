import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CircleCheck, Star, X } from "lucide-react";
import GlassCard from "./GlassCard";
import ShinyButton from "./ShinyButton";
import { supabase } from "../lib/supabaseClient";

const EASE = [0.23, 1, 0.32, 1];

const inputClass =
  "w-full rounded-xl bg-white/[0.03] border border-white/10 px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] focus:border-violet-400/50 focus:bg-white/[0.05]";

export default function ShareExperienceModal({ open, onClose }) {
  const [form, setForm] = useState({ name: "", role: "", quote: "" });
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const change = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const reset = () => {
    setForm({ name: "", role: "", quote: "" });
    setRating(5);
    setDone(false);
    setError("");
  };

  const handleClose = () => {
    onClose();
    setTimeout(reset, 300);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!supabase) {
      setError("Reviews aren't connected yet — please try again later.");
      return;
    }
    setSending(true);
    setError("");
    const { error: insertError } = await supabase.from("reviews").insert([
      {
        name: form.name.trim(),
        role: form.role.trim() || null,
        quote: form.quote.trim(),
        rating,
      },
    ]);
    setSending(false);
    if (insertError) {
      setError("Something went wrong submitting your review. Please try again.");
      return;
    }
    setDone(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[999] flex items-center justify-center p-6"
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={handleClose} />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="relative w-full max-w-lg"
          >
            <GlassCard hover={false} className="!bg-[#0d0d10] !border-white/10">
              <button
                onClick={handleClose}
                aria-label="Close"
                className="absolute top-6 right-6 text-neutral-500 hover:text-white transition-colors duration-300"
              >
                <X size={18} />
              </button>

              {done ? (
                <div className="text-center py-8">
                  <CircleCheck size={40} className="mx-auto text-emerald-400 mb-4" />
                  <h3 className="font-serif text-2xl text-white mb-2">Thank you!</h3>
                  <p className="text-neutral-400 text-sm mb-8">
                    Your review is live — it just joined the wall of feedback below.
                  </p>
                  <ShinyButton as="button" onClick={handleClose} type="button">
                    Done
                  </ShinyButton>
                </div>
              ) : (
                <>
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-violet-300">
                    Share Your Experience
                  </span>
                  <h3 className="font-serif text-2xl text-white mt-2 mb-1">Leave a Review</h3>
                  <p className="text-sm text-neutral-500 mb-7">
                    Worked with me on a project? I'd love to hear how it went.
                  </p>

                  <form onSubmit={submit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                          Name
                        </label>
                        <input
                          name="name"
                          value={form.name}
                          onChange={change}
                          placeholder="Jane Doe"
                          required
                          maxLength={80}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                          Role / Company
                        </label>
                        <input
                          name="role"
                          value={form.role}
                          onChange={change}
                          placeholder="Founder, Acme Inc."
                          maxLength={120}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                        Rating
                      </label>
                      <div className="flex gap-1.5" onMouseLeave={() => setHoverRating(0)}>
                        {[1, 2, 3, 4, 5].map((n) => (
                          <button
                            key={n}
                            type="button"
                            onClick={() => setRating(n)}
                            onMouseEnter={() => setHoverRating(n)}
                            aria-label={`Rate ${n} out of 5`}
                            className="p-0.5"
                          >
                            <Star
                              size={24}
                              className={
                                n <= (hoverRating || rating) ? "fill-cyan-400 text-cyan-400" : "text-white/15"
                              }
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                        Your Review
                      </label>
                      <textarea
                        name="quote"
                        value={form.quote}
                        onChange={change}
                        placeholder="What was it like working together?"
                        required
                        maxLength={500}
                        rows={4}
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    <ShinyButton as="button" type="submit" className="w-full justify-center" disabled={sending}>
                      {sending ? "Submitting..." : "Submit Review"}
                    </ShinyButton>

                    {error && <p className="text-sm text-red-400 text-center">{error}</p>}
                  </form>
                </>
              )}
            </GlassCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
