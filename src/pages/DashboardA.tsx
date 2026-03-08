import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { Sparkles, Lock, ArrowRight, Loader2, LogOut, Settings, Users } from "lucide-react";
import { useAppContext, ReflectionCard } from "@/contexts/AppContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Slider } from "@/components/ui/slider";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const dimensions = ["Connection", "Safety", "Heard", "Trust", "Intimacy"];

const DashboardA = () => {
  const { setup, mode, setMode, activePartner, logout, partnerACards, setPartnerACards, partnerBCards, sharedPaused } = useAppContext();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [entry, setEntry] = useState("");
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState<ReflectionCard[] | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  // Check-in state
  const [values, setValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(dimensions.map((d) => [d, 5]))
  );
  const [appreciation, setAppreciation] = useState("");
  const [history, setHistory] = useState<any[]>(() => {
    const s = localStorage.getItem("mindcast-checkins-a");
    return s ? JSON.parse(s) : [];
  });

  if (!setup || activePartner !== "A") {
    navigate("/");
    return null;
  }

  const partnerLabel = mode === "family" ? "TEEN/PARENT" : "PARTNER B";
  const placeholder = mode === "family"
    ? "Write freely about what happened between you and your teen/parent today..."
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
      toast({ title: "Error", description: e.message || "Failed to organise.", variant: "destructive" });
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
      toast({ title: "Nothing selected", description: "Toggle at least one card to share.", variant: "destructive" });
      return;
    }
    setPartnerACards(shared);
    toast({ title: "Cards shared", description: `${shared.length} card(s) sent to the shared space.` });
  };

  const submitCheckIn = () => {
    const entry = { week: `W${history.length + 1}`, ...values, appreciation };
    const updated = [...history, entry].slice(-4);
    setHistory(updated);
    localStorage.setItem("mindcast-checkins-a", JSON.stringify(updated));
    setAppreciation("");
    setValues(Object.fromEntries(dimensions.map((d) => [d, 5])));
    toast({ title: "Check-in saved" });
  };

  const sharedFromB = partnerBCards.filter((c) => c.shared);
  const canEnterRoom = partnerACards.length > 0 && partnerBCards.length > 0 && !sharedPaused.A;
  const colors = ["#FFFFFF", "#B8C0CC", "#8899AA", "#667788", "#AABBCC"];

  return (
    <div className="min-h-screen pt-16" style={{ backgroundColor: "hsl(215 30% 11%)" }}>
      {/* Header */}
      <div className="border-b-4 border-primary-foreground/10">
        <div className="container mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <span className="heading-label text-[10px] text-silver block mb-1">PRIVATE SPACE</span>
            <h1 className="heading-display text-2xl lg:text-4xl text-primary-foreground">
              YOUR SPACE, {setup.partnerA.name.toUpperCase()}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="heading-label text-[8px] px-3 py-1 border border-silver/30 text-silver">
              {mode === "partnership" ? "PARTNERSHIP" : "FAMILY"}
            </span>
            <button onClick={() => setShowSettings(!showSettings)} className="text-silver hover:text-primary-foreground transition-colors">
              <Settings size={18} />
            </button>
            <button onClick={() => { logout(); navigate("/"); }} className="text-silver hover:text-primary-foreground transition-colors">
              <LogOut size={18} />
            </button>
          </div>
        </div>

        {showSettings && (
          <div className="container mx-auto px-6 pb-6">
            <div className="border-2 border-silver/20 p-4 max-w-sm">
              <span className="heading-label text-[9px] text-silver mb-3 block">MODE</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setMode("partnership")}
                  className={`heading-label text-[9px] px-4 py-2 transition-colors ${mode === "partnership" ? "bg-primary-foreground text-primary" : "border border-silver/30 text-silver"}`}
                >
                  PARTNERSHIP
                </button>
                <button
                  onClick={() => setMode("family")}
                  className={`heading-label text-[9px] px-4 py-2 transition-colors ${mode === "family" ? "bg-primary-foreground text-primary" : "border border-silver/30 text-silver"}`}
                >
                  FAMILY
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="container mx-auto px-6 py-12 max-w-4xl space-y-12">
        {/* PRIVATE JOURNAL */}
        <AnimatedSection>
          <div className="flex items-center gap-3 mb-4">
            <Lock size={16} className="text-silver" />
            <span className="heading-label text-[10px] text-silver">PRIVATE JOURNAL — ONLY YOU CAN SEE THIS</span>
          </div>

          {!cards ? (
            <>
              <div className="card-bordered-white p-0">
                <textarea
                  value={entry}
                  onChange={(e) => setEntry(e.target.value)}
                  placeholder={placeholder}
                  className="w-full bg-transparent text-primary-foreground font-body text-lg leading-relaxed placeholder:text-silver/40 focus:outline-none min-h-[40vh] resize-none p-8"
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
            </>
          ) : (
            <div className="space-y-4">
              {cards.map((card) => (
                <div key={card.key} className="card-bordered-white p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="heading-label text-[10px] text-primary-foreground">{card.label}</span>
                    <button
                      onClick={() => toggleShare(card.key)}
                      className={`heading-label text-[9px] px-4 py-2 transition-colors ${
                        card.shared ? "bg-green-600 text-primary-foreground" : "border border-silver/30 text-silver hover:border-silver"
                      }`}
                    >
                      {card.shared ? "SHARING ✓" : `SHARE WITH ${partnerLabel}`}
                    </button>
                  </div>
                  <p className="font-body text-silver text-sm leading-relaxed">{card.text}</p>
                </div>
              ))}
              <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center">
                <button onClick={() => setCards(null)} className="heading-label text-sm border-[3px] border-primary-foreground/20 text-silver px-8 py-4 hover:border-primary-foreground hover:text-primary-foreground transition-colors">
                  BACK TO WRITING
                </button>
                <button onClick={sendToRoom} className="heading-label text-sm bg-primary-foreground text-primary px-10 py-4 hover:bg-silver transition-colors inline-flex items-center gap-3">
                  SEND TO SHARED SPACE <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}
        </AnimatedSection>

        {/* SHARED FROM PARTNER B */}
        <AnimatedSection>
          <span className="heading-label text-[10px] text-silver mb-4 block">SHARED FROM {setup.partnerB.name.toUpperCase()}</span>
          {sharedFromB.length === 0 ? (
            <div className="border-2 border-silver/10 p-6 text-center">
              <p className="font-body text-silver/50 text-sm">{setup.partnerB.name} hasn't shared any cards yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {sharedFromB.map((card) => (
                <div key={card.key} className="p-6 border-4" style={{ borderColor: "hsl(25 30% 30%)" }}>
                  <span className="heading-label text-[10px] text-silver mb-2 block">{card.label}</span>
                  <p className="font-body text-silver text-sm leading-relaxed">{card.text}</p>
                </div>
              ))}
            </div>
          )}
        </AnimatedSection>

        {/* COUPLE ROOM ENTRY */}
        <AnimatedSection>
          <div className="text-center">
            {canEnterRoom ? (
              <Link
                to="/couple-room"
                className="heading-label text-sm bg-primary-foreground text-primary px-10 py-4 hover:bg-silver transition-colors inline-flex items-center gap-3"
              >
                <Users size={16} /> ENTER SHARED SPACE
              </Link>
            ) : (
              <div className="border-2 border-silver/10 p-6">
                <p className="font-body text-silver/50 text-sm">
                  {sharedPaused.A ? "Shared features are paused." : "Both partners need to share cards to enter the couple room."}
                </p>
              </div>
            )}
          </div>
        </AnimatedSection>

        {/* WEEKLY CHECK-IN */}
        <AnimatedSection>
          <span className="heading-label text-[10px] text-silver mb-4 block">WEEKLY CHECK-IN</span>
          <div className="card-bordered-white p-6 lg:p-8">
            <span className="heading-label text-[10px] text-silver mb-6 block">RATE THIS WEEK (1–10)</span>
            <div className="space-y-6">
              {dimensions.map((dim) => (
                <div key={dim}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="heading-label text-[9px] text-primary-foreground">{dim.toUpperCase()}</span>
                    <span className="heading-display text-lg text-primary-foreground">{values[dim]}</span>
                  </div>
                  <Slider
                    value={[values[dim]]}
                    onValueChange={([v]) => setValues((p) => ({ ...p, [dim]: v }))}
                    min={1} max={10} step={1}
                    className="[&_[role=slider]]:bg-primary-foreground [&_[role=slider]]:border-primary-foreground [&_.bg-primary]:bg-primary-foreground [&_[data-orientation=horizontal]>.relative]:bg-silver/30"
                  />
                </div>
              ))}
            </div>
            <div className="mt-8">
              <span className="heading-label text-[9px] text-silver mb-2 block">ONE THING I APPRECIATE ABOUT US THIS WEEK</span>
              <textarea
                value={appreciation}
                onChange={(e) => setAppreciation(e.target.value)}
                placeholder="Write something you appreciate..."
                className="w-full bg-navy-light text-primary-foreground font-body text-sm p-4 focus:outline-none min-h-[80px] resize-none border border-silver/10"
              />
            </div>
            <button onClick={submitCheckIn} className="heading-label text-sm bg-primary-foreground text-primary px-8 py-3 mt-6 hover:bg-silver transition-colors">
              SUBMIT CHECK-IN
            </button>
          </div>

          {history.length > 0 && (
            <div className="card-bordered-white p-6 lg:p-8 mt-6">
              <span className="heading-label text-[10px] text-silver mb-6 block">TRENDS (LAST 4 WEEKS)</span>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={history}>
                  <XAxis dataKey="week" stroke="#B8C0CC" fontSize={10} />
                  <YAxis domain={[1, 10]} stroke="#B8C0CC" fontSize={10} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(215,50%,11%)", border: "1px solid #B8C0CC", color: "#fff" }} />
                  {dimensions.map((dim, i) => (
                    <Line key={dim} type="monotone" dataKey={dim} stroke={colors[i]} strokeWidth={2} dot={{ r: 3 }} />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </AnimatedSection>

        {/* DISCLAIMER */}
        <div className="border border-silver/10 p-4">
          <p className="font-body text-silver/50 text-xs leading-relaxed">
            <strong className="text-silver/70">Disclaimer:</strong> This AI assistant is not a licensed therapist. It organises your own words — it does not diagnose, advise, or interpret your partner's intent.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardA;
