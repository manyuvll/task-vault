import * as SecureStore from "expo-secure-store";
import React from "react";
import { Platform } from "react-native";

import { setStorageItemAsync } from "./helpers";

export function useStorageState(
  key: string,
): [string | null, (value: string | null) => Promise<void>] {
  const [state, setState] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (Platform.OS === "web") {
      try {
        if (typeof localStorage !== "undefined") {
          setState(localStorage.getItem(key));
        }
      } catch (e) {
        console.error("Local storage is unavailable:", e);
      }
    } else {
      SecureStore.getItemAsync(key).then((value) => {
        setState(value);
      });
    }
  }, [key]);

  const setValue = React.useCallback(
    (value: string | null): Promise<void> => {
      // Promise is needed so that we can redirect after has been stored.
      // Omitting this would result in the app being redirected back to the sign-in page
      return new Promise(async (resolve, reject) => {
        try {
          setStorageItemAsync(key, value).then(() => {
            setState(value ?? null);
            // Resolve the Promise when the storage operation is complete.
            resolve();
          });
        } catch (error) {
          reject(error); // Reject the Promise if there's an error.
        }
      });
    },
    [key],
  );

  return [state, setValue];
}
