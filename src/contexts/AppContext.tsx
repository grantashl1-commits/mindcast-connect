import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type AppMode = "partnership" | "family";

export interface ReflectionCard {
  key: string;
  label: string;
  text: string;
  shared: boolean;
}

interface AppContextType {
  mode: AppMode;
  setMode: (m: AppMode) => void;
  sharedCards: ReflectionCard[];
  setSharedCards: (cards: ReflectionCard[]) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be inside AppProvider");
  return ctx;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setModeState] = useState<AppMode>(() => {
    return (localStorage.getItem("mindcast-mode") as AppMode) || "partnership";
  });
  const [sharedCards, setSharedCards] = useState<ReflectionCard[]>([]);

  const setMode = (m: AppMode) => {
    setModeState(m);
    localStorage.setItem("mindcast-mode", m);
  };

  return (
    <AppContext.Provider value={{ mode, setMode, sharedCards, setSharedCards }}>
      {children}
    </AppContext.Provider>
  );
};
