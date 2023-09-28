import { SafeAreaView } from "react-native-safe-area-context";

import { Home } from "~/screens/home";
import { safeArea } from "~/ui/themes";

export default function Page() {
  return (
    <SafeAreaView style={safeArea.AndroidSafeArea}>
      <Home />
    </SafeAreaView>
  );
}
