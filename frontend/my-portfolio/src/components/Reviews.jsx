import { useEffect, useState } from "react";
import { MessageSquarePlus, Quote, Star } from "lucide-react";
import GlassCard from "./GlassCard";
import SectionHeading from "./SectionHeading";
import ShareExperienceModal from "./ShareExperienceModal";
import { supabase } from "../lib/supabaseClient";

const MASK_STYLE = {
  maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
  WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
};      

function ReviewCard({ review }) {
  return (
    <GlassCard className="w-[360px] sm:w-[400px] shrink-0 text-center" hover={false}>
      <Quote size={30} className="mx-auto text-violet-400/40 mb-5" />
      <p className="font-serif text-lg text-white leading-snug mb-6">“{review.quote}”</p>
      <div className="flex justify-center gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={13} className={i < review.rating ? "fill-cyan-400 text-cyan-400" : "text-white/15"} />
        ))}
      </div>
      <p className="font-serif text-base text-white">{review.name}</p>
      {review.role && <p className="text-xs text-neutral-500">{review.role}</p>}
    </GlassCard>
  );
}

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  // No client (Supabase not configured yet) means there's nothing to load.
  const [loading, setLoading] = useState(() => Boolean(supabase));
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!supabase) return;

    let cancelled = false;

    supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (!cancelled) {
          setReviews(data ?? []);
          setLoading(false);
        }
      });

    const channel = supabase
      .channel("reviews-live")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "reviews" },
        (payload) => setReviews((prev) => [payload.new, ...prev])
      )
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, []);

  const loopItems = reviews.length > 0 ? [...reviews, ...reviews] : [];

  return (
    <section id="reviews" className="py-20 relative">
      <div className="max-w-3xl mx-auto px-6">
        <SectionHeading
          label="Reviews"
          title="What Clients Say"
          sub="Real feedback from people I've worked with — shared live."
          align="center"
        />

        <div className="flex justify-center mb-16 -mt-4">
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm text-neutral-300 hover:text-white hover:border-violet-400/40 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
          >
            <MessageSquarePlus size={16} className="text-violet-300" /> Share Your Experience
          </button>
        </div>
      </div>

      {!loading && reviews.length === 0 && (
        <div className="max-w-md mx-auto px-6 text-center">
          <p className="text-neutral-500">
            No reviews yet — be the first to share how a project with me went.
          </p>
        </div>
      )}

      {reviews.length > 0 && (
        <div className="w-full overflow-hidden" style={MASK_STYLE}>
          <div className="marquee-track gap-6 pr-6">
            {loopItems.map((review, i) => (
              <ReviewCard key={`${review.id}-${i}`} review={review} />
            ))}
          </div>
        </div>
      )}

      <ShareExperienceModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
