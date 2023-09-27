import { SafeAreaView } from "react-native";

import { SignIn } from "~/screens/signIn";

export default function Page() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SignIn />
    </SafeAreaView>
  );
}
