import { ReactNode } from "react";

export interface AuthContextProps {
  session: string | null;
  signIn: (session: string) => Promise<void>;
  signOut: () => void;
  isLoading: boolean;
}

export interface AuthProviderProps {
  children: ReactNode;
}
