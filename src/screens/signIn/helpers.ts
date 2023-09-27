import { AuthenticationType } from "expo-local-authentication";

// get a customized signin label by priority
// apple centric, can be improved
export const bioAuthTypeToLabel = (type: AuthenticationType[]) => {
  switch (true) {
    case type.includes(AuthenticationType.FINGERPRINT):
      return "Sign-in using Touch ID";
    case type.includes(AuthenticationType.FACIAL_RECOGNITION):
      return "Sign-in using Face ID";
    case type.includes(AuthenticationType.IRIS):
      return "Sign-in using eye recognition";
    default:
      return "Sign-in";
  }
};
