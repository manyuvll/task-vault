import { AuthContext } from "./contexts";
import { AuthProviderProps } from "./types";
import { useStorageState } from "../secureStore";

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useStorageState("session");

  return (
    <AuthContext.Provider
      value={{
        signIn: async (userSession) => {
          console.log("signin");
          return setSession(userSession);
        },
        signOut: async () => {
          return setSession(null);
        },
        session,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
