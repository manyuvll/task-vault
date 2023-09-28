import { useContext } from "react";

import { AuthContext } from "./contexts";

// Use this hook to access the user session status.
export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useSession must be wrapped in a <AuthProvider />");
  }

  return value;
}
