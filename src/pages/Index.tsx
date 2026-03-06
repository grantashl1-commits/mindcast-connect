import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowRight, Shield, Eye, Lock, MessageSquare, CheckCircle, Users } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="section-navy min-h-screen flex items-center pt-16">
        <div className="container mx-auto px-6 py-20 lg:py-32">
          <AnimatedSection>
            <p className="heading-label text-silver mb-6">MINDCAST RELATIONSHIPS</p>
            <h1 className="heading-display text-5xl sm:text-7xl lg:text-[6rem] xl:text-[7.5rem] text-primary-foreground max-w-5xl leading-[0.9]">
              PRIVATE THOUGHTS.<br />
              STRUCTURED REPAIR.
            </h1>
            <p className="font-body text-silver text-lg lg:text-xl max-w-2xl mt-8 leading-relaxed">
              A consent-first relationship platform that helps couples reflect privately, share intentionally, and work toward better conversations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <Link
                to="/journal"
                className="heading-label text-sm bg-primary-foreground text-primary px-8 py-4 hover:bg-silver transition-colors inline-flex items-center gap-3"
              >
                START PRIVATE <ArrowRight size={16} />
              </Link>
              <a
                href="#how-it-works"
                className="heading-label text-sm border-[3px] border-silver text-silver px-8 py-4 hover:bg-silver/10 transition-colors inline-flex items-center gap-3"
              >
                SEE HOW IT WORKS
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* POSITIONING STRIP */}
      <section className="section-white border-y-4 border-primary">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-wrap justify-center gap-6 lg:gap-16">
            {["NOT THERAPY", "NOT GROUP CHAT", "NOT FORCED SHARING", "A STRUCTURED RELATIONSHIP PRACTICE"].map(
              (text, i) => (
                <AnimatedSection key={text} delay={i * 0.1}>
                  <span className={`heading-label text-xs lg:text-sm ${i === 3 ? "text-foreground font-black" : "text-muted-foreground"}`}>
                    {text}
                  </span>
                </AnimatedSection>
              )
            )}
          </div>
        </div>
      </section>

      {/* FRAMEWORK: NOTICE / NAME / REWIRE */}
      <section className="section-navy py-24 lg:py-32">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <p className="heading-label text-silver text-center mb-4">THE FRAMEWORK</p>
            <h2 className="heading-display text-4xl lg:text-6xl text-primary-foreground text-center mb-16">
              NOTICE. NAME. REWIRE.
            </h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "NOTICE", desc: "Privately reflect on what happened and how it landed.", icon: Eye },
              { title: "NAME", desc: "Clarify the feeling, need, request, and boundary.", icon: MessageSquare },
              { title: "REWIRE", desc: "Work together on one concrete behaviour change or repair action.", icon: CheckCircle },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.15}>
                <div className="card-bordered-white p-8 lg:p-10 h-full hover:bg-navy-light transition-colors group">
                  <item.icon className="text-silver mb-6 group-hover:text-primary-foreground transition-colors" size={32} />
                  <h3 className="heading-display text-2xl lg:text-3xl text-primary-foreground mb-4">{item.title}</h3>
                  <p className="font-body text-silver leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="section-white py-24 lg:py-32">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <p className="heading-label text-muted-foreground text-center mb-4">PROCESS</p>
            <h2 className="heading-display text-4xl lg:text-6xl text-foreground text-center mb-16">
              HOW IT WORKS
            </h2>
          </AnimatedSection>
          <div className="max-w-3xl mx-auto space-y-0">
            {[
              { step: "01", title: "WRITE PRIVATELY", desc: "Reflect on what happened and what you felt in your private, encrypted space." },
              { step: "02", title: "AI HELPS ORGANISE", desc: "Your AI assistant structures your thoughts into clear categories — no guessing." },
              { step: "03", title: "APPROVE WHAT IS SHARED", desc: "Toggle what your partner sees. Nothing is shared until you explicitly approve." },
              { step: "04", title: "ENTER SHARED CONVERSATION", desc: "Your approved reflections appear in a guided couple space for structured dialogue." },
              { step: "05", title: "COMMIT TO ONE NEXT STEP", desc: "End every session with a mutual agreement — one clear, practical action." },
            ].map((item, i) => (
              <AnimatedSection key={item.step} delay={i * 0.1}>
                <div className="flex gap-6 lg:gap-10 py-8 border-b-2 border-primary/10 last:border-0">
                  <span className="heading-display text-5xl lg:text-7xl text-silver/40 flex-shrink-0 w-20 lg:w-28">{item.step}</span>
                  <div>
                    <h3 className="heading-display text-xl lg:text-2xl text-foreground mb-2">{item.title}</h3>
                    <p className="font-body text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT PREVIEW CARDS */}
      <section className="section-navy py-24 lg:py-32">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <p className="heading-label text-silver text-center mb-4">INSIDE THE PLATFORM</p>
            <h2 className="heading-display text-4xl lg:text-6xl text-primary-foreground text-center mb-16">
              BUILT FOR REAL WORK
            </h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "PRIVATE JOURNAL", desc: "Your thoughts, your space. Write freely and let AI help you organise.", icon: Lock },
              { title: "SHARE APPROVAL", desc: "Edit, toggle, and approve exactly what your partner sees.", icon: Eye },
              { title: "COUPLE ROOM", desc: "A shared space where approved reflections meet structured dialogue.", icon: Users },
              { title: "GUIDED REPAIR", desc: "One topic, strict turn-taking, AI-facilitated resolution.", icon: MessageSquare },
              { title: "WEEKLY CHECK-IN", desc: "Track emotional trends, themes, and relationship practice streaks.", icon: CheckCircle },
              { title: "MODULE LIBRARY", desc: "Structured programs for communication, trust, conflict, and connection.", icon: Shield },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.08}>
                <div className="card-bordered-white p-8 h-full hover:bg-navy-light transition-colors duration-300 group cursor-pointer">
                  <item.icon className="text-silver mb-4 group-hover:text-primary-foreground transition-colors" size={24} />
                  <h3 className="heading-label text-sm text-primary-foreground mb-3">{item.title}</h3>
                  <p className="font-body text-silver text-sm leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* MODULES PREVIEW */}
      <section className="section-white py-24 lg:py-32">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <p className="heading-label text-muted-foreground text-center mb-4">STRUCTURED PROGRAMS</p>
            <h2 className="heading-display text-4xl lg:text-6xl text-foreground text-center mb-16">MODULES</h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: "COMMUNICATION RESET", tag: "START HERE" },
              { title: "CONFLICT REPAIR", tag: null },
              { title: "TRUST REBUILD", tag: null },
              { title: "EMOTIONAL SAFETY", tag: null },
              { title: "INTIMACY & CONNECTION", tag: null },
              { title: "FUTURE ALIGNMENT", tag: null },
            ].map((m, i) => (
              <AnimatedSection key={m.title} delay={i * 0.08}>
                <div className="card-bordered p-8 hover:bg-muted transition-colors group cursor-pointer relative">
                  {m.tag && (
                    <span className="heading-label text-[9px] bg-primary text-primary-foreground px-3 py-1 absolute top-4 right-4">
                      {m.tag}
                    </span>
                  )}
                  <h3 className="heading-display text-lg text-foreground mb-3">{m.title}</h3>
                  <p className="font-body text-muted-foreground text-sm">Lesson · Reflection · Partner Activity · Debrief</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection>
            <div className="text-center mt-12">
              <Link to="/modules" className="heading-label text-sm border-[3px] border-primary text-foreground px-8 py-4 hover:bg-primary hover:text-primary-foreground transition-colors inline-flex items-center gap-3">
                EXPLORE ALL MODULES <ArrowRight size={16} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* MEMBERSHIP */}
      <section className="section-navy py-24 lg:py-32">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <p className="heading-label text-silver text-center mb-4">MEMBERSHIP</p>
            <h2 className="heading-display text-4xl lg:text-6xl text-primary-foreground text-center mb-16">
              CHOOSE YOUR PRACTICE
            </h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                tier: "CORE",
                price: "FREE",
                features: ["Private journaling", "AI reflection", "Share cards", "Shared couple room", "Starter modules", "Weekly check-ins"],
              },
              {
                tier: "PLUS",
                price: "$29/MO",
                features: ["Everything in Core", "Deeper AI guidance", "Personalised module recs", "Advanced progress insights", "Guided repair plans"],
                featured: true,
              },
              {
                tier: "PROFESSIONAL",
                price: "$79/MO",
                features: ["Everything in Plus", "Clinician review placeholder", "Premium support", "Priority features"],
              },
            ].map((t, i) => (
              <AnimatedSection key={t.tier} delay={i * 0.12}>
                <div className={`p-8 lg:p-10 h-full flex flex-col ${t.featured ? "card-bordered-white bg-navy-light" : "border-2 border-silver/20"}`}>
                  {t.featured && <span className="heading-label text-[9px] text-primary-foreground bg-silver/20 self-start px-3 py-1 mb-4">RECOMMENDED</span>}
                  <h3 className="heading-display text-2xl text-primary-foreground mb-2">{t.tier}</h3>
                  <p className="heading-display text-4xl text-silver mb-6">{t.price}</p>
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
        </div>
      </section>

      {/* SAFETY BANNER */}
      <section className="section-white py-24 lg:py-32 border-t-4 border-primary">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="flex items-start gap-6 max-w-3xl mx-auto">
              <Shield className="text-destructive flex-shrink-0 mt-1" size={32} />
              <div>
                <h2 className="heading-display text-2xl lg:text-3xl text-foreground mb-4">YOUR SAFETY MATTERS</h2>
                <p className="font-body text-muted-foreground leading-relaxed mb-6">
                  If you feel unsafe, do not use shared features right now. This platform does not replace emergency or professional support. You can pause any session, exit shared spaces, and access crisis resources at any time.
                </p>
                <Link
                  to="/safety"
                  className="heading-label text-sm border-[3px] border-destructive text-destructive px-8 py-4 hover:bg-destructive hover:text-destructive-foreground transition-colors inline-flex items-center gap-3"
                >
                  SAFETY CENTRE <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section-navy py-24 lg:py-32">
        <div className="container mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="heading-display text-4xl sm:text-5xl lg:text-7xl text-primary-foreground max-w-4xl mx-auto leading-[0.95] mb-8">
              BUILD BETTER CONVERSATIONS UNDER PRESSURE.
            </h2>
            <Link
              to="/journal"
              className="heading-label text-sm bg-primary-foreground text-primary px-10 py-5 hover:bg-silver transition-colors inline-flex items-center gap-3"
            >
              JOIN MINDCAST RELATIONSHIPS <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-primary border-t border-silver/10 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="font-heading font-black text-primary-foreground tracking-[0.15em] text-sm">
              MINDCAST<span className="text-silver font-medium text-xs ml-1">RELATIONSHIPS</span>
            </p>
            <p className="font-body text-silver text-xs">
              Not therapy. Not coaching. A structured relationship practice. © 2026
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
