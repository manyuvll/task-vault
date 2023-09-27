import React from "react";
import { SafeAreaView } from "react-native";

import { Add } from "~/screens/task";
import { Header } from "~/ui/core";

export default function Page() {
  return (
    <SafeAreaView>
      <Header title="Add a Task" />
      <Add />
    </SafeAreaView>
  );
}
