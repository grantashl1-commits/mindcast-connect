import AnimatedSection from "@/components/AnimatedSection";
import { Shield, Pause, Phone, AlertTriangle, LogOut, Lock } from "lucide-react";

const SafetyCentre = () => {
  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-6 py-12 lg:py-20 max-w-3xl">
        <AnimatedSection>
          <div className="flex items-center gap-3 mb-4">
            <Shield size={28} className="text-destructive" />
            <h1 className="heading-display text-3xl lg:text-5xl text-foreground">SAFETY CENTRE</h1>
          </div>
          <p className="font-body text-muted-foreground leading-relaxed mb-10 max-w-2xl">
            Your safety is the highest priority. If you feel unsafe at any point, use the tools below. This platform does not replace emergency or professional support.
          </p>
        </AnimatedSection>

        <div className="space-y-6">
          {/* Emergency */}
          <AnimatedSection>
            <div className="border-4 border-destructive p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Phone size={20} className="text-destructive" />
                <h2 className="heading-display text-xl text-foreground">GET HELP NOW</h2>
              </div>
              <p className="font-body text-foreground leading-relaxed mb-4">
                If you are in immediate danger, please contact emergency services or a crisis helpline.
              </p>
              <div className="space-y-2">
                <a href="tel:000" className="heading-label text-sm bg-destructive text-destructive-foreground px-6 py-3 inline-flex items-center gap-2 hover:opacity-90 transition-opacity">
                  EMERGENCY: 000
                </a>
                <p className="font-body text-muted-foreground text-sm">
                  1800RESPECT: 1800 737 732 · Lifeline: 13 11 14 · Beyond Blue: 1300 22 4636
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Pause */}
          <AnimatedSection>
            <div className="card-bordered p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Pause size={20} className="text-foreground" />
                <h2 className="heading-display text-xl text-foreground">PAUSE SHARED FEATURES</h2>
              </div>
              <p className="font-body text-muted-foreground leading-relaxed mb-4">
                Temporarily disable the shared couple room and guided conversations. Your private journal remains available. Your partner will be notified that shared features are paused — no reason given.
              </p>
              <button className="heading-label text-sm border-[3px] border-foreground text-foreground px-6 py-3 hover:bg-primary hover:text-primary-foreground transition-colors">
                PAUSE SHARING
              </button>
            </div>
          </AnimatedSection>

          {/* Individual mode */}
          <AnimatedSection>
            <div className="card-bordered p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Lock size={20} className="text-foreground" />
                <h2 className="heading-display text-xl text-foreground">INDIVIDUAL-ONLY MODE</h2>
              </div>
              <p className="font-body text-muted-foreground leading-relaxed mb-4">
                Switch to individual-only mode. All shared features are disabled and your journal is fully private. You can re-enable shared features when you're ready.
              </p>
              <button className="heading-label text-sm border-[3px] border-foreground text-foreground px-6 py-3 hover:bg-primary hover:text-primary-foreground transition-colors">
                ENABLE INDIVIDUAL MODE
              </button>
            </div>
          </AnimatedSection>

          {/* Report */}
          <AnimatedSection>
            <div className="card-bordered p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle size={20} className="text-foreground" />
                <h2 className="heading-display text-xl text-foreground">REPORT A CONCERN</h2>
              </div>
              <p className="font-body text-muted-foreground leading-relaxed mb-4">
                If you believe the platform is being used to coerce, manipulate, or harm, please report it. All reports are confidential.
              </p>
              <button className="heading-label text-sm border-[3px] border-foreground text-foreground px-6 py-3 hover:bg-primary hover:text-primary-foreground transition-colors">
                REPORT CONCERN
              </button>
            </div>
          </AnimatedSection>

          {/* Exit */}
          <AnimatedSection>
            <div className="card-bordered p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <LogOut size={20} className="text-foreground" />
                <h2 className="heading-display text-xl text-foreground">EXIT WORKSPACE</h2>
              </div>
              <p className="font-body text-muted-foreground leading-relaxed mb-4">
                Permanently separate from this couple workspace. Your private journal data can be exported or deleted. This action cannot be undone.
              </p>
              <button className="heading-label text-sm border-[3px] border-destructive text-destructive px-6 py-3 hover:bg-destructive hover:text-destructive-foreground transition-colors">
                EXIT & SEPARATE
              </button>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection>
          <div className="mt-10 bg-muted p-6 border-l-4 border-foreground">
            <p className="font-body text-foreground text-sm leading-relaxed">
              <strong>Important:</strong> MINDCAST Relationships is not therapy, counselling, or a crisis intervention service. It is a structured relationship practice tool. If you or someone you know is in danger, please contact emergency services immediately.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default SafetyCentre;
