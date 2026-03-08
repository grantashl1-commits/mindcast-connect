import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { Sparkles, Lock, ArrowRight, Loader2, LogOut, Settings, Users } from "lucide-react";
import { useAppContext, ReflectionCard } from "@/contexts/AppContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Slider } from "@/components/ui/slider";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const dimensions = ["Connection", "Safety", "Heard", "Trust", "Intimacy"];

const DashboardB = () => {
  const { setup, mode, setMode, activePartner, logout, partnerBCards, setPartnerBCards, partnerACards, sharedPaused } = useAppContext();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [entry, setEntry] = useState("");
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState<ReflectionCard[] | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  const [values, setValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(dimensions.map((d) => [d, 5]))
  );
  const [appreciation, setAppreciation] = useState("");
  const [history, setHistory] = useState<any[]>(() => {
    const s = localStorage.getItem("mindcast-checkins-b");
    return s ? JSON.parse(s) : [];
  });

  if (!setup || activePartner !== "B") {
    navigate("/");
    return null;
  }

  const partnerLabel = mode === "family" ? "parent/teen" : setup.partnerA.name;
  const placeholder = mode === "family"
    ? "write freely about what happened between you and your parent/teen today..."
    : "write freely. this is your private space.";

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
        { key: "what_happened", label: "what happened", text: data.what_happened, shared: false },
        { key: "how_i_felt", label: "how I felt", text: data.how_i_felt, shared: false },
        { key: "what_i_need", label: "what I need", text: data.what_i_need, shared: false },
        { key: "what_i_want_to_say", label: "what I want to say", text: data.what_i_want_to_say, shared: false },
      ]);
    } catch (e: any) {
      toast({ title: "something went wrong", description: "let's try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const toggleShare = (key: string) => {
    setCards((prev) => prev!.map((c) => (c.key === key ? { ...c, shared: !c.shared } : c)));
  };

  const sendToRoom = () => {
    const shared = cards!.filter((c) => c.shared);
    if (shared.length === 0) {
      toast({ title: "nothing selected", description: "Toggle at least one card to share.", variant: "destructive" });
      return;
    }
    setPartnerBCards(shared);
    toast({ title: "cards shared", description: `${shared.length} card(s) sent to the shared space.` });
  };

  const submitCheckIn = () => {
    const e = { week: `W${history.length + 1}`, ...values, appreciation };
    const updated = [...history, e].slice(-4);
    setHistory(updated);
    localStorage.setItem("mindcast-checkins-b", JSON.stringify(updated));
    setAppreciation("");
    setValues(Object.fromEntries(dimensions.map((d) => [d, 5])));
    toast({ title: "check-in saved" });
  };

  const sharedFromA = partnerACards.filter((c) => c.shared);
  const canEnterRoom = partnerACards.length > 0 && partnerBCards.length > 0 && !sharedPaused.B;
  const chartColors = ["#B09CC8", "#D4C5E2", "#8A74AA", "#7A6699", "#C4B3D6"];

  return (
    <div className="min-h-screen pt-16 bg-partner-b-secondary relative">
      <div className="wash-b" />

      {/* Header */}
      <div className="border-b border-partner-b-accent/15">
        <div className="container mx-auto px-6 py-8 flex items-center justify-between relative z-10">
          <div>
            <p className="label-gentle mb-2" style={{ color: "hsl(var(--partner-b-accent))" }}>private space</p>
            <h1 className="heading-warm text-2xl lg:text-4xl" style={{ color: "hsl(var(--partner-b-dark))" }}>
              good evening, {setup.partnerB.name}.
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-body text-xs font-semibold px-3 py-1 rounded-chip" style={{ background: "hsl(var(--partner-b-primary) / 0.3)", color: "hsl(var(--partner-b-dark))" }}>
              {mode === "partnership" ? "partnership" : "family"}
            </span>
            <button onClick={() => setShowSettings(!showSettings)} className="text-muted-foreground hover:text-foreground transition-colors duration-300">
              <Settings size={18} />
            </button>
            <button onClick={() => { logout(); navigate("/"); }} className="text-muted-foreground hover:text-foreground transition-colors duration-300">
              <LogOut size={18} />
            </button>
          </div>
        </div>

        {showSettings && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="container mx-auto px-6 pb-6">
            <div className="card-warm max-w-sm">
              <span className="label-gentle mb-3 block" style={{ color: "hsl(var(--partner-b-accent))" }}>mode</span>
              <div className="flex gap-2">
                <button onClick={() => setMode("partnership")} className={`btn-warm text-xs ${mode === "partnership" ? "" : "btn-outline"}`} style={mode === "partnership" ? { background: "hsl(var(--partner-b-primary))", color: "hsl(var(--partner-b-dark))", borderRadius: "var(--radius-button)" } : {}}>
                  partnership
                </button>
                <button onClick={() => setMode("family")} className={`btn-warm text-xs ${mode === "family" ? "" : "btn-outline"}`} style={mode === "family" ? { background: "hsl(var(--partner-b-primary))", color: "hsl(var(--partner-b-dark))", borderRadius: "var(--radius-button)" } : {}}>
                  family
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="container mx-auto px-6 py-12 max-w-4xl space-y-12 relative z-10">
        {/* PRIVATE JOURNAL */}
        <AnimatedSection>
          <div className="flex items-center gap-3 mb-4">
            <Lock size={16} className="text-partner-b-accent" />
            <span className="label-gentle" style={{ color: "hsl(var(--partner-b-accent))" }}>private journal — only you can see this</span>
          </div>

          {!cards ? (
            <>
              <textarea
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                placeholder={placeholder}
                className="textarea-journal w-full min-h-[40vh]"
              />
              <div className="mt-6 flex justify-center">
                <button
                  onClick={organise}
                  disabled={!entry.trim() || loading}
                  className={`btn-warm flex items-center gap-3 ${
                    entry.trim() && !loading ? "" : "btn-outline opacity-30 cursor-not-allowed"
                  }`}
                  style={entry.trim() && !loading ? { background: "hsl(var(--partner-b-primary))", color: "hsl(var(--partner-b-dark))", borderRadius: "var(--radius-button)" } : {}}
                >
                  {loading ? (
                    <>
                      <div className="dots-loader"><span /><span /><span /></div>
                      finding the right words...
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} /> organise with ai
                    </>
                  )}
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              {cards.map((card) => (
                <motion.div 
                  key={card.key} 
                  className="card-warm"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="label-gentle" style={{ color: "hsl(var(--partner-b-accent))" }}>{card.label}</span>
                    <button
                      onClick={() => toggleShare(card.key)}
                      className={`btn-warm text-xs py-2 px-4 ${card.shared ? "" : "btn-outline"}`}
                      style={card.shared ? { background: "hsl(150 40% 45%)", color: "white", borderRadius: "var(--radius-button)" } : {}}
                    >
                      {card.shared ? "sharing ✓" : `share with ${partnerLabel}`}
                    </button>
                  </div>
                  <p className="text-emotional text-base" style={{ color: "hsl(var(--partner-b-dark) / 0.7)" }}>{card.text}</p>
                </motion.div>
              ))}
              <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center">
                <button onClick={() => setCards(null)} className="btn-warm btn-outline">
                  back to writing
                </button>
                <button onClick={sendToRoom} className="btn-warm inline-flex items-center gap-3" style={{ background: "hsl(var(--partner-b-primary))", color: "hsl(var(--partner-b-dark))", borderRadius: "var(--radius-button)" }}>
                  send to shared space <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}
        </AnimatedSection>

        {/* SHARED FROM PARTNER A */}
        <AnimatedSection>
          <span className="label-gentle mb-4 block" style={{ color: "hsl(var(--partner-a-accent))" }}>shared from {setup.partnerA.name}</span>
          {sharedFromA.length === 0 ? (
            <div className="card-warm text-center" style={{ borderColor: "hsl(var(--partner-a-accent) / 0.2)" }}>
              <p className="text-emotional text-base text-muted-foreground">
                {setup.partnerA.name} hasn't shared anything yet. sometimes silence is okay.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {sharedFromA.map((card) => (
                <div key={card.key} className="card-partner-a p-6">
                  <span className="label-gentle mb-2 block" style={{ color: "hsl(var(--partner-a-accent))" }}>{card.label}</span>
                  <p className="text-emotional text-base" style={{ color: "hsl(var(--partner-a-dark) / 0.7)" }}>{card.text}</p>
                </div>
              ))}
            </div>
          )}
        </AnimatedSection>

        {/* COUPLE ROOM ENTRY */}
        <AnimatedSection>
          <div className="text-center">
            {canEnterRoom ? (
              <Link to="/couple-room" className="btn-warm inline-flex items-center gap-3" style={{ background: "hsl(var(--partner-b-primary))", color: "hsl(var(--partner-b-dark))", borderRadius: "var(--radius-button)" }}>
                <Users size={16} /> open shared space
              </Link>
            ) : (
              <div className="card-warm text-center">
                <p className="text-emotional text-base text-muted-foreground">
                  {sharedPaused.B ? "shared features are paused. take your time." : "both of you need to share cards to enter the shared space. there's no rush."}
                </p>
              </div>
            )}
          </div>
        </AnimatedSection>

        {/* WEEKLY CHECK-IN */}
        <AnimatedSection>
          <span className="label-gentle mb-4 block" style={{ color: "hsl(var(--partner-b-accent))" }}>weekly check-in</span>
          <div className="card-warm">
            <span className="label-gentle mb-6 block" style={{ color: "hsl(var(--partner-b-accent))" }}>rate this week (1–10)</span>
            <div className="space-y-6">
              {dimensions.map((dim) => (
                <div key={dim}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-body font-semibold text-xs tracking-wide" style={{ color: "hsl(var(--partner-b-dark))" }}>{dim.toLowerCase()}</span>
                    <span className="font-body font-light text-2xl" style={{ color: "hsl(var(--partner-b-accent))" }}>{values[dim]}</span>
                  </div>
                  <Slider
                    value={[values[dim]]}
                    onValueChange={([v]) => setValues((p) => ({ ...p, [dim]: v }))}
                    min={1} max={10} step={1}
                    className="[&_[role=slider]]:bg-partner-b-accent [&_[role=slider]]:border-partner-b-accent [&_[role=slider]]:rounded-full [&_.bg-primary]:bg-partner-b-accent [&_[data-orientation=horizontal]>.relative]:bg-partner-b-accent/20"
                  />
                </div>
              ))}
            </div>
            <div className="mt-8">
              <span className="label-gentle mb-2 block" style={{ color: "hsl(var(--partner-b-accent))" }}>one thing I appreciate about us this week</span>
              <textarea
                value={appreciation}
                onChange={(e) => setAppreciation(e.target.value)}
                placeholder="write something you appreciate..."
                className="textarea-journal w-full min-h-[80px] text-base"
              />
            </div>
            <button onClick={submitCheckIn} className="btn-warm mt-6" style={{ background: "hsl(var(--partner-b-primary))", color: "hsl(var(--partner-b-dark))", borderRadius: "var(--radius-button)" }}>
              send this
            </button>
          </div>

          {history.length > 0 && (
            <div className="card-warm mt-6">
              <span className="label-gentle mb-6 block" style={{ color: "hsl(var(--partner-b-accent))" }}>trends (last 4 weeks)</span>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={history}>
                  <XAxis dataKey="week" stroke="hsl(268,25%,70%)" fontSize={11} fontFamily="Nunito" />
                  <YAxis domain={[1, 10]} stroke="hsl(268,25%,70%)" fontSize={11} fontFamily="Nunito" />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(30,30%,96%)", border: "1px solid hsl(268,25%,70%,0.3)", borderRadius: "12px", fontFamily: "Nunito", color: "hsl(276,28%,23%)" }} />
                  {dimensions.map((dim, i) => (
                    <Line key={dim} type="monotone" dataKey={dim} stroke={chartColors[i]} strokeWidth={2} dot={{ r: 3, fill: chartColors[i] }} />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </AnimatedSection>

        {/* DISCLAIMER */}
        <div className="card-warm" style={{ borderColor: "hsl(var(--partner-b-accent) / 0.15)" }}>
          <p className="font-body text-muted-foreground text-xs leading-relaxed font-light italic">
            This AI assistant is not a licensed therapist. It organises your own words — it does not diagnose, advise, or interpret your partner's intent. If you feel unsafe, please visit the safety centre.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardB;
