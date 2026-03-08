import { useNavigate } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { Shield, Pause, Phone, AlertTriangle, LogOut } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import { useToast } from "@/hooks/use-toast";

const SafetyCentre = () => {
  const { activePartner, togglePause, sharedPaused, logout } = useAppContext();
  const navigate = useNavigate();
  const { toast } = useToast();

  const exitApp = () => {
    logout();
    navigate("/");
  };

  const handlePause = () => {
    if (activePartner) {
      togglePause(activePartner);
      toast({
        title: sharedPaused[activePartner] ? "sharing resumed" : "sharing paused",
        description: sharedPaused[activePartner] ? "shared features are now active." : "shared features are now paused for you. take your time.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-shared-bg pt-16">
      <div className="container mx-auto px-6 py-12 lg:py-20 max-w-3xl">
        <AnimatedSection>
          <div className="flex items-center gap-3 mb-4">
            <Shield size={24} className="text-destructive" />
            <h1 className="heading-warm text-3xl lg:text-4xl text-shared-text">your safety matters</h1>
          </div>
          <p className="font-body text-muted-foreground leading-relaxed font-light mb-10 max-w-2xl text-lg">
            if you feel unsafe at any point, pause now. this platform does not replace professional support or emergency services.
          </p>
        </AnimatedSection>

        <div className="space-y-6">
          <AnimatedSection>
            <div className="card-warm" style={{ borderColor: "hsl(var(--destructive) / 0.3)" }}>
              <div className="flex items-center gap-3 mb-4">
                <Phone size={20} className="text-destructive" />
                <h2 className="heading-warm text-xl text-shared-text">get help now</h2>
              </div>
              <p className="font-body text-muted-foreground leading-relaxed font-light mb-4">
                if you are in immediate danger, please contact emergency services.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="tel:111" className="btn-warm font-bold inline-flex items-center gap-2" style={{ background: "hsl(var(--destructive))", color: "white", borderRadius: "var(--radius-button)" }}>
                  call 111
                </a>
                <a href="sms:1737" className="btn-warm font-bold inline-flex items-center gap-2" style={{ background: "hsl(var(--destructive))", color: "white", borderRadius: "var(--radius-button)" }}>
                  text 1737
                </a>
              </div>
            </div>
          </AnimatedSection>

          {activePartner && (
            <AnimatedSection>
              <div className="card-warm">
                <div className="flex items-center gap-3 mb-4">
                  <Pause size={20} className="text-shared-text" />
                  <h2 className="heading-warm text-xl text-shared-text">pause shared features</h2>
                </div>
                <p className="font-body text-muted-foreground leading-relaxed font-light mb-4">
                  temporarily disable the shared space. your private journal remains available.
                </p>
                <button onClick={handlePause} className="btn-warm btn-outline">
                  {sharedPaused[activePartner] ? "resume sharing" : "pause sharing"}
                </button>
              </div>
            </AnimatedSection>
          )}

          <AnimatedSection>
            <div className="card-warm">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle size={20} className="text-shared-text" />
                <h2 className="heading-warm text-xl text-shared-text">report a concern</h2>
              </div>
              <p className="font-body text-muted-foreground leading-relaxed font-light mb-4">
                if you believe the platform is being used to coerce, manipulate, or harm, please report it.
              </p>
              <button className="btn-warm btn-outline">
                report concern
              </button>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="card-warm">
              <div className="flex items-center gap-3 mb-4">
                <LogOut size={20} className="text-shared-text" />
                <h2 className="heading-warm text-xl text-shared-text">step away</h2>
              </div>
              <p className="font-body text-muted-foreground leading-relaxed font-light mb-4">
                returns to home and clears your current session.
              </p>
              <button onClick={exitApp} className="btn-warm" style={{ background: "hsl(var(--destructive) / 0.1)", color: "hsl(var(--destructive))", border: "1px solid hsl(var(--destructive) / 0.3)", borderRadius: "var(--radius-button)" }}>
                step away & clear session
              </button>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection>
          <div className="card-warm mt-10" style={{ borderLeft: "3px solid hsl(var(--shared-text) / 0.2)" }}>
            <p className="font-body text-muted-foreground text-sm leading-relaxed font-light italic">
              mindcast relationships is not therapy, counselling, or a crisis intervention service.
              it's a structured practice for people who want to communicate better.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default SafetyCentre;
