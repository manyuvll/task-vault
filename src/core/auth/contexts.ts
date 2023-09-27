import { createContext } from "react";

import { AuthContextProps } from "./types";

export const AuthContext = createContext<AuthContextProps>({
  session: null,
  signIn: async () => {
    console.log("not-implemented");
  },
  signOut: () => {
    console.log("not-implemented");
  },
});
