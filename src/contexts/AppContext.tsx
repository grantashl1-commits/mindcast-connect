import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type AppMode = "partnership" | "family";
export type ActivePartner = "A" | "B" | null;

export interface PartnerProfile {
  name: string;
  pin: string;
}

export interface PartnershipSetup {
  partnerA: PartnerProfile;
  partnerB: PartnerProfile;
}

export interface ReflectionCard {
  key: string;
  label: string;
  text: string;
  shared: boolean;
}

export interface Commitment {
  next_step: string;
  timeframe: string;
  why?: string;
  date: string;
}

interface AppContextType {
  mode: AppMode;
  setMode: (m: AppMode) => void;
  activePartner: ActivePartner;
  setActivePartner: (p: ActivePartner) => void;
  setup: PartnershipSetup | null;
  setSetup: (s: PartnershipSetup) => void;
  partnerACards: ReflectionCard[];
  setPartnerACards: (cards: ReflectionCard[]) => void;
  partnerBCards: ReflectionCard[];
  setPartnerBCards: (cards: ReflectionCard[]) => void;
  commitments: Commitment[];
  addCommitment: (c: Commitment) => void;
  sharedPaused: { A: boolean; B: boolean };
  togglePause: (partner: "A" | "B") => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be inside AppProvider");
  return ctx;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setModeState] = useState<AppMode>(() =>
    (localStorage.getItem("mindcast-mode") as AppMode) || "partnership"
  );
  const [activePartner, setActivePartnerState] = useState<ActivePartner>(null);
  const [setup, setSetupState] = useState<PartnershipSetup | null>(() => {
    const s = localStorage.getItem("mindcast-setup");
    return s ? JSON.parse(s) : null;
  });
  const [partnerACards, setPartnerACardsState] = useState<ReflectionCard[]>(() => {
    const s = localStorage.getItem("mindcast-cards-a");
    return s ? JSON.parse(s) : [];
  });
  const [partnerBCards, setPartnerBCardsState] = useState<ReflectionCard[]>(() => {
    const s = localStorage.getItem("mindcast-cards-b");
    return s ? JSON.parse(s) : [];
  });
  const [commitments, setCommitmentsState] = useState<Commitment[]>(() => {
    const s = localStorage.getItem("mindcast-commitments");
    return s ? JSON.parse(s) : [];
  });
  const [sharedPaused, setSharedPaused] = useState<{ A: boolean; B: boolean }>(() => {
    const s = localStorage.getItem("mindcast-paused");
    return s ? JSON.parse(s) : { A: false, B: false };
  });

  const setMode = (m: AppMode) => {
    setModeState(m);
    localStorage.setItem("mindcast-mode", m);
  };

  const setActivePartner = (p: ActivePartner) => {
    setActivePartnerState(p);
    if (p) localStorage.setItem("mindcast-active", p);
    else localStorage.removeItem("mindcast-active");
  };

  const setSetup = (s: PartnershipSetup) => {
    setSetupState(s);
    localStorage.setItem("mindcast-setup", JSON.stringify(s));
  };

  const setPartnerACards = (cards: ReflectionCard[]) => {
    setPartnerACardsState(cards);
    localStorage.setItem("mindcast-cards-a", JSON.stringify(cards));
  };

  const setPartnerBCards = (cards: ReflectionCard[]) => {
    setPartnerBCardsState(cards);
    localStorage.setItem("mindcast-cards-b", JSON.stringify(cards));
  };

  const addCommitment = (c: Commitment) => {
    const updated = [...commitments, c];
    setCommitmentsState(updated);
    localStorage.setItem("mindcast-commitments", JSON.stringify(updated));
  };

  const togglePause = (partner: "A" | "B") => {
    const updated = { ...sharedPaused, [partner]: !sharedPaused[partner] };
    setSharedPaused(updated);
    localStorage.setItem("mindcast-paused", JSON.stringify(updated));
  };

  const logout = () => {
    setActivePartnerState(null);
    localStorage.removeItem("mindcast-active");
  };

  // Restore session on mount
  useEffect(() => {
    const stored = localStorage.getItem("mindcast-active");
    if (stored === "A" || stored === "B") setActivePartnerState(stored);
  }, []);

  return (
    <AppContext.Provider
      value={{
        mode, setMode,
        activePartner, setActivePartner,
        setup, setSetup,
        partnerACards, setPartnerACards,
        partnerBCards, setPartnerBCards,
        commitments, addCommitment,
        sharedPaused, togglePause,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
