import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowRight, Shield, Loader2, CheckCircle, Heart, Clock, MessageSquare, History } from "lucide-react";
import { useAppContext, Commitment } from "@/contexts/AppContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const acknowledgements = [
  { label: "I hear this", icon: Heart },
  { label: "I need time", icon: Clock },
  { label: "I want to respond carefully", icon: MessageSquare },
];

const CoupleRoom = () => {
  const { setup, mode, partnerACards, partnerBCards, commitments, addCommitment, activePartner } = useAppContext();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [acks, setAcks] = useState<Record<string, string>>({});
  const [responseA, setResponseA] = useState<Record<string, string>>({});
  const [responseB, setResponseB] = useState<Record<string, string>>({});
  const [submittedA, setSubmittedA] = useState<Record<string, boolean>>({});
  const [submittedB, setSubmittedB] = useState<Record<string, boolean>>({});
  const [nextStep, setNextStep] = useState<{ next_step: string; timeframe: string; why?: string } | null>(null);
  const [loadingStep, setLoadingStep] = useState(false);
  const [committed, setCommitted] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  if (!setup) {
    navigate("/");
    return null;
  }

  const sharedA = partnerACards.filter((c) => c.shared);
  const sharedB = partnerBCards.filter((c) => c.shared);
  const allCategories = ["what_happened", "how_i_felt", "what_i_need", "what_i_want_to_say"];
  
  // Match cards by category for paired conversation
  const pairedCategories = allCategories.filter(
    (key) => sharedA.some((c) => c.key === key) || sharedB.some((c) => c.key === key)
  );

  const allResponded = pairedCategories.length > 0 && pairedCategories.every((key) => submittedA[key] && submittedB[key]);

  const getNextStep = async () => {
    setLoadingStep(true);
    try {
      const summary = pairedCategories
        .map((key) => {
          const aCard = sharedA.find((c) => c.key === key);
          const bCard = sharedB.find((c) => c.key === key);
          return `[${key}]\n${setup.partnerA.name}: ${aCard?.text || "Not shared"}\n${setup.partnerA.name} response: ${responseA[key] || ""}\n${setup.partnerB.name}: ${bCard?.text || "Not shared"}\n${setup.partnerB.name} response: ${responseB[key] || ""}`;
        })
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

  const commitToStep = () => {
    if (!nextStep) return;
    addCommitment({ ...nextStep, date: new Date().toLocaleDateString() });
    setCommitted(true);
  };

  return (
    <div className="min-h-screen bg-primary pt-16 relative">
      <Link
        to="/safety"
        className="fixed top-20 right-4 z-50 heading-label text-[9px] bg-destructive text-destructive-foreground px-4 py-2 flex items-center gap-2 hover:opacity-90 transition-opacity"
      >
        <Shield size={12} /> EXIT SAFELY
      </Link>

      <div className="container mx-auto px-6 py-12 lg:py-20 max-w-5xl">
        <AnimatedSection>
          <p className="heading-label text-[10px] text-silver mb-2">SHARED SPACE</p>
          <h1 className="heading-display text-3xl lg:text-5xl text-primary-foreground mb-2">
            {setup.partnerA.name.toUpperCase()} & {setup.partnerB.name.toUpperCase()}
          </h1>
          <p className="font-body text-silver leading-relaxed mb-8">
            Only approved reflections appear here. Read each card and respond in turn.
          </p>
        </AnimatedSection>

        {sharedA.length === 0 && sharedB.length === 0 ? (
          <AnimatedSection>
            <div className="card-bordered-white p-8 text-center">
              <p className="font-body text-silver mb-4">No shared cards yet.</p>
              <button onClick={() => navigate(activePartner === "A" ? "/dashboard-a" : "/dashboard-b")} className="heading-label text-sm bg-primary-foreground text-primary px-8 py-4 hover:bg-silver transition-colors inline-flex items-center gap-3">
                BACK TO YOUR SPACE <ArrowRight size={16} />
              </button>
            </div>
          </AnimatedSection>
        ) : (
          <div className="space-y-8">
            {/* Side by side cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Partner A column */}
              <div>
                <span className="heading-label text-[10px] text-silver mb-4 block">{setup.partnerA.name.toUpperCase()}'S REFLECTIONS</span>
                <div className="space-y-3">
                  {sharedA.map((card) => (
                    <div key={card.key} className="p-5 border-4" style={{ borderColor: "hsl(215 30% 30%)" }}>
                      <span className="heading-label text-[9px] text-silver mb-2 block">{card.label}</span>
                      <p className="font-body text-silver text-sm leading-relaxed">{card.text}</p>
                    </div>
                  ))}
                  {sharedA.length === 0 && (
                    <div className="border-2 border-silver/10 p-4 text-center">
                      <p className="font-body text-silver/50 text-xs">No cards shared yet</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Partner B column */}
              <div>
                <span className="heading-label text-[10px] text-silver mb-4 block">{setup.partnerB.name.toUpperCase()}'S REFLECTIONS</span>
                <div className="space-y-3">
                  {sharedB.map((card) => (
                    <div key={card.key} className="p-5 border-4" style={{ borderColor: "hsl(25 30% 25%)" }}>
                      <span className="heading-label text-[9px] text-silver mb-2 block">{card.label}</span>
                      <p className="font-body text-silver text-sm leading-relaxed">{card.text}</p>
                    </div>
                  ))}
                  {sharedB.length === 0 && (
                    <div className="border-2 border-silver/10 p-4 text-center">
                      <p className="font-body text-silver/50 text-xs">No cards shared yet</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Guided Conversation threads */}
            <AnimatedSection>
              <span className="heading-label text-[10px] text-silver mb-4 block">GUIDED CONVERSATION</span>
              <div className="space-y-6">
                {pairedCategories.map((key) => {
                  const label = key.replace(/_/g, " ").toUpperCase();
                  return (
                    <div key={key} className="card-bordered-white p-6">
                      <span className="heading-label text-[10px] text-primary-foreground mb-4 block">{label}</span>

                      {/* Ack chips */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {acknowledgements.map((a) => (
                          <button
                            key={a.label}
                            onClick={() => setAcks((prev) => ({ ...prev, [key]: a.label }))}
                            className={`heading-label text-[9px] px-4 py-2 flex items-center gap-2 transition-colors ${
                              acks[key] === a.label
                                ? "bg-primary-foreground text-primary"
                                : "border border-silver/30 text-silver hover:border-silver"
                            }`}
                          >
                            <a.icon size={12} /> {a.label.toUpperCase()}
                          </button>
                        ))}
                      </div>

                      {/* Partner A response */}
                      <div className="border-l-4 pl-4 mb-4" style={{ borderColor: "hsl(215 30% 30%)" }}>
                        <span className="heading-label text-[9px] text-silver mb-2 block">{setup.partnerA.name.toUpperCase()}</span>
                        {!submittedA[key] ? (
                          <div className="space-y-2">
                            <textarea
                              value={responseA[key] || ""}
                              onChange={(e) => setResponseA((p) => ({ ...p, [key]: e.target.value }))}
                              placeholder="Share your perspective..."
                              className="w-full bg-navy-light text-primary-foreground font-body text-sm p-3 focus:outline-none min-h-[60px] resize-none border border-silver/10"
                            />
                            <button
                              onClick={() => setSubmittedA((p) => ({ ...p, [key]: true }))}
                              disabled={!responseA[key]?.trim()}
                              className="heading-label text-[9px] bg-primary-foreground text-primary px-6 py-2 hover:bg-silver transition-colors disabled:opacity-30"
                            >
                              SUBMIT
                            </button>
                          </div>
                        ) : (
                          <p className="font-body text-silver/80 text-sm">{responseA[key]}</p>
                        )}
                      </div>

                      {/* Partner B response — revealed after A */}
                      {submittedA[key] && (
                        <div className="border-l-4 pl-4" style={{ borderColor: "hsl(25 30% 25%)" }}>
                          <span className="heading-label text-[9px] text-silver mb-2 block">{setup.partnerB.name.toUpperCase()}</span>
                          {!submittedB[key] ? (
                            <div className="space-y-2">
                              <textarea
                                value={responseB[key] || ""}
                                onChange={(e) => setResponseB((p) => ({ ...p, [key]: e.target.value }))}
                                placeholder="Share your perspective..."
                                className="w-full bg-navy-light text-primary-foreground font-body text-sm p-3 focus:outline-none min-h-[60px] resize-none border border-silver/10"
                              />
                              <button
                                onClick={() => setSubmittedB((p) => ({ ...p, [key]: true }))}
                                disabled={!responseB[key]?.trim()}
                                className="heading-label text-[9px] bg-primary-foreground text-primary px-6 py-2 hover:bg-silver transition-colors disabled:opacity-30"
                              >
                                SUBMIT
                              </button>
                            </div>
                          ) : (
                            <p className="font-body text-silver/80 text-sm">{responseB[key]}</p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </AnimatedSection>

            {/* Next step */}
            {allResponded && !nextStep && (
              <AnimatedSection>
                <div className="text-center mt-8">
                  <button
                    onClick={getNextStep}
                    disabled={loadingStep}
                    className="heading-label text-sm bg-primary-foreground text-primary px-10 py-4 hover:bg-silver transition-colors inline-flex items-center gap-3"
                  >
                    {loadingStep ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
                    GET OUR NEXT STEP
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
                    <button onClick={commitToStep} className="heading-label text-sm bg-primary-foreground text-primary px-10 py-4 hover:bg-silver transition-colors">
                      WE COMMIT TO THIS
                    </button>
                  ) : (
                    <p className="heading-label text-[10px] text-primary-foreground">✓ COMMITTED</p>
                  )}
                </div>
              </AnimatedSection>
            )}

            {/* History */}
            {commitments.length > 0 && (
              <AnimatedSection>
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="heading-label text-[10px] text-silver flex items-center gap-2 hover:text-primary-foreground transition-colors"
                >
                  <History size={14} /> VIEW OUR HISTORY ({commitments.length})
                </button>
                {showHistory && (
                  <div className="space-y-3 mt-4">
                    {commitments.map((c, i) => (
                      <div key={i} className="border-2 border-silver/20 p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="heading-label text-[9px] text-silver">{c.date}</span>
                          <span className="heading-label text-[9px] text-silver">{c.timeframe}</span>
                        </div>
                        <p className="font-body text-primary-foreground text-sm">{c.next_step}</p>
                      </div>
                    ))}
                  </div>
                )}
              </AnimatedSection>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoupleRoom;
