import { SafeAreaView } from "react-native-safe-area-context";

import { Daypicker } from "~/ui/core/daypicker/daypicker";

export default function Page() {
  return (
    <SafeAreaView>
      <Daypicker />
    </SafeAreaView>
  );
}
