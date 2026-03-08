import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { CheckCircle, ArrowRight } from "lucide-react";

const tiers = [
  {
    tier: "core",
    price: "free",
    desc: "Essential tools for structured reflection and sharing.",
    features: ["Private journaling", "AI reflection assistant", "Share cards", "Shared space", "Starter modules", "Weekly check-ins"],
  },
  {
    tier: "plus",
    price: "$29/mo",
    desc: "Deeper guidance and personalised insights.",
    features: ["Everything in Core", "Deeper AI guidance", "Personalised recommendations", "Advanced insights", "Guided repair plans"],
    featured: true,
  },
  {
    tier: "professional",
    price: "$79/mo",
    desc: "For couples working with a clinician or coach.",
    features: ["Everything in Plus", "Clinician review", "Premium support", "Priority features"],
  },
];

const Membership = () => {
  return (
    <div className="min-h-screen bg-shared-bg pt-16">
      <div className="container mx-auto px-6 py-12 lg:py-20">
        <AnimatedSection>
          <p className="label-gentle mb-2">membership</p>
          <h1 className="heading-warm text-3xl lg:text-4xl text-shared-text mb-4">choose your practice</h1>
          <p className="font-body text-muted-foreground leading-relaxed font-light mb-12 max-w-2xl">
            start free. upgrade when you're ready for deeper guidance.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tiers.map((t, i) => (
            <AnimatedSection key={t.tier} delay={i * 0.12}>
              <div className={`card-warm p-8 lg:p-10 h-full flex flex-col ${t.featured ? "ring-2 ring-partner-a-accent/40" : ""}`}>
                {t.featured && (
                  <span className="font-body text-xs font-semibold px-3 py-1 rounded-chip self-start mb-4" style={{ background: "hsl(var(--partner-a-primary) / 0.3)", color: "hsl(var(--partner-a-dark))" }}>
                    recommended
                  </span>
                )}
                <h3 className="heading-warm text-2xl text-shared-text mb-1">{t.tier}</h3>
                <p className="font-body font-light text-3xl text-partner-a-accent mb-2">{t.price}</p>
                <p className="font-body text-muted-foreground text-sm font-light mb-6">{t.desc}</p>
                <ul className="space-y-3 flex-1">
                  {t.features.map((f) => (
                    <li key={f} className="font-body text-muted-foreground text-sm font-light flex items-start gap-2">
                      <CheckCircle size={14} className="text-partner-a-accent mt-0.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={`btn-warm mt-8 w-full ${t.featured ? "btn-primary" : "btn-outline"}`}>
                  get started
                </button>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <div className="text-center mt-16">
            <p className="font-body text-muted-foreground text-sm font-light italic">
              all plans include end-to-end privacy, data deletion rights, and safety centre access.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Membership;
