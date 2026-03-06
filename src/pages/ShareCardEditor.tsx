import { useState } from "react";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowRight, Eye, EyeOff, AlertTriangle, CheckCircle } from "lucide-react";

const sections = [
  { key: "situation", label: "SITUATION", content: "We had a disagreement about how household tasks are divided. It happened last Tuesday after dinner.", shared: true },
  { key: "feelings", label: "FEELINGS", content: "I felt frustrated, unheard, and a bit resentful. Like my effort isn't being noticed.", shared: true },
  { key: "needs", label: "NEEDS", content: "I need acknowledgement for what I do contribute, and a more structured way to divide tasks.", shared: true },
  { key: "request", label: "REQUEST", content: "I'd like us to sit down this weekend and create a shared task list together.", shared: true },
  { key: "private", label: "PRIVATE NOTE", content: "I'm also upset about something from last month but I'm not ready to bring that up yet.", shared: false },
];

const ShareCardEditor = () => {
  const [items, setItems] = useState(sections);
  const [confirmed, setConfirmed] = useState(false);

  const toggle = (key: string) => {
    if (key === "private") return; // always private
    setItems((prev) =>
      prev.map((item) => (item.key === key ? { ...item, shared: !item.shared } : item))
    );
  };

  const sharedCount = items.filter((i) => i.shared).length;

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-6 py-12 lg:py-20 max-w-3xl">
        <AnimatedSection>
          <p className="heading-label text-[10px] text-muted-foreground mb-2">STEP 2 OF 3</p>
          <h1 className="heading-display text-3xl lg:text-5xl text-foreground mb-4">SHARE CARD EDITOR</h1>
          <p className="font-body text-muted-foreground leading-relaxed mb-8">
            Review your AI-organised summary below. Toggle sections on or off to control exactly what your partner sees.
          </p>
        </AnimatedSection>

        <div className="flex items-center gap-3 bg-muted p-4 mb-8 border-l-4 border-foreground">
          <AlertTriangle size={18} className="text-foreground flex-shrink-0" />
          <p className="font-body text-foreground text-sm font-medium">
            Nothing is shared until you press "Confirm & Share." Your partner cannot see this screen.
          </p>
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <AnimatedSection key={item.key}>
              <div className={`card-bordered p-6 transition-all ${item.shared ? "bg-background" : "bg-muted/50 opacity-70"}`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="heading-label text-[10px] text-foreground">{item.label}</span>
                  <button
                    onClick={() => toggle(item.key)}
                    disabled={item.key === "private"}
                    className={`heading-label text-[9px] px-3 py-1 flex items-center gap-2 transition-colors ${
                      item.key === "private"
                        ? "bg-muted text-muted-foreground cursor-not-allowed"
                        : item.shared
                        ? "bg-primary text-primary-foreground"
                        : "border border-foreground/20 text-muted-foreground hover:border-foreground"
                    }`}
                  >
                    {item.shared ? <Eye size={12} /> : <EyeOff size={12} />}
                    {item.key === "private" ? "ALWAYS PRIVATE" : item.shared ? "SHARING" : "PRIVATE"}
                  </button>
                </div>
                <p className="font-body text-foreground/80 text-sm leading-relaxed">{item.content}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <div className="mt-10 space-y-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setConfirmed(!confirmed)}
                className={`w-5 h-5 border-2 border-foreground flex items-center justify-center transition-colors ${
                  confirmed ? "bg-primary" : "bg-transparent"
                }`}
              >
                {confirmed && <CheckCircle size={12} className="text-primary-foreground" />}
              </button>
              <span className="font-body text-foreground text-sm">
                I confirm that I want to share {sharedCount} section{sharedCount !== 1 ? "s" : ""} with my partner
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/journal"
                className="heading-label text-sm border-[3px] border-foreground text-foreground px-8 py-4 hover:bg-muted transition-colors text-center"
              >
                BACK TO JOURNAL
              </Link>
              <Link
                to="/couple-room"
                className={`heading-label text-sm px-8 py-4 text-center inline-flex items-center justify-center gap-3 transition-colors ${
                  confirmed
                    ? "bg-primary text-primary-foreground hover:bg-navy-light"
                    : "bg-muted text-muted-foreground cursor-not-allowed pointer-events-none"
                }`}
              >
                CONFIRM & SHARE <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default ShareCardEditor;
