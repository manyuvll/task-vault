import * as LocalAuthentication from "expo-local-authentication";
import { useEffect, useMemo, useState } from "react";

const useBiometricAuth = (): [
  {
    security: LocalAuthentication.SecurityLevel;
    biometrics: LocalAuthentication.AuthenticationType[];
    isAvailable: boolean;
  },
  () => Promise<LocalAuthentication.LocalAuthenticationResult>,
  Map<string, string>,
] => {
  const [availableSecurityLevel, setAvailableSecurityLevel] =
    useState<LocalAuthentication.SecurityLevel>(0);

  const [availableBiometricAuth, setAvailableBiometricAuth] = useState<
    LocalAuthentication.AuthenticationType[]
  >([]);
  const errorMapping = new Map<string, string>([
    [
      "not_enrolled",
      "Please enable biometric or PIN protection on your smartphone",
    ],
  ]);
  useEffect(() => {
    (async () => {
      // Determine which if pin or biometric is available
      const level = await LocalAuthentication.getEnrolledLevelAsync();
      setAvailableSecurityLevel(level);
    })();

    (async () => {
      // Determine which biometric authentication methods are currently accessible
      const type =
        await LocalAuthentication.supportedAuthenticationTypesAsync();
      setAvailableBiometricAuth(type);
    })();
  }, []);

  const authInformation = useMemo(
    () => ({
      security: availableSecurityLevel,
      biometrics: availableBiometricAuth,
      isAvailable: Boolean(
        availableSecurityLevel !== 0 && availableBiometricAuth.length,
      ),
    }),
    [availableSecurityLevel, availableBiometricAuth],
  );

  // Provide an array containing the accessible biometric options along with the corresponding function for conducting a verification
  return [authInformation, LocalAuthentication.authenticateAsync, errorMapping];
};

export { useBiometricAuth };
