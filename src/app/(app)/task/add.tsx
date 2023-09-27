import React from "react";
import { SafeAreaView } from "react-native";
import { Header } from "react-native/Libraries/NewAppScreen";

import { Add } from "~/screens/task";

export default function Page() {
  return (
    <SafeAreaView>
      <Header title="Add a Task" />
      <Add />
    </SafeAreaView>
  );
}
