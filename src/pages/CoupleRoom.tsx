import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowRight, Shield, Loader2, CheckCircle, Heart, Clock, MessageSquare, History } from "lucide-react";
import { useAppContext, Commitment } from "@/contexts/AppContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

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
      toast({ title: "something went wrong", description: "let's try again.", variant: "destructive" });
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
    <div className="min-h-screen bg-shared-bg pt-16 relative shared-space">
      {/* Safety exit */}
      <Link
        to="/safety"
        className="fixed top-20 right-4 z-50 font-body text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
      >
        step away
      </Link>

      <div className="container mx-auto px-6 py-12 lg:py-20 max-w-5xl">
        <AnimatedSection>
          <p className="label-gentle mb-2" style={{ color: "hsl(var(--shared-text) / 0.5)" }}>shared space</p>
          <h1 className="heading-warm text-3xl lg:text-4xl text-shared-text mb-2">
            {setup.partnerA.name} & {setup.partnerB.name}
          </h1>
          <p className="font-body text-muted-foreground leading-relaxed font-light mb-8">
            only approved reflections appear here. read each card and respond in turn.
          </p>
        </AnimatedSection>

        {sharedA.length === 0 && sharedB.length === 0 ? (
          <AnimatedSection>
            <div className="card-warm text-center py-12">
              <p className="text-emotional text-muted-foreground mb-6">
                nothing here yet. when you're ready, this is a safe place to start.
              </p>
              <button onClick={() => navigate(activePartner === "A" ? "/dashboard-a" : "/dashboard-b")} className="btn-warm btn-outline inline-flex items-center gap-3">
                back to your space <ArrowRight size={16} />
              </button>
            </div>
          </AnimatedSection>
        ) : (
          <div className="space-y-8">
            {/* Side by side cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Partner A column */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-partner-a-accent" />
                  <span className="label-gentle" style={{ color: "hsl(var(--partner-a-accent))" }}>{setup.partnerA.name}'s reflections</span>
                </div>
                <div className="space-y-3">
                  {sharedA.map((card) => (
                    <div key={card.key} className="card-partner-a p-6">
                      <span className="label-gentle mb-2 block" style={{ color: "hsl(var(--partner-a-accent))" }}>{card.label}</span>
                      <p className="text-emotional text-base" style={{ color: "hsl(var(--partner-a-dark) / 0.7)" }}>{card.text}</p>
                    </div>
                  ))}
                  {sharedA.length === 0 && (
                    <div className="card-warm text-center">
                      <p className="font-body text-muted-foreground text-sm font-light italic">no cards shared yet</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Partner B column */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-partner-b-accent" />
                  <span className="label-gentle" style={{ color: "hsl(var(--partner-b-accent))" }}>{setup.partnerB.name}'s reflections</span>
                </div>
                <div className="space-y-3">
                  {sharedB.map((card) => (
                    <div key={card.key} className="card-partner-b p-6">
                      <span className="label-gentle mb-2 block" style={{ color: "hsl(var(--partner-b-accent))" }}>{card.label}</span>
                      <p className="text-emotional text-base" style={{ color: "hsl(var(--partner-b-dark) / 0.7)" }}>{card.text}</p>
                    </div>
                  ))}
                  {sharedB.length === 0 && (
                    <div className="card-warm text-center">
                      <p className="font-body text-muted-foreground text-sm font-light italic">no cards shared yet</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Guided Conversation */}
            <AnimatedSection>
              <span className="label-gentle mb-4 block" style={{ color: "hsl(var(--shared-text) / 0.5)" }}>guided conversation</span>
              <div className="space-y-6">
                {pairedCategories.map((key) => {
                  const label = key.replace(/_/g, " ");
                  return (
                    <div key={key} className="card-warm">
                      <span className="label-gentle mb-4 block" style={{ color: "hsl(var(--shared-text) / 0.5)" }}>{label}</span>

                      {/* Ack chips */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {acknowledgements.map((a) => (
                          <button
                            key={a.label}
                            onClick={() => setAcks((prev) => ({ ...prev, [key]: a.label }))}
                            className={`font-body text-xs font-semibold px-4 py-2 flex items-center gap-2 transition-all duration-300 ${
                              acks[key] === a.label
                                ? "text-shared-text shadow-subtle"
                                : "text-muted-foreground hover:text-shared-text"
                            }`}
                            style={{
                              borderRadius: "var(--radius-chip)",
                              background: acks[key] === a.label ? "hsl(var(--shared-bg))" : "transparent",
                              border: `1px solid ${acks[key] === a.label ? "hsl(var(--partner-a-accent) / 0.4)" : "hsl(var(--border) / 0.2)"}`,
                            }}
                          >
                            <a.icon size={12} /> {a.label}
                          </button>
                        ))}
                      </div>

                      {/* Partner A response */}
                      <div className="pl-4 mb-4" style={{ borderLeft: "3px solid hsl(var(--partner-a-accent) / 0.4)", borderRadius: "0 0 0 4px" }}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-partner-a-accent" />
                          <span className="font-body text-xs font-semibold" style={{ color: "hsl(var(--partner-a-accent))" }}>{setup.partnerA.name}</span>
                        </div>
                        {!submittedA[key] ? (
                          <div className="space-y-2">
                            <textarea
                              value={responseA[key] || ""}
                              onChange={(e) => setResponseA((p) => ({ ...p, [key]: e.target.value }))}
                              placeholder="share your perspective..."
                              className="textarea-journal w-full min-h-[60px] text-base"
                            />
                            <button
                              onClick={() => setSubmittedA((p) => ({ ...p, [key]: true }))}
                              disabled={!responseA[key]?.trim()}
                              className="btn-warm text-xs disabled:opacity-30"
                              style={{ background: "hsl(var(--partner-a-primary))", color: "hsl(var(--partner-a-dark))", borderRadius: "var(--radius-button)" }}
                            >
                              send this
                            </button>
                          </div>
                        ) : (
                          <p className="text-emotional text-sm" style={{ color: "hsl(var(--partner-a-dark) / 0.6)" }}>{responseA[key]}</p>
                        )}
                      </div>

                      {/* Partner B response — revealed after A */}
                      <AnimatePresence>
                        {submittedA[key] && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            transition={{ duration: 0.35 }}
                            className="pl-4"
                            style={{ borderLeft: "3px solid hsl(var(--partner-b-accent) / 0.4)", borderRadius: "0 0 0 4px" }}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-partner-b-accent" />
                              <span className="font-body text-xs font-semibold" style={{ color: "hsl(var(--partner-b-accent))" }}>{setup.partnerB.name}</span>
                            </div>
                            {!submittedB[key] ? (
                              <div className="space-y-2">
                                <textarea
                                  value={responseB[key] || ""}
                                  onChange={(e) => setResponseB((p) => ({ ...p, [key]: e.target.value }))}
                                  placeholder="share your perspective..."
                                  className="textarea-journal w-full min-h-[60px] text-base"
                                />
                                <button
                                  onClick={() => setSubmittedB((p) => ({ ...p, [key]: true }))}
                                  disabled={!responseB[key]?.trim()}
                                  className="btn-warm text-xs disabled:opacity-30"
                                  style={{ background: "hsl(var(--partner-b-primary))", color: "hsl(var(--partner-b-dark))", borderRadius: "var(--radius-button)" }}
                                >
                                  send this
                                </button>
                              </div>
                            ) : (
                              <p className="text-emotional text-sm" style={{ color: "hsl(var(--partner-b-dark) / 0.6)" }}>{responseB[key]}</p>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
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
                    className="btn-warm btn-primary inline-flex items-center gap-3"
                    style={{ background: "hsl(var(--partner-a-primary))", color: "hsl(var(--partner-a-dark))" }}
                  >
                    {loadingStep ? (
                      <>
                        <div className="dots-loader"><span /><span /><span /></div>
                        thinking carefully...
                      </>
                    ) : (
                      <>
                        <ArrowRight size={16} /> get our next step
                      </>
                    )}
                  </button>
                </div>
              </AnimatedSection>
            )}

            {nextStep && (
              <AnimatedSection>
                <div className="card-warm text-center py-10" style={{ background: "linear-gradient(135deg, hsl(var(--partner-a-secondary)), hsl(var(--partner-b-secondary)))" }}>
                  <CheckCircle size={28} className="text-shared-text mx-auto mb-4 opacity-50" />
                  <span className="label-gentle mb-3 block" style={{ color: "hsl(var(--shared-text) / 0.5)" }}>your next step</span>
                  <p className="heading-warm text-xl text-shared-text mb-2">{nextStep.next_step}</p>
                  <p className="font-body text-muted-foreground text-sm font-light mb-2">{nextStep.timeframe}</p>
                  {nextStep.why && <p className="font-body text-muted-foreground text-sm font-light italic mb-6">{nextStep.why}</p>}
                  {!committed ? (
                    <button onClick={commitToStep} className="btn-commit max-w-md mx-auto">
                      we commit to this
                    </button>
                  ) : (
                    <motion.p
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="font-body font-semibold text-shared-text"
                    >
                      committed. ✓
                    </motion.p>
                  )}
                </div>
              </AnimatedSection>
            )}

            {/* History */}
            {commitments.length > 0 && (
              <AnimatedSection>
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="font-body text-sm text-muted-foreground flex items-center gap-2 hover:text-foreground transition-colors duration-300"
                >
                  <History size={14} /> view our history ({commitments.length})
                </button>
                <AnimatePresence>
                  {showHistory && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-3 mt-4"
                    >
                      {commitments.map((c, i) => (
                        <div key={i} className="card-warm" style={{ padding: "16px 20px" }}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-body text-xs text-muted-foreground">{c.date}</span>
                            <span className="font-body text-xs text-muted-foreground">{c.timeframe}</span>
                          </div>
                          <p className="font-body text-sm text-shared-text">{c.next_step}</p>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </AnimatedSection>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoupleRoom;
