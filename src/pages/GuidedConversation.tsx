import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowRight, CheckCircle, Pause } from "lucide-react";

const steps = [
  {
    phase: "REFLECTION",
    prompt: "In your own words, what is the core issue you'd like to address together?",
    turn: "YOU",
  },
  {
    phase: "VALIDATION",
    prompt: "Read your partner's response. In one sentence, reflect back what you heard them say.",
    turn: "PARTNER",
  },
  {
    phase: "NEED",
    prompt: "What is one thing you need from your partner to move forward on this?",
    turn: "YOU",
  },
  {
    phase: "AGREEMENT",
    prompt: "Based on this conversation, what is one practical next step you both agree to?",
    turn: "BOTH",
  },
];

const GuidedConversation = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<string[]>(["", "", "", ""]);
  const [completed, setCompleted] = useState(false);

  const step = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((p) => p + 1);
    } else {
      setCompleted(true);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-6 py-12 lg:py-20 max-w-3xl">
        <AnimatedSection>
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="heading-label text-[10px] text-muted-foreground mb-2">GUIDED SESSION</p>
              <h1 className="heading-display text-3xl lg:text-4xl text-foreground">STRUCTURED REPAIR</h1>
            </div>
            <button className="heading-label text-[9px] border-2 border-destructive text-destructive px-4 py-2 flex items-center gap-2 hover:bg-destructive hover:text-destructive-foreground transition-colors">
              <Pause size={12} /> PAUSE SESSION
            </button>
          </div>
        </AnimatedSection>

        {/* Progress */}
        <div className="flex gap-2 mb-10">
          {steps.map((s, i) => (
            <div
              key={i}
              className={`h-1 flex-1 transition-colors ${
                i <= currentStep ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>

        {!completed ? (
          <AnimatedSection key={currentStep}>
            <div className="card-bordered p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="heading-label text-[9px] bg-primary text-primary-foreground px-3 py-1">{step.phase}</span>
                <span className="heading-label text-[9px] text-muted-foreground">TURN: {step.turn}</span>
              </div>
              <p className="font-heading font-bold text-xl text-foreground mb-6">{step.prompt}</p>
              <textarea
                value={responses[currentStep]}
                onChange={(e) => {
                  const next = [...responses];
                  next[currentStep] = e.target.value;
                  setResponses(next);
                }}
                placeholder="Type your response..."
                className="w-full bg-muted/50 text-foreground font-body text-base leading-relaxed p-4 focus:outline-none focus:ring-2 focus:ring-primary min-h-[150px] resize-none border-2 border-primary/10"
              />
              <div className="flex justify-between mt-6">
                {currentStep > 0 && (
                  <button
                    onClick={() => setCurrentStep((p) => p - 1)}
                    className="heading-label text-[10px] border-2 border-foreground/20 text-muted-foreground px-6 py-3 hover:border-foreground hover:text-foreground transition-colors"
                  >
                    BACK
                  </button>
                )}
                <button
                  onClick={handleNext}
                  disabled={!responses[currentStep].trim()}
                  className={`heading-label text-[10px] px-6 py-3 ml-auto flex items-center gap-2 transition-colors ${
                    responses[currentStep].trim()
                      ? "bg-primary text-primary-foreground hover:bg-navy-light"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  }`}
                >
                  {currentStep === steps.length - 1 ? "COMPLETE" : "NEXT"} <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </AnimatedSection>
        ) : (
          <AnimatedSection>
            <div className="card-bordered p-8 lg:p-10 text-center">
              <CheckCircle size={48} className="text-primary mx-auto mb-6" />
              <h2 className="heading-display text-2xl text-foreground mb-4">SESSION COMPLETE</h2>
              <p className="font-body text-muted-foreground mb-6">You've completed a guided repair session. Here's your mutual agreement:</p>
              <div className="bg-muted p-6 border-l-4 border-primary mb-6">
                <p className="heading-label text-[9px] text-muted-foreground mb-2">NEXT STEP</p>
                <p className="font-body text-foreground font-medium">{responses[3] || "No agreement recorded."}</p>
              </div>
              <p className="font-body text-muted-foreground text-sm">This agreement has been saved to your progress dashboard.</p>
            </div>
          </AnimatedSection>
        )}

        <div className="mt-6 border border-foreground/5 p-4">
          <p className="font-body text-muted-foreground text-xs leading-relaxed">
            <strong>Disclaimer:</strong> This guided session is not therapy. If you feel unsafe or distressed, please pause the session and visit the Safety Centre.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuidedConversation;
