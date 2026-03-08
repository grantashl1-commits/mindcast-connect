import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowRight, Shield, Eye, Lock, MessageSquare, CheckCircle, Users } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import { useToast } from "@/hooks/use-toast";

const Landing = () => {
  const { setup, setSetup, setActivePartner } = useAppContext();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showSetup, setShowSetup] = useState(false);

  // Setup form state
  const [nameA, setNameA] = useState("");
  const [pinA, setPinA] = useState("");
  const [nameB, setNameB] = useState("");
  const [pinB, setPinB] = useState("");

  // Login state
  const [loginPinA, setLoginPinA] = useState("");
  const [loginPinB, setLoginPinB] = useState("");

  const handleSetup = () => {
    if (!nameA.trim() || !nameB.trim() || pinA.length !== 4 || pinB.length !== 4) {
      toast({ title: "Incomplete", description: "Enter both names and 4-digit PINs.", variant: "destructive" });
      return;
    }
    setSetup({ partnerA: { name: nameA.trim(), pin: pinA }, partnerB: { name: nameB.trim(), pin: pinB } });
    setShowSetup(false);
    toast({ title: "Partnership created", description: "You can now log in." });
  };

  const loginA = () => {
    if (!setup) return;
    if (loginPinA !== setup.partnerA.pin) {
      toast({ title: "Wrong PIN", description: "Please try again.", variant: "destructive" });
      return;
    }
    setActivePartner("A");
    navigate("/dashboard-a");
  };

  const loginB = () => {
    if (!setup) return;
    if (loginPinB !== setup.partnerB.pin) {
      toast({ title: "Wrong PIN", description: "Please try again.", variant: "destructive" });
      return;
    }
    setActivePartner("B");
    navigate("/dashboard-b");
  };

  return (
    <div className="min-h-screen">
      {/* HERO + LOGIN */}
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
          </AnimatedSection>

          {/* LOGIN CARDS */}
          {setup ? (
            <AnimatedSection delay={0.2}>
              <div className="grid md:grid-cols-2 gap-6 mt-12 max-w-3xl">
                {/* Partner A login */}
                <div className="p-8 border-4 border-primary-foreground/30" style={{ backgroundColor: "hsl(215 30% 16%)" }}>
                  <span className="heading-label text-[10px] text-silver mb-4 block">PARTNER A</span>
                  <p className="heading-display text-2xl text-primary-foreground mb-6">{setup.partnerA.name}</p>
                  <input
                    type="password"
                    maxLength={4}
                    value={loginPinA}
                    onChange={(e) => setLoginPinA(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    placeholder="4-digit PIN"
                    className="w-full bg-transparent border-2 border-silver/30 text-primary-foreground font-body text-center text-xl tracking-[0.5em] p-3 mb-4 focus:outline-none focus:border-primary-foreground"
                  />
                  <button
                    onClick={loginA}
                    className="heading-label text-[10px] bg-primary-foreground text-primary px-6 py-3 w-full hover:bg-silver transition-colors"
                  >
                    ENTER YOUR SPACE
                  </button>
                </div>

                {/* Partner B login */}
                <div className="p-8 border-4 border-primary-foreground/30" style={{ backgroundColor: "hsl(25 30% 14%)" }}>
                  <span className="heading-label text-[10px] text-silver mb-4 block">PARTNER B</span>
                  <p className="heading-display text-2xl text-primary-foreground mb-6">{setup.partnerB.name}</p>
                  <input
                    type="password"
                    maxLength={4}
                    value={loginPinB}
                    onChange={(e) => setLoginPinB(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    placeholder="4-digit PIN"
                    className="w-full bg-transparent border-2 border-silver/30 text-primary-foreground font-body text-center text-xl tracking-[0.5em] p-3 mb-4 focus:outline-none focus:border-primary-foreground"
                  />
                  <button
                    onClick={loginB}
                    className="heading-label text-[10px] bg-primary-foreground text-primary px-6 py-3 w-full hover:bg-silver transition-colors"
                  >
                    ENTER YOUR SPACE
                  </button>
                </div>
              </div>
            </AnimatedSection>
          ) : (
            <AnimatedSection delay={0.2}>
              <div className="mt-12">
                {!showSetup ? (
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => setShowSetup(true)}
                      className="heading-label text-sm bg-primary-foreground text-primary px-8 py-4 hover:bg-silver transition-colors inline-flex items-center gap-3"
                    >
                      SET UP YOUR PARTNERSHIP <ArrowRight size={16} />
                    </button>
                    <a
                      href="#how-it-works"
                      className="heading-label text-sm border-[3px] border-silver text-silver px-8 py-4 hover:bg-silver/10 transition-colors inline-flex items-center gap-3"
                    >
                      SEE HOW IT WORKS
                    </a>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
                    {/* Setup Partner A */}
                    <div className="p-8 border-4 border-primary-foreground/30" style={{ backgroundColor: "hsl(215 30% 16%)" }}>
                      <span className="heading-label text-[10px] text-silver mb-4 block">PARTNER A</span>
                      <input
                        value={nameA}
                        onChange={(e) => setNameA(e.target.value)}
                        placeholder="Name"
                        className="w-full bg-transparent border-2 border-silver/30 text-primary-foreground font-body p-3 mb-3 focus:outline-none focus:border-primary-foreground placeholder:text-silver/40"
                      />
                      <input
                        type="password"
                        maxLength={4}
                        value={pinA}
                        onChange={(e) => setPinA(e.target.value.replace(/\D/g, "").slice(0, 4))}
                        placeholder="4-digit PIN"
                        className="w-full bg-transparent border-2 border-silver/30 text-primary-foreground font-body text-center tracking-[0.5em] p-3 focus:outline-none focus:border-primary-foreground placeholder:text-silver/40"
                      />
                    </div>

                    {/* Setup Partner B */}
                    <div className="p-8 border-4 border-primary-foreground/30" style={{ backgroundColor: "hsl(25 30% 14%)" }}>
                      <span className="heading-label text-[10px] text-silver mb-4 block">PARTNER B</span>
                      <input
                        value={nameB}
                        onChange={(e) => setNameB(e.target.value)}
                        placeholder="Name"
                        className="w-full bg-transparent border-2 border-silver/30 text-primary-foreground font-body p-3 mb-3 focus:outline-none focus:border-primary-foreground placeholder:text-silver/40"
                      />
                      <input
                        type="password"
                        maxLength={4}
                        value={pinB}
                        onChange={(e) => setPinB(e.target.value.replace(/\D/g, "").slice(0, 4))}
                        placeholder="4-digit PIN"
                        className="w-full bg-transparent border-2 border-silver/30 text-primary-foreground font-body text-center tracking-[0.5em] p-3 focus:outline-none focus:border-primary-foreground placeholder:text-silver/40"
                      />
                    </div>

                    <div className="md:col-span-2 flex gap-4">
                      <button
                        onClick={handleSetup}
                        className="heading-label text-sm bg-primary-foreground text-primary px-8 py-4 hover:bg-silver transition-colors"
                      >
                        CREATE PARTNERSHIP
                      </button>
                      <button
                        onClick={() => setShowSetup(false)}
                        className="heading-label text-sm border-[3px] border-silver/30 text-silver px-8 py-4 hover:border-silver transition-colors"
                      >
                        CANCEL
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </AnimatedSection>
          )}
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

      {/* FRAMEWORK */}
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
            <h2 className="heading-display text-4xl lg:text-6xl text-foreground text-center mb-16">HOW IT WORKS</h2>
          </AnimatedSection>
          <div className="max-w-3xl mx-auto space-y-0">
            {[
              { step: "01", title: "WRITE PRIVATELY", desc: "Reflect on what happened and what you felt in your private space." },
              { step: "02", title: "AI HELPS ORGANISE", desc: "Your AI assistant structures your thoughts into clear categories." },
              { step: "03", title: "APPROVE WHAT IS SHARED", desc: "Toggle what your partner sees. Nothing shared until approved." },
              { step: "04", title: "ENTER SHARED CONVERSATION", desc: "Approved reflections appear in a guided couple space." },
              { step: "05", title: "COMMIT TO ONE NEXT STEP", desc: "End every session with one clear, practical action." },
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

      {/* SAFETY BANNER */}
      <section className="section-white py-24 lg:py-32 border-t-4 border-primary">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="flex items-start gap-6 max-w-3xl mx-auto">
              <Shield className="text-destructive flex-shrink-0 mt-1" size={32} />
              <div>
                <h2 className="heading-display text-2xl lg:text-3xl text-foreground mb-4">YOUR SAFETY MATTERS</h2>
                <p className="font-body text-muted-foreground leading-relaxed mb-6">
                  If you feel unsafe, do not use shared features right now. This platform does not replace emergency or professional support.
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
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="heading-label text-sm bg-primary-foreground text-primary px-10 py-5 hover:bg-silver transition-colors inline-flex items-center gap-3"
            >
              JOIN MINDCAST RELATIONSHIPS <ArrowRight size={16} />
            </button>
          </AnimatedSection>
        </div>
      </section>

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
