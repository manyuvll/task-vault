import { ReactNode } from "react";

export interface AuthContextProps {
  session: string | null;
  signIn: (session: string) => Promise<void>;
  signOut: () => void;
}

export interface AuthProviderProps {
  children: ReactNode;
}
