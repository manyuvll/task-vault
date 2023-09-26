import React from "react";
import { SafeAreaView } from "react-native";

import { Daypicker } from "~/ui/core/daypicker/daypicker";

export default function Page() {
  return (
    <SafeAreaView>
      <Daypicker />
    </SafeAreaView>
  );
}
