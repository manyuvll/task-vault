import { AuthenticationType } from "expo-local-authentication";
import { Platform } from "react-native";

// get a customized signin label by priority, could be improved for sure
export const bioAuthTypeToLabel = (type: AuthenticationType[]) => {
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
