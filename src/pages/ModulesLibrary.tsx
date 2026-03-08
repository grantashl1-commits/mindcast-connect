import AnimatedSection from "@/components/AnimatedSection";
import { BookOpen, CheckCircle, Lock, ArrowRight } from "lucide-react";

const modules = [
  { title: "communication reset", desc: "Rebuild the fundamentals of how you talk and listen.", tag: "start here", progress: 0 },
  { title: "conflict repair", desc: "Learn to move through disagreements without damage.", tag: null, progress: 40 },
  { title: "trust rebuild", desc: "Structured steps to restore broken or shaken trust.", tag: null, progress: 0 },
  { title: "emotional safety", desc: "Create conditions where vulnerability feels safe.", tag: null, progress: 0 },
  { title: "intimacy & connection", desc: "Reconnect physically and emotionally with structure.", tag: null, progress: 0 },
  { title: "future alignment", desc: "Get on the same page about where you're headed.", tag: null, progress: 0 },
];

const ModulesLibrary = () => {
  return (
    <div className="min-h-screen bg-shared-bg pt-16">
      <div className="container mx-auto px-6 py-12 lg:py-20">
        <AnimatedSection>
          <p className="label-gentle mb-2">structured programs</p>
          <h1 className="heading-warm text-3xl lg:text-4xl text-shared-text mb-4">modules</h1>
          <p className="font-body text-muted-foreground leading-relaxed font-light mb-12 max-w-2xl">
            each module contains a short lesson, solo reflection, partner activity, debrief, and completion evidence. work through them at your own pace.
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((m, i) => (
            <AnimatedSection key={m.title} delay={i * 0.08}>
              <div className="card-warm p-7 cursor-pointer relative h-full flex flex-col group">
                {m.tag && (
                  <span className="font-body text-xs font-semibold px-3 py-1 rounded-chip absolute top-4 right-4" style={{ background: "hsl(var(--partner-a-primary) / 0.3)", color: "hsl(var(--partner-a-dark))" }}>
                    {m.tag}
                  </span>
                )}
                <BookOpen size={22} className="text-muted-foreground mb-4 group-hover:text-shared-text transition-colors duration-300" />
                <h3 className="heading-warm text-lg text-shared-text mb-2">{m.title}</h3>
                <p className="font-body text-muted-foreground text-sm font-light mb-6 flex-1">{m.desc}</p>

                {m.progress > 0 ? (
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-body text-xs text-muted-foreground font-light">{m.progress}% complete</span>
                    </div>
                    <div className="h-1 bg-muted rounded-full">
                      <div className="h-1 bg-partner-a-accent rounded-full transition-all" style={{ width: `${m.progress}%` }} />
                    </div>
                  </div>
                ) : (
                  <span className="font-body text-xs text-muted-foreground font-light flex items-center gap-2">
                    {m.tag ? <ArrowRight size={12} /> : <Lock size={12} />}
                    {m.tag ? "begin module" : "not started"}
                  </span>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <div className="mt-16 border-t border-border/10 pt-8">
            <p className="label-gentle mb-3">each module includes</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {["short lesson", "solo reflection", "partner activity", "debrief", "completion evidence"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-partner-a-accent flex-shrink-0" />
                  <span className="font-body text-shared-text text-sm font-light">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default ModulesLibrary;
