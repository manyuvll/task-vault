import * as LocalAuthentication from "expo-local-authentication";
import { useEffect, useState } from "react";

const useBiometricAuth = (): [
  LocalAuthentication.AuthenticationType[],
  () => Promise<LocalAuthentication.LocalAuthenticationResult>,
] => {
  const [availableBiometricAuth, setAvailableBiometricAuth] = useState<
    LocalAuthentication.AuthenticationType[]
  >([]);
  useEffect(() => {
    (async () => {
      const type =
        await LocalAuthentication.supportedAuthenticationTypesAsync();
      setAvailableBiometricAuth(type);
    })();
  }, []);

  return [availableBiometricAuth, LocalAuthentication.authenticateAsync];
};

export { useBiometricAuth };
