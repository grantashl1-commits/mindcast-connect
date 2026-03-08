import { useState } from "react";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowRight, Shield, Loader2, CheckCircle, Heart, Clock, MessageSquare } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const acknowledgements = [
  { label: "I hear this", icon: Heart },
  { label: "I need time", icon: Clock },
  { label: "I want to respond carefully", icon: MessageSquare },
];

const CoupleRoom = () => {
  const { sharedCards, mode } = useAppContext();
  const { toast } = useToast();
  const [acks, setAcks] = useState<Record<string, string>>({});
  const [partnerAResponse, setPartnerAResponse] = useState<Record<string, string>>({});
  const [partnerBResponse, setPartnerBResponse] = useState<Record<string, string>>({});
  const [submittedA, setSubmittedA] = useState<Record<string, boolean>>({});
  const [submittedB, setSubmittedB] = useState<Record<string, boolean>>({});
  const [nextStep, setNextStep] = useState<{ next_step: string; timeframe: string } | null>(null);
  const [loadingStep, setLoadingStep] = useState(false);
  const [committed, setCommitted] = useState(false);

  const partnerALabel = mode === "family" ? "PARENT" : "PARTNER A";
  const partnerBLabel = mode === "family" ? "TEEN" : "PARTNER B";

  const allBSubmitted = sharedCards.length > 0 && sharedCards.every((c) => submittedB[c.key]);

  const getNextStep = async () => {
    setLoadingStep(true);
    try {
      const summary = sharedCards
        .map((c) => `[${c.label}]: ${c.text}\n${partnerALabel} response: ${partnerAResponse[c.key] || ""}\n${partnerBLabel} response: ${partnerBResponse[c.key] || ""}`)
        .join("\n\n");

      const { data, error } = await supabase.functions.invoke("reflect", {
        body: { journal_entry: summary, mode, action: "next_step" },
      });
      if (error) throw error;
      if (data.error) throw new Error(data.error);
      setNextStep(data);
    } catch (e: any) {
      toast({ title: "Error", description: e.message || "Failed to get next step.", variant: "destructive" });
    } finally {
      setLoadingStep(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary pt-16 relative">
      {/* Safety exit */}
      <Link
        to="/safety"
        className="fixed top-20 right-4 z-50 heading-label text-[9px] bg-destructive text-destructive-foreground px-4 py-2 flex items-center gap-2 hover:opacity-90 transition-opacity"
      >
        <Shield size={12} /> EXIT SAFELY
      </Link>

      <div className="container mx-auto px-6 py-12 lg:py-20 max-w-3xl">
        <AnimatedSection>
          <p className="heading-label text-[10px] text-silver mb-2">SHARED SPACE</p>
          <h1 className="heading-display text-3xl lg:text-5xl text-primary-foreground mb-4">COUPLE ROOM</h1>
          <p className="font-body text-silver leading-relaxed mb-8">
            Only approved reflections appear here. Read each card and respond in turn.
          </p>
        </AnimatedSection>

        {sharedCards.length === 0 ? (
          <AnimatedSection>
            <div className="card-bordered-white p-8 text-center">
              <p className="font-body text-silver mb-4">No shared cards yet. Start by writing in your journal.</p>
              <Link
                to="/journal"
                className="heading-label text-sm bg-primary-foreground text-primary px-8 py-4 hover:bg-silver transition-colors inline-flex items-center gap-3"
              >
                GO TO JOURNAL <ArrowRight size={16} />
              </Link>
            </div>
          </AnimatedSection>
        ) : (
          <div className="space-y-6">
            {sharedCards.map((card) => (
              <AnimatedSection key={card.key}>
                <div className="card-bordered-white p-6 lg:p-8">
                  <span className="heading-label text-[10px] text-primary-foreground mb-3 block">{card.label}</span>
                  <p className="font-body text-silver text-sm leading-relaxed mb-4">{card.text}</p>

                  {/* Acknowledgement chips */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {acknowledgements.map((a) => (
                      <button
                        key={a.label}
                        onClick={() => setAcks((prev) => ({ ...prev, [card.key]: a.label }))}
                        className={`heading-label text-[9px] px-4 py-2 flex items-center gap-2 transition-colors ${
                          acks[card.key] === a.label
                            ? "bg-primary-foreground text-primary"
                            : "border border-silver/30 text-silver hover:border-silver"
                        }`}
                      >
                        <a.icon size={12} />
                        {a.label.toUpperCase()}
                      </button>
                    ))}
                  </div>

                  {/* Guided Conversation: Partner A */}
                  <div className="border-t border-silver/10 pt-4 mt-4">
                    <span className="heading-label text-[9px] text-silver mb-2 block">{partnerALabel} RESPONSE</span>
                    {!submittedA[card.key] ? (
                      <div className="space-y-3">
                        <textarea
                          value={partnerAResponse[card.key] || ""}
                          onChange={(e) => setPartnerAResponse((p) => ({ ...p, [card.key]: e.target.value }))}
                          placeholder="Share your perspective..."
                          className="w-full bg-navy-light text-primary-foreground font-body text-sm p-4 focus:outline-none min-h-[80px] resize-none border border-silver/10"
                        />
                        <button
                          onClick={() => setSubmittedA((p) => ({ ...p, [card.key]: true }))}
                          disabled={!partnerAResponse[card.key]?.trim()}
                          className="heading-label text-[9px] bg-primary-foreground text-primary px-6 py-2 hover:bg-silver transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          SUBMIT
                        </button>
                      </div>
                    ) : (
                      <>
                        <p className="font-body text-silver/80 text-sm mb-4">{partnerAResponse[card.key]}</p>
                        {/* Partner B */}
                        <span className="heading-label text-[9px] text-silver mb-2 block">{partnerBLabel} RESPONSE</span>
                        {!submittedB[card.key] ? (
                          <div className="space-y-3">
                            <textarea
                              value={partnerBResponse[card.key] || ""}
                              onChange={(e) => setPartnerBResponse((p) => ({ ...p, [card.key]: e.target.value }))}
                              placeholder="Share your perspective..."
                              className="w-full bg-navy-light text-primary-foreground font-body text-sm p-4 focus:outline-none min-h-[80px] resize-none border border-silver/10"
                            />
                            <button
                              onClick={() => setSubmittedB((p) => ({ ...p, [card.key]: true }))}
                              disabled={!partnerBResponse[card.key]?.trim()}
                              className="heading-label text-[9px] bg-primary-foreground text-primary px-6 py-2 hover:bg-silver transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              SUBMIT
                            </button>
                          </div>
                        ) : (
                          <p className="font-body text-silver/80 text-sm">{partnerBResponse[card.key]}</p>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </AnimatedSection>
            ))}

            {/* Next step */}
            {allBSubmitted && !nextStep && (
              <AnimatedSection>
                <div className="text-center mt-8">
                  <button
                    onClick={getNextStep}
                    disabled={loadingStep}
                    className="heading-label text-sm bg-primary-foreground text-primary px-10 py-4 hover:bg-silver transition-colors inline-flex items-center gap-3"
                  >
                    {loadingStep ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
                    GET GUIDED NEXT STEP
                  </button>
                </div>
              </AnimatedSection>
            )}

            {nextStep && (
              <AnimatedSection>
                <div className="card-bordered-white p-8 text-center">
                  <CheckCircle size={32} className="text-primary-foreground mx-auto mb-4" />
                  <span className="heading-label text-[10px] text-silver mb-3 block">YOUR NEXT STEP</span>
                  <p className="font-heading font-bold text-xl text-primary-foreground mb-2">{nextStep.next_step}</p>
                  <p className="font-body text-silver text-sm mb-6">Timeframe: {nextStep.timeframe}</p>
                  {!committed ? (
                    <button
                      onClick={() => setCommitted(true)}
                      className="heading-label text-sm bg-primary-foreground text-primary px-10 py-4 hover:bg-silver transition-colors"
                    >
                      WE COMMIT TO THIS
                    </button>
                  ) : (
                    <p className="heading-label text-[10px] text-green-400">✓ COMMITTED</p>
                  )}
                </div>
              </AnimatedSection>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoupleRoom;
