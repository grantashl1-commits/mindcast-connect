import AnimatedSection from "@/components/AnimatedSection";
import { TrendingUp, Calendar, Flame, BookOpen, Heart } from "lucide-react";

const WeeklyCheckIn = () => {
  const emotions = [
    { week: "W1", level: 3 },
    { week: "W2", level: 5 },
    { week: "W3", level: 4 },
    { week: "W4", level: 7 },
    { week: "W5", level: 6 },
    { week: "W6", level: 8 },
  ];

  const themes = ["Communication", "Household", "Quality time", "Trust"];

  return (
    <div className="min-h-screen bg-primary pt-16">
      <div className="container mx-auto px-6 py-12 lg:py-20 max-w-4xl">
        <AnimatedSection>
          <p className="heading-label text-[10px] text-silver mb-2">WEEKLY OVERVIEW</p>
          <h1 className="heading-display text-3xl lg:text-5xl text-primary-foreground mb-8">CHECK-IN DASHBOARD</h1>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: "PRACTICE STREAK", value: "6 WEEKS", icon: Flame },
            { label: "SESSIONS", value: "12", icon: Calendar },
            { label: "MODULES DONE", value: "1 / 6", icon: BookOpen },
            { label: "CONNECTION SCORE", value: "7.2", icon: Heart },
          ].map((stat) => (
            <AnimatedSection key={stat.label}>
              <div className="card-bordered-white p-6">
                <stat.icon size={18} className="text-silver mb-3" />
                <p className="heading-label text-[9px] text-silver mb-1">{stat.label}</p>
                <p className="heading-display text-2xl text-primary-foreground">{stat.value}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Emotional trend */}
        <AnimatedSection>
          <div className="card-bordered-white p-6 lg:p-8 mb-6">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp size={18} className="text-silver" />
              <span className="heading-label text-[10px] text-primary-foreground">EMOTIONAL TREND</span>
            </div>
            <div className="flex items-end gap-3 h-40">
              {emotions.map((e) => (
                <div key={e.week} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-silver/30 hover:bg-silver transition-colors"
                    style={{ height: `${(e.level / 10) * 100}%` }}
                  />
                  <span className="heading-label text-[8px] text-silver">{e.week}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 gap-6">
          <AnimatedSection>
            <div className="card-bordered-white p-6">
              <span className="heading-label text-[10px] text-silver mb-4 block">TOP THEMES</span>
              <div className="space-y-3">
                {themes.map((t, i) => (
                  <div key={t} className="flex items-center gap-3">
                    <div className="h-2 bg-silver/30 flex-1">
                      <div className="h-2 bg-silver transition-all" style={{ width: `${100 - i * 20}%` }} />
                    </div>
                    <span className="font-body text-primary-foreground text-sm w-28">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="card-bordered-white p-6">
              <span className="heading-label text-[10px] text-silver mb-4 block">RECOMMENDED</span>
              <div className="bg-navy-light p-4 border border-silver/10">
                <BookOpen size={18} className="text-silver mb-2" />
                <p className="heading-label text-xs text-primary-foreground mb-1">CONFLICT REPAIR</p>
                <p className="font-body text-silver text-sm">Based on your recent themes, this module may help.</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default WeeklyCheckIn;
