import { useState, useEffect } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const dimensions = ["Connection", "Safety", "Heard", "Trust", "Intimacy"];

interface CheckInEntry {
  week: string;
  Connection: number;
  Safety: number;
  Heard: number;
  Trust: number;
  Intimacy: number;
  appreciation: string;
}

const WeeklyCheckIn = () => {
  const { toast } = useToast();
  const [values, setValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(dimensions.map((d) => [d, 5]))
  );
  const [appreciation, setAppreciation] = useState("");
  const [history, setHistory] = useState<CheckInEntry[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("mindcast-checkins");
    if (stored) setHistory(JSON.parse(stored));
  }, []);

  const submit = () => {
    const entry: CheckInEntry = {
      week: `W${history.length + 1}`,
      ...values as any,
      appreciation,
    };
    const updated = [...history, entry].slice(-4);
    setHistory(updated);
    localStorage.setItem("mindcast-checkins", JSON.stringify(updated));
    setAppreciation("");
    setValues(Object.fromEntries(dimensions.map((d) => [d, 5])));
    toast({ title: "Check-in saved", description: "Your weekly check-in has been recorded." });
  };

  const colors = ["#FFFFFF", "#B8C0CC", "#8899AA", "#667788", "#AABBCC"];

  return (
    <div className="min-h-screen bg-primary pt-16">
      <div className="container mx-auto px-6 py-12 lg:py-20 max-w-4xl">
        <AnimatedSection>
          <p className="heading-label text-[10px] text-silver mb-2">WEEKLY OVERVIEW</p>
          <h1 className="heading-display text-3xl lg:text-5xl text-primary-foreground mb-8">CHECK-IN DASHBOARD</h1>
        </AnimatedSection>

        {/* Sliders */}
        <AnimatedSection>
          <div className="card-bordered-white p-6 lg:p-8 mb-8">
            <span className="heading-label text-[10px] text-silver mb-6 block">RATE THIS WEEK (1–10)</span>
            <div className="space-y-6">
              {dimensions.map((dim) => (
                <div key={dim}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="heading-label text-[9px] text-primary-foreground">{dim.toUpperCase()}</span>
                    <span className="heading-display text-lg text-primary-foreground">{values[dim]}</span>
                  </div>
                  <Slider
                    value={[values[dim]]}
                    onValueChange={([v]) => setValues((p) => ({ ...p, [dim]: v }))}
                    min={1}
                    max={10}
                    step={1}
                    className="[&_[role=slider]]:bg-primary-foreground [&_[role=slider]]:border-primary-foreground [&_.bg-primary]:bg-primary-foreground [&_[data-orientation=horizontal]>.relative]:bg-silver/30"
                  />
                </div>
              ))}
            </div>

            <div className="mt-8">
              <span className="heading-label text-[9px] text-silver mb-2 block">ONE THING I APPRECIATE ABOUT US THIS WEEK</span>
              <textarea
                value={appreciation}
                onChange={(e) => setAppreciation(e.target.value)}
                placeholder="Write something you appreciate..."
                className="w-full bg-navy-light text-primary-foreground font-body text-sm p-4 focus:outline-none min-h-[80px] resize-none border border-silver/10"
              />
            </div>

            <button
              onClick={submit}
              className="heading-label text-sm bg-primary-foreground text-primary px-8 py-3 mt-6 hover:bg-silver transition-colors"
            >
              SUBMIT CHECK-IN
            </button>
          </div>
        </AnimatedSection>

        {/* Chart */}
        {history.length > 0 && (
          <AnimatedSection>
            <div className="card-bordered-white p-6 lg:p-8">
              <span className="heading-label text-[10px] text-silver mb-6 block">TRENDS (LAST 4 WEEKS)</span>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={history}>
                  <XAxis dataKey="week" stroke="#B8C0CC" fontSize={10} />
                  <YAxis domain={[1, 10]} stroke="#B8C0CC" fontSize={10} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "hsl(215,50%,11%)", border: "1px solid #B8C0CC", color: "#fff" }}
                    labelStyle={{ color: "#B8C0CC" }}
                  />
                  {dimensions.map((dim, i) => (
                    <Line key={dim} type="monotone" dataKey={dim} stroke={colors[i]} strokeWidth={2} dot={{ r: 4 }} />
                  ))}
                </LineChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-4 mt-4">
                {dimensions.map((dim, i) => (
                  <div key={dim} className="flex items-center gap-2">
                    <div className="w-3 h-3" style={{ backgroundColor: colors[i] }} />
                    <span className="font-body text-silver text-xs">{dim}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        )}
      </div>
    </div>
  );
};

export default WeeklyCheckIn;
