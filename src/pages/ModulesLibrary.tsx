import AnimatedSection from "@/components/AnimatedSection";
import { BookOpen, CheckCircle, Lock, ArrowRight } from "lucide-react";

const modules = [
  { title: "COMMUNICATION RESET", desc: "Rebuild the fundamentals of how you talk and listen.", tag: "START HERE", progress: 0 },
  { title: "CONFLICT REPAIR", desc: "Learn to move through disagreements without damage.", tag: null, progress: 40 },
  { title: "TRUST REBUILD", desc: "Structured steps to restore broken or shaken trust.", tag: null, progress: 0 },
  { title: "EMOTIONAL SAFETY", desc: "Create conditions where vulnerability feels safe.", tag: null, progress: 0 },
  { title: "INTIMACY & CONNECTION", desc: "Reconnect physically and emotionally with structure.", tag: null, progress: 0 },
  { title: "FUTURE ALIGNMENT", desc: "Get on the same page about where you're headed.", tag: null, progress: 0 },
];

const ModulesLibrary = () => {
  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-6 py-12 lg:py-20">
        <AnimatedSection>
          <p className="heading-label text-[10px] text-muted-foreground mb-2">STRUCTURED PROGRAMS</p>
          <h1 className="heading-display text-3xl lg:text-5xl text-foreground mb-4">MODULES</h1>
          <p className="font-body text-muted-foreground leading-relaxed mb-12 max-w-2xl">
            Each module contains a short lesson, solo reflection, partner activity, debrief, and completion evidence. Work through them at your own pace.
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((m, i) => (
            <AnimatedSection key={m.title} delay={i * 0.08}>
              <div className="card-bordered p-8 hover:bg-muted transition-colors group cursor-pointer relative h-full flex flex-col">
                {m.tag && (
                  <span className="heading-label text-[9px] bg-primary text-primary-foreground px-3 py-1 absolute top-4 right-4">{m.tag}</span>
                )}
                <BookOpen size={24} className="text-muted-foreground mb-4 group-hover:text-foreground transition-colors" />
                <h3 className="heading-display text-lg text-foreground mb-2">{m.title}</h3>
                <p className="font-body text-muted-foreground text-sm mb-6 flex-1">{m.desc}</p>

                {m.progress > 0 ? (
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="heading-label text-[9px] text-muted-foreground">{m.progress}% COMPLETE</span>
                    </div>
                    <div className="h-1 bg-muted">
                      <div className="h-1 bg-primary transition-all" style={{ width: `${m.progress}%` }} />
                    </div>
                  </div>
                ) : (
                  <span className="heading-label text-[9px] text-muted-foreground flex items-center gap-2">
                    {m.tag ? <ArrowRight size={12} /> : <Lock size={12} />}
                    {m.tag ? "BEGIN MODULE" : "NOT STARTED"}
                  </span>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <div className="mt-16 border-t-2 border-primary/10 pt-8">
            <p className="heading-label text-[10px] text-muted-foreground mb-3">EACH MODULE INCLUDES</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {["SHORT LESSON", "SOLO REFLECTION", "PARTNER ACTIVITY", "DEBRIEF", "COMPLETION EVIDENCE"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-primary flex-shrink-0" />
                  <span className="font-body text-foreground text-sm">{item}</span>
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
