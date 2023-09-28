import React from "react";
import { SafeAreaView } from "react-native";

import { TaskForm } from "~/screens/task";
import { Header } from "~/ui/core";
import { safeArea } from "~/ui/themes";

export default function Page() {
  return (
    <SafeAreaView style={safeArea.AndroidSafeArea}>
      <Header title="Edit a Task" />
      <TaskForm />
    </SafeAreaView>
  );
}
