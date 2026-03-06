import { useState } from "react";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowRight, Lock, Sparkles } from "lucide-react";

const prompts = [
  { key: "happened", label: "WHAT HAPPENED?", placeholder: "Describe the situation as factually as you can..." },
  { key: "felt", label: "WHAT DID YOU FEEL?", placeholder: "Name the emotions that came up..." },
  { key: "need", label: "WHAT DO YOU NEED?", placeholder: "What would help right now..." },
  { key: "ask", label: "WHAT DO YOU WANT TO ASK FOR?", placeholder: "What specific request would you make..." },
  { key: "private", label: "WHAT IS NOT READY TO SHARE?", placeholder: "This stays completely private..." },
];

const PrivateJournal = () => {
  const [entries, setEntries] = useState<Record<string, string>>({});
  const [activePrompt, setActivePrompt] = useState(0);
  const [showAI, setShowAI] = useState(false);

  const handleChange = (key: string, value: string) => {
    setEntries((prev) => ({ ...prev, [key]: value }));
  };

  const hasContent = Object.values(entries).some((v) => v.trim().length > 0);

  return (
    <div className="min-h-screen bg-primary pt-16">
      <div className="container mx-auto px-6 py-12 lg:py-20">
        <AnimatedSection>
          <div className="flex items-center gap-3 mb-2">
            <Lock size={16} className="text-silver" />
            <span className="heading-label text-[10px] text-silver">PRIVATE SPACE — ONLY YOU CAN SEE THIS</span>
          </div>
          <h1 className="heading-display text-3xl lg:text-5xl text-primary-foreground mb-8">YOUR JOURNAL</h1>
        </AnimatedSection>

        <div className="grid lg:grid-cols-[1fr,380px] gap-8">
          {/* Main writing area */}
          <div className="space-y-1">
            {/* Prompt tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {prompts.map((p, i) => (
                <button
                  key={p.key}
                  onClick={() => setActivePrompt(i)}
                  className={`heading-label text-[9px] px-4 py-2 transition-colors ${
                    activePrompt === i
                      ? "bg-primary-foreground text-primary"
                      : "border border-silver/30 text-silver hover:border-silver"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <div className="card-bordered-white p-6 lg:p-8">
              <label className="heading-label text-xs text-primary-foreground mb-4 block">
                {prompts[activePrompt].label}
              </label>
              <textarea
                value={entries[prompts[activePrompt].key] || ""}
                onChange={(e) => handleChange(prompts[activePrompt].key, e.target.value)}
                placeholder={prompts[activePrompt].placeholder}
                className="w-full bg-transparent text-primary-foreground font-body text-base leading-relaxed placeholder:text-silver/40 focus:outline-none min-h-[300px] resize-none"
              />
            </div>

            {prompts[activePrompt].key === "private" && (
              <div className="flex items-center gap-2 mt-3 px-1">
                <Lock size={12} className="text-silver/60" />
                <span className="font-body text-silver/60 text-xs">This section will never be shared with your partner.</span>
              </div>
            )}
          </div>

          {/* AI Panel */}
          <div className="space-y-4">
            <div className="border-2 border-silver/20 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={16} className="text-silver" />
                <span className="heading-label text-[10px] text-silver">AI REFLECTION ASSISTANT</span>
              </div>
              {!showAI ? (
                <div>
                  <p className="font-body text-silver text-sm leading-relaxed mb-4">
                    When you're ready, AI will help organise your thoughts into a clear, shareable summary. It will only use what you wrote — nothing is inferred or invented.
                  </p>
                  <button
                    onClick={() => setShowAI(true)}
                    disabled={!hasContent}
                    className={`heading-label text-[10px] px-6 py-3 w-full transition-colors ${
                      hasContent
                        ? "bg-primary-foreground text-primary hover:bg-silver"
                        : "border border-silver/20 text-silver/30 cursor-not-allowed"
                    }`}
                  >
                    ORGANISE MY THOUGHTS
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="border-t border-silver/10 pt-4">
                    <p className="heading-label text-[9px] text-silver/60 mb-2">AI SUMMARY</p>
                    <p className="font-body text-primary-foreground text-sm leading-relaxed">
                      Based on what you wrote, here's a structured reflection:
                    </p>
                    {entries.happened && (
                      <div className="mt-3">
                        <span className="heading-label text-[9px] text-silver">SITUATION</span>
                        <p className="font-body text-silver text-sm mt-1">{entries.happened}</p>
                      </div>
                    )}
                    {entries.felt && (
                      <div className="mt-3">
                        <span className="heading-label text-[9px] text-silver">FEELINGS</span>
                        <p className="font-body text-silver text-sm mt-1">{entries.felt}</p>
                      </div>
                    )}
                    {entries.need && (
                      <div className="mt-3">
                        <span className="heading-label text-[9px] text-silver">NEEDS</span>
                        <p className="font-body text-silver text-sm mt-1">{entries.need}</p>
                      </div>
                    )}
                    {entries.ask && (
                      <div className="mt-3">
                        <span className="heading-label text-[9px] text-silver">REQUEST</span>
                        <p className="font-body text-silver text-sm mt-1">{entries.ask}</p>
                      </div>
                    )}
                  </div>
                  <Link
                    to="/share-card"
                    className="heading-label text-[10px] bg-primary-foreground text-primary px-6 py-3 w-full inline-flex items-center justify-center gap-2 hover:bg-silver transition-colors"
                  >
                    GENERATE SHARE CARD <ArrowRight size={14} />
                  </Link>
                </div>
              )}
            </div>

            <div className="border border-silver/10 p-4">
              <p className="font-body text-silver/50 text-xs leading-relaxed">
                <strong className="text-silver/70">Disclaimer:</strong> This AI assistant is not a licensed therapist. It organises your own words — it does not diagnose, advise, or interpret your partner's intent.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivateJournal;
