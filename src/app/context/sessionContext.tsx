"use client"
import { createContext, useContext, useState, ReactNode } from "react";

interface SessionContextType {
  sessionId: string | null;
  guestEmail: string | null;
  setSessionId: (id: string | null) => void;
  setGuestEmail: (email: string | null) => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) throw new Error("useSession debe usarse dentro de SessionProvider");
  return context;
}

export function SessionProvider({ children }: { children: ReactNode }) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [guestEmail, setGuestEmail] = useState<string | null>(null);

  return (
    <SessionContext.Provider value={{ sessionId, guestEmail, setSessionId, setGuestEmail }}>
      {children}
    </SessionContext.Provider>
  );
}
