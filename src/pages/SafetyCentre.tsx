import { useNavigate } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { Shield, Pause, Phone, AlertTriangle, LogOut, Lock } from "lucide-react";
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
      toast({ title: sharedPaused[activePartner] ? "Sharing resumed" : "Sharing paused", description: sharedPaused[activePartner] ? "Shared features are now active." : "Shared features are now paused for you." });
    }
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-6 py-12 lg:py-20 max-w-3xl">
        <AnimatedSection>
          <div className="flex items-center gap-3 mb-4">
            <Shield size={28} className="text-destructive" />
            <h1 className="heading-display text-3xl lg:text-5xl text-foreground">SAFETY CENTRE</h1>
          </div>
          <p className="font-body text-muted-foreground leading-relaxed mb-10 max-w-2xl">
            Your safety is the highest priority. If you feel unsafe at any point, use the tools below.
          </p>
        </AnimatedSection>

        <div className="space-y-6">
          <AnimatedSection>
            <div className="border-4 border-destructive p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Phone size={20} className="text-destructive" />
                <h2 className="heading-display text-xl text-foreground">GET HELP NOW</h2>
              </div>
              <p className="font-body text-foreground leading-relaxed mb-4">
                If you are in immediate danger, please contact emergency services.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="tel:111" className="heading-label text-sm bg-destructive text-destructive-foreground px-6 py-3 inline-flex items-center gap-2 hover:opacity-90 transition-opacity">
                  CALL 111
                </a>
                <a href="sms:1737" className="heading-label text-sm bg-destructive text-destructive-foreground px-6 py-3 inline-flex items-center gap-2 hover:opacity-90 transition-opacity">
                  TEXT 1737
                </a>
              </div>
            </div>
          </AnimatedSection>

          {activePartner && (
            <AnimatedSection>
              <div className="card-bordered p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Pause size={20} className="text-foreground" />
                  <h2 className="heading-display text-xl text-foreground">PAUSE SHARED FEATURES</h2>
                </div>
                <p className="font-body text-muted-foreground leading-relaxed mb-4">
                  Temporarily disable the shared couple room. Your private journal remains available.
                </p>
                <button onClick={handlePause} className="heading-label text-sm border-[3px] border-foreground text-foreground px-6 py-3 hover:bg-primary hover:text-primary-foreground transition-colors">
                  {sharedPaused[activePartner] ? "RESUME SHARING" : "PAUSE SHARING"}
                </button>
              </div>
            </AnimatedSection>
          )}

          <AnimatedSection>
            <div className="card-bordered p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle size={20} className="text-foreground" />
                <h2 className="heading-display text-xl text-foreground">REPORT A CONCERN</h2>
              </div>
              <p className="font-body text-muted-foreground leading-relaxed mb-4">
                If you believe the platform is being used to coerce, manipulate, or harm, please report it.
              </p>
              <button className="heading-label text-sm border-[3px] border-foreground text-foreground px-6 py-3 hover:bg-primary hover:text-primary-foreground transition-colors">
                REPORT CONCERN
              </button>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="card-bordered p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <LogOut size={20} className="text-foreground" />
                <h2 className="heading-display text-xl text-foreground">EXIT APP</h2>
              </div>
              <p className="font-body text-muted-foreground leading-relaxed mb-4">
                Returns to home and clears your current session.
              </p>
              <button onClick={exitApp} className="heading-label text-sm border-[3px] border-destructive text-destructive px-6 py-3 hover:bg-destructive hover:text-destructive-foreground transition-colors">
                EXIT & CLEAR SESSION
              </button>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection>
          <div className="mt-10 bg-muted p-6 border-l-4 border-foreground">
            <p className="font-body text-foreground text-sm leading-relaxed">
              <strong>Important:</strong> MINDCAST Relationships is not therapy, counselling, or a crisis intervention service.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default SafetyCentre;
