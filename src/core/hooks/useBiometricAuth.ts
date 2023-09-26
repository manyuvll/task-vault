import * as LocalAuthentication from "expo-local-authentication";
import { useEffect, useState } from "react";

const useBiometricAuth = (): [
  boolean,
  () => Promise<LocalAuthentication.LocalAuthenticationResult>,
] => {
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);
  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricAvailable(compatible);
    })();
  });

  const bioAuth = () => {
    return LocalAuthentication.authenticateAsync({
      // promptMessage: "YOOOOO",
      // fallbackLabel: "WOOOO",
    });
  };

  return [isBiometricAvailable, bioAuth];
};

export { useBiometricAuth };
