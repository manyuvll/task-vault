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
      // Determine which biometric authentication methods are currently accessible
      const type =
        await LocalAuthentication.supportedAuthenticationTypesAsync();
      setAvailableBiometricAuth(type);
    })();
  }, []);

  // Provide an array containing the accessible biometric options along with the corresponding function for conducting a verification
  return [availableBiometricAuth, LocalAuthentication.authenticateAsync];
};

export { useBiometricAuth };
