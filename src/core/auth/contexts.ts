import { createContext } from "react";

import { AuthContextProps } from "./types";

export const AuthContext = createContext<AuthContextProps>({
  session: null,
  signIn: async () => {
    console.error("not-defined");
  },
  signOut: () => {
    console.error("not-defined");
  },
});
