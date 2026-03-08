import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowRight, Shield, Eye, MessageSquare, CheckCircle } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const Landing = () => {
  const { setup, setSetup, setActivePartner } = useAppContext();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showSetup, setShowSetup] = useState(false);

  const [nameA, setNameA] = useState("");
  const [pinA, setPinA] = useState("");
  const [nameB, setNameB] = useState("");
  const [pinB, setPinB] = useState("");

  const [loginPinA, setLoginPinA] = useState("");
  const [loginPinB, setLoginPinB] = useState("");

  const handleSetup = () => {
    if (!nameA.trim() || !nameB.trim() || pinA.length !== 4 || pinB.length !== 4) {
      toast({ title: "something's missing", description: "Please enter both names and 4-digit PINs.", variant: "destructive" });
      return;
    }
    setSetup({ partnerA: { name: nameA.trim(), pin: pinA }, partnerB: { name: nameB.trim(), pin: pinB } });
    setShowSetup(false);
    toast({ title: "your partnership is ready", description: "You can now enter your spaces." });
  };

  const loginA = () => {
    if (!setup) return;
    if (loginPinA !== setup.partnerA.pin) {
      toast({ title: "that doesn't match", description: "Let's try again.", variant: "destructive" });
      return;
    }
    setActivePartner("A");
    navigate("/dashboard-a");
  };

  const loginB = () => {
    if (!setup) return;
    if (loginPinB !== setup.partnerB.pin) {
      toast({ title: "that doesn't match", description: "Let's try again.", variant: "destructive" });
      return;
    }
    setActivePartner("B");
    navigate("/dashboard-b");
  };

  return (
    <div className="min-h-screen bg-shared-bg">
      {/* HERO */}
      <section className="min-h-screen flex items-center pt-16 relative overflow-hidden">
        <div className="wash-a" />
        <div className="wash-b" />
        <div className="container mx-auto px-6 py-20 lg:py-32 relative z-10">
          <AnimatedSection>
            <p className="label-gentle mb-6">mindcast relationships</p>
            <h1 className="heading-warm text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-shared-text max-w-4xl" style={{ lineHeight: 1.3 }}>
              private thoughts.{" "}
              <span className="not-italic">structured repair.</span>
            </h1>
            <p className="font-body text-muted-foreground text-lg lg:text-xl max-w-2xl mt-8 leading-relaxed font-light">
              A consent-first relationship platform that helps you reflect privately, 
              share intentionally, and work toward better conversations.
            </p>
          </AnimatedSection>

          {/* LOGIN CARDS */}
          {setup ? (
            <AnimatedSection delay={0.2}>
              <div className="grid md:grid-cols-2 gap-6 mt-12 max-w-3xl">
                {/* Partner A */}
                <motion.div 
                  className="card-partner-a p-8"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-partner-a-accent" />
                    <span className="label-gentle" style={{ color: "hsl(var(--partner-a-accent))" }}>{setup.partnerA.name}</span>
                  </div>
                  <input
                    type="password"
                    maxLength={4}
                    value={loginPinA}
                    onChange={(e) => setLoginPinA(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    placeholder="your 4-digit pin"
                    className="input-warm w-full text-center tracking-[0.5em] mb-4"
                  />
                  <button onClick={loginA} className="btn-warm w-full font-bold" style={{ background: "hsl(var(--partner-a-primary))", color: "hsl(var(--partner-a-dark))", borderRadius: "var(--radius-button)" }}>
                    enter your space
                  </button>
                </motion.div>

                {/* Partner B */}
                <motion.div 
                  className="card-partner-b p-8"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-partner-b-accent" />
                    <span className="label-gentle" style={{ color: "hsl(var(--partner-b-accent))" }}>{setup.partnerB.name}</span>
                  </div>
                  <input
                    type="password"
                    maxLength={4}
                    value={loginPinB}
                    onChange={(e) => setLoginPinB(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    placeholder="your 4-digit pin"
                    className="input-warm w-full text-center tracking-[0.5em] mb-4"
                  />
                  <button onClick={loginB} className="btn-warm w-full font-bold" style={{ background: "hsl(var(--partner-b-primary))", color: "hsl(var(--partner-b-dark))", borderRadius: "var(--radius-button)" }}>
                    enter your space
                  </button>
                </motion.div>
              </div>
            </AnimatedSection>
          ) : (
            <AnimatedSection delay={0.2}>
              <div className="mt-12">
                {!showSetup ? (
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => setShowSetup(true)}
                      className="btn-warm btn-primary inline-flex items-center gap-3"
                    >
                      begin your partnership <ArrowRight size={16} />
                    </button>
                    <a
                      href="#how-it-works"
                      className="btn-warm btn-outline inline-flex items-center gap-3"
                    >
                      see how it works
                    </a>
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="grid md:grid-cols-2 gap-6 max-w-3xl"
                  >
                    {/* Setup Partner A */}
                    <div className="card-partner-a p-8">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="w-2 h-2 rounded-full bg-partner-a-accent" />
                        <span className="label-gentle" style={{ color: "hsl(var(--partner-a-accent))" }}>partner a</span>
                      </div>
                      <input
                        value={nameA}
                        onChange={(e) => setNameA(e.target.value)}
                        placeholder="your name"
                        className="input-warm w-full mb-3"
                      />
                      <input
                        type="password"
                        maxLength={4}
                        value={pinA}
                        onChange={(e) => setPinA(e.target.value.replace(/\D/g, "").slice(0, 4))}
                        placeholder="choose a 4-digit pin"
                        className="input-warm w-full text-center tracking-[0.5em]"
                      />
                    </div>

                    {/* Setup Partner B */}
                    <div className="card-partner-b p-8">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="w-2 h-2 rounded-full bg-partner-b-accent" />
                        <span className="label-gentle" style={{ color: "hsl(var(--partner-b-accent))" }}>partner b</span>
                      </div>
                      <input
                        value={nameB}
                        onChange={(e) => setNameB(e.target.value)}
                        placeholder="your name"
                        className="input-warm w-full mb-3"
                      />
                      <input
                        type="password"
                        maxLength={4}
                        value={pinB}
                        onChange={(e) => setPinB(e.target.value.replace(/\D/g, "").slice(0, 4))}
                        placeholder="choose a 4-digit pin"
                        className="input-warm w-full text-center tracking-[0.5em]"
                      />
                    </div>

                    <div className="md:col-span-2 flex gap-4">
                      <button onClick={handleSetup} className="btn-warm btn-primary">
                        yes, this feels right
                      </button>
                      <button onClick={() => setShowSetup(false)} className="btn-warm btn-ghost">
                        not yet
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* POSITIONING */}
      <section className="border-y border-border/15 bg-background">
        <div className="container mx-auto px-6 py-10">
          <div className="flex flex-wrap justify-center gap-6 lg:gap-16">
            {["not therapy", "not group chat", "not forced sharing", "a structured relationship practice"].map(
              (text, i) => (
                <AnimatedSection key={text} delay={i * 0.1}>
                  <span className={`font-body text-sm ${i === 3 ? "text-foreground font-bold" : "text-muted-foreground font-light"}`}>
                    {text}
                  </span>
                </AnimatedSection>
              )
            )}
          </div>
        </div>
      </section>

      {/* FRAMEWORK */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <p className="label-gentle text-center mb-4">the framework</p>
            <h2 className="heading-warm text-3xl lg:text-5xl text-center mb-16">
              notice. name. rewire.
            </h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "notice", desc: "Privately reflect on what happened and how it landed.", icon: Eye },
              { title: "name", desc: "Clarify the feeling, need, request, and boundary.", icon: MessageSquare },
              { title: "rewire", desc: "Work together on one concrete behaviour change or repair action.", icon: CheckCircle },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.15}>
                <div className="card-warm p-8 lg:p-10 h-full group">
                  <item.icon className="text-accent mb-6 group-hover:text-foreground transition-colors duration-300" size={28} />
                  <h3 className="heading-warm text-2xl lg:text-3xl mb-4">{item.title}</h3>
                  <p className="font-body text-muted-foreground leading-relaxed font-light">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 lg:py-32 bg-shared-bg">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <p className="label-gentle text-center mb-4">process</p>
            <h2 className="heading-warm text-3xl lg:text-5xl text-shared-text text-center mb-16">how it works</h2>
          </AnimatedSection>
          <div className="max-w-3xl mx-auto space-y-0">
            {[
              { step: "01", title: "write privately", desc: "Reflect on what happened and what you felt in your private space." },
              { step: "02", title: "ai helps organise", desc: "Your assistant structures your thoughts into clear categories." },
              { step: "03", title: "approve what is shared", desc: "Toggle what your partner sees. Nothing shared until approved." },
              { step: "04", title: "enter shared conversation", desc: "Approved reflections appear in a guided shared space." },
              { step: "05", title: "commit to one next step", desc: "End every session with one clear, practical action." },
            ].map((item, i) => (
              <AnimatedSection key={item.step} delay={i * 0.1}>
                <div className="flex gap-6 lg:gap-10 py-8 border-b border-border/10 last:border-0">
                  <span className="font-body font-light text-5xl lg:text-7xl text-accent/30 flex-shrink-0 w-20 lg:w-28">{item.step}</span>
                  <div>
                    <h3 className="heading-warm text-xl lg:text-2xl mb-2">{item.title}</h3>
                    <p className="font-body text-muted-foreground leading-relaxed font-light">{item.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* SAFETY BANNER */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="card-warm flex items-start gap-6 max-w-3xl mx-auto">
              <Shield className="text-destructive flex-shrink-0 mt-1" size={28} />
              <div>
                <h2 className="heading-warm text-2xl lg:text-3xl mb-4">your safety matters</h2>
                <p className="font-body text-muted-foreground leading-relaxed font-light mb-6">
                  If you feel unsafe, do not use shared features right now. This platform does not replace emergency or professional support.
                </p>
                <Link
                  to="/safety"
                  className="btn-warm btn-outline inline-flex items-center gap-3 text-destructive border-destructive hover:bg-destructive/10"
                >
                  safety centre <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 lg:py-32 bg-shared-bg">
        <div className="container mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="heading-warm text-3xl sm:text-4xl lg:text-5xl text-shared-text max-w-3xl mx-auto mb-8">
              build better conversations, even under pressure.
            </h2>
            <p className="font-body text-muted-foreground font-light text-lg mb-8 max-w-xl mx-auto">
              when you're ready, this is a safe place to start.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="btn-warm btn-primary inline-flex items-center gap-3"
            >
              begin <ArrowRight size={16} />
            </button>
          </AnimatedSection>
        </div>
      </section>

      <footer className="bg-background border-t border-border/10 py-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="font-heading italic text-foreground text-sm">
              mindcast <span className="text-muted-foreground font-body font-light text-xs ml-1">relationships</span>
            </p>
            <p className="font-body text-muted-foreground text-xs font-light">
              not therapy. not coaching. a structured relationship practice. © 2026
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
