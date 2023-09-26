import { AuthContext } from "./contexts";
import { AuthProviderProps } from "./types";
import { useStorageState } from "../secureStore";

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession, isLoading] = useStorageState("session");

  return (
    <AuthContext.Provider
      value={{
        signIn: async (userSession) => {
          return setSession(userSession);
        },
        signOut: async () => {
          return setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
