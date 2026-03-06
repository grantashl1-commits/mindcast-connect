import { useState } from "react";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowRight, MessageSquare, Clock, Heart } from "lucide-react";

const sharedCards = [
  {
    from: "YOU",
    time: "2 hours ago",
    sections: [
      { label: "SITUATION", text: "We had a disagreement about how household tasks are divided." },
      { label: "FEELINGS", text: "I felt frustrated, unheard, and a bit resentful." },
      { label: "NEEDS", text: "I need acknowledgement and a more structured way to divide tasks." },
      { label: "REQUEST", text: "I'd like us to create a shared task list together this weekend." },
    ],
  },
  {
    from: "PARTNER",
    time: "45 minutes ago",
    sections: [
      { label: "SITUATION", text: "The same conversation about chores. I felt caught off guard." },
      { label: "FEELINGS", text: "Defensive at first, then guilty. I know I could do more." },
      { label: "REQUEST", text: "Can we talk about it without blame? I want to fix this." },
    ],
  },
];

const acknowledgements = [
  { label: "I hear this", icon: Heart },
  { label: "I need time", icon: Clock },
  { label: "I want to respond carefully", icon: MessageSquare },
];

const CoupleRoom = () => {
  const [acks, setAcks] = useState<Record<string, string>>({});

  const handleAck = (cardFrom: string, ackLabel: string) => {
    setAcks((prev) => ({ ...prev, [cardFrom]: ackLabel }));
  };

  return (
    <div className="min-h-screen bg-primary pt-16">
      <div className="container mx-auto px-6 py-12 lg:py-20 max-w-3xl">
        <AnimatedSection>
          <p className="heading-label text-[10px] text-silver mb-2">SHARED SPACE</p>
          <h1 className="heading-display text-3xl lg:text-5xl text-primary-foreground mb-4">COUPLE ROOM</h1>
          <p className="font-body text-silver leading-relaxed mb-8">
            Only approved reflections appear here. Read your partner's share card and acknowledge before responding.
          </p>
        </AnimatedSection>

        <div className="space-y-6">
          {sharedCards.map((card) => (
            <AnimatedSection key={card.from}>
              <div className="card-bordered-white p-6 lg:p-8">
                <div className="flex items-center justify-between mb-6">
                  <span className="heading-label text-xs text-primary-foreground">{card.from}</span>
                  <span className="font-body text-silver text-xs">{card.time}</span>
                </div>
                <div className="space-y-4">
                  {card.sections.map((s) => (
                    <div key={s.label}>
                      <span className="heading-label text-[9px] text-silver">{s.label}</span>
                      <p className="font-body text-primary-foreground/90 text-sm leading-relaxed mt-1">{s.text}</p>
                    </div>
                  ))}
                </div>

                {/* Acknowledgement chips */}
                <div className="mt-6 pt-4 border-t border-silver/10">
                  <p className="heading-label text-[9px] text-silver mb-3">ACKNOWLEDGE</p>
                  <div className="flex flex-wrap gap-2">
                    {acknowledgements.map((a) => (
                      <button
                        key={a.label}
                        onClick={() => handleAck(card.from, a.label)}
                        className={`heading-label text-[9px] px-4 py-2 flex items-center gap-2 transition-colors ${
                          acks[card.from] === a.label
                            ? "bg-primary-foreground text-primary"
                            : "border border-silver/30 text-silver hover:border-silver"
                        }`}
                      >
                        <a.icon size={12} />
                        {a.label.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <div className="mt-10 text-center">
            <Link
              to="/guided-conversation"
              className="heading-label text-sm bg-primary-foreground text-primary px-10 py-4 hover:bg-silver transition-colors inline-flex items-center gap-3"
            >
              START GUIDED CONVERSATION <ArrowRight size={16} />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default CoupleRoom;
