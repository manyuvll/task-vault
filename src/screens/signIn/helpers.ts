import { AuthenticationType, SecurityLevel } from "expo-local-authentication";
import { Platform } from "react-native";

// get a customized signin label by priority, could be improved for sure
export const bioAuthTypeToLabel = (
  type: AuthenticationType[],
  security: SecurityLevel,
) => {
  // improvement would be to manage this case somehow instead of just a message
  if (security === SecurityLevel.NONE) return "Disabled";
  // if no biometrics, use pin label
  if (security === SecurityLevel.SECRET) return "Sign-in using your PIN";
  switch (true) {
    case type.includes(AuthenticationType.FINGERPRINT):
      return `Sign-in using ${
        Platform.OS === "ios" ? "Touch ID" : "fingerprints"
      }`;
    case type.includes(AuthenticationType.FACIAL_RECOGNITION):
      return `Sign-in using ${
        Platform.OS === "ios" ? "Face ID" : "facial recogntion"
      }`;
    case type.includes(AuthenticationType.IRIS):
      return "Sign-in using iris recognition";
    default:
      return "Sign-in";
  }
};
