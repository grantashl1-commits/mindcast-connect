import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { CheckCircle, ArrowRight } from "lucide-react";

const tiers = [
  {
    tier: "CORE",
    price: "FREE",
    desc: "Essential tools for structured reflection and sharing.",
    features: ["Private journaling", "AI reflection assistant", "Share cards", "Shared couple room", "Starter modules", "Weekly check-ins"],
  },
  {
    tier: "PLUS",
    price: "$29/MO",
    desc: "Deeper guidance and personalised insights.",
    features: ["Everything in Core", "Deeper AI guidance", "Personalised module recommendations", "Advanced progress insights", "Guided repair plans"],
    featured: true,
  },
  {
    tier: "PROFESSIONAL",
    price: "$79/MO",
    desc: "For couples working with a clinician or coach.",
    features: ["Everything in Plus", "Clinician / coach review placeholder", "Premium support", "Priority features & future add-ons"],
  },
];

const Membership = () => {
  return (
    <div className="min-h-screen bg-primary pt-16">
      <div className="container mx-auto px-6 py-12 lg:py-20">
        <AnimatedSection>
          <p className="heading-label text-[10px] text-silver mb-2">MEMBERSHIP</p>
          <h1 className="heading-display text-3xl lg:text-5xl text-primary-foreground mb-4">CHOOSE YOUR PRACTICE</h1>
          <p className="font-body text-silver leading-relaxed mb-12 max-w-2xl">
            Start free. Upgrade when you're ready for deeper AI guidance and structured repair plans.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tiers.map((t, i) => (
            <AnimatedSection key={t.tier} delay={i * 0.12}>
              <div className={`p-8 lg:p-10 h-full flex flex-col ${t.featured ? "card-bordered-white bg-navy-light" : "border-2 border-silver/20"}`}>
                {t.featured && <span className="heading-label text-[9px] text-primary-foreground bg-silver/20 self-start px-3 py-1 mb-4">RECOMMENDED</span>}
                <h3 className="heading-display text-2xl text-primary-foreground mb-1">{t.tier}</h3>
                <p className="heading-display text-4xl text-silver mb-2">{t.price}</p>
                <p className="font-body text-silver text-sm mb-6">{t.desc}</p>
                <ul className="space-y-3 flex-1">
                  {t.features.map((f) => (
                    <li key={f} className="font-body text-silver text-sm flex items-start gap-2">
                      <CheckCircle size={14} className="text-silver mt-0.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={`heading-label text-sm mt-8 px-6 py-3 transition-colors w-full ${
                  t.featured
                    ? "bg-primary-foreground text-primary hover:bg-silver"
                    : "border-2 border-silver/40 text-silver hover:bg-silver/10"
                }`}>
                  GET STARTED
                </button>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <div className="text-center mt-16">
            <p className="font-body text-silver text-sm">All plans include end-to-end privacy, data deletion rights, and safety centre access.</p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Membership;
