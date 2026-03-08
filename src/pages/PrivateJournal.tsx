import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { Sparkles, Lock, ArrowRight, Loader2 } from "lucide-react";
import { useAppContext, ReflectionCard } from "@/contexts/AppContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const PrivateJournal = () => {
  const [entry, setEntry] = useState("");
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState<ReflectionCard[] | null>(null);
  const { mode, setSharedCards } = useAppContext();
  const navigate = useNavigate();
  const { toast } = useToast();

  const placeholder =
    mode === "family"
      ? "Write freely about what happened between you and your parent/teen..."
      : "Write freely. This is your private space.";

  const organise = async () => {
    if (!entry.trim()) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("reflect", {
        body: { journal_entry: entry, mode, action: "reflect" },
      });
      if (error) throw error;
      if (data.error) throw new Error(data.error);

      setCards([
        { key: "what_happened", label: "WHAT HAPPENED", text: data.what_happened, shared: false },
        { key: "how_i_felt", label: "HOW I FELT", text: data.how_i_felt, shared: false },
        { key: "what_i_need", label: "WHAT I NEED", text: data.what_i_need, shared: false },
        { key: "what_i_want_to_say", label: "WHAT I WANT TO SAY", text: data.what_i_want_to_say, shared: false },
      ]);
    } catch (e: any) {
      toast({ title: "Error", description: e.message || "Failed to organise reflection.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const toggleShare = (key: string) => {
    setCards((prev) =>
      prev!.map((c) => (c.key === key ? { ...c, shared: !c.shared } : c))
    );
  };

  const sendToCoupleRoom = () => {
    const shared = cards!.filter((c) => c.shared);
    if (shared.length === 0) {
      toast({ title: "Nothing selected", description: "Toggle at least one card to share.", variant: "destructive" });
      return;
    }
    setSharedCards(shared);
    navigate("/couple-room");
  };

  return (
    <div className="min-h-screen bg-primary pt-16">
      <div className="container mx-auto px-6 py-12 lg:py-20 max-w-4xl">
        <AnimatedSection>
          <div className="flex items-center gap-3 mb-2">
            <Lock size={16} className="text-silver" />
            <span className="heading-label text-[10px] text-silver">PRIVATE SPACE — ONLY YOU CAN SEE THIS</span>
          </div>
          <h1 className="heading-display text-3xl lg:text-5xl text-primary-foreground mb-8">YOUR JOURNAL</h1>
        </AnimatedSection>

        {!cards ? (
          <AnimatedSection>
            <div className="card-bordered-white p-0">
              <textarea
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                placeholder={placeholder}
                className="w-full bg-transparent text-primary-foreground font-body text-lg leading-relaxed placeholder:text-silver/40 focus:outline-none min-h-[60vh] resize-none p-8 lg:p-12"
              />
            </div>
            <div className="mt-6 flex justify-center">
              <button
                onClick={organise}
                disabled={!entry.trim() || loading}
                className={`heading-label text-sm px-10 py-4 flex items-center gap-3 transition-colors ${
                  entry.trim() && !loading
                    ? "bg-primary-foreground text-primary hover:bg-silver"
                    : "border border-silver/20 text-silver/30 cursor-not-allowed"
                }`}
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                ORGANISE WITH AI
              </button>
            </div>
          </AnimatedSection>
        ) : (
          <div className="space-y-4">
            {cards.map((card) => (
              <AnimatedSection key={card.key}>
                <div className="card-bordered-white p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="heading-label text-[10px] text-primary-foreground">{card.label}</span>
                    <button
                      onClick={() => toggleShare(card.key)}
                      className={`heading-label text-[9px] px-4 py-2 transition-colors ${
                        card.shared
                          ? "bg-green-600 text-primary-foreground"
                          : "border border-silver/30 text-silver hover:border-silver"
                      }`}
                    >
                      {card.shared ? "SHARING ✓" : "SHARE WITH PARTNER"}
                    </button>
                  </div>
                  <p className="font-body text-silver text-sm leading-relaxed">{card.text}</p>
                </div>
              </AnimatedSection>
            ))}

            <AnimatedSection>
              <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
                <button
                  onClick={() => setCards(null)}
                  className="heading-label text-sm border-[3px] border-primary-foreground/20 text-silver px-8 py-4 hover:border-primary-foreground hover:text-primary-foreground transition-colors"
                >
                  BACK TO WRITING
                </button>
                <button
                  onClick={sendToCoupleRoom}
                  className="heading-label text-sm bg-primary-foreground text-primary px-10 py-4 hover:bg-silver transition-colors inline-flex items-center gap-3"
                >
                  SEND TO COUPLE ROOM <ArrowRight size={16} />
                </button>
              </div>
            </AnimatedSection>

            <div className="border border-silver/10 p-4 mt-4">
              <p className="font-body text-silver/50 text-xs leading-relaxed">
                <strong className="text-silver/70">Disclaimer:</strong> This AI assistant is not a licensed therapist. It organises your own words — it does not diagnose, advise, or interpret your partner's intent.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrivateJournal;
