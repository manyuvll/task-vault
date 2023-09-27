import React from "react";
import { SafeAreaView } from "react-native";

import { Add } from "~/screens";
import { Header } from "~/ui";

export default function Page() {
  return (
    <SafeAreaView>
      <Header title="Add a Task" />
      <Add />
    </SafeAreaView>
  );
}