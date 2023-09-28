import React from "react";
import { SafeAreaView } from "react-native";

import { TaskForm } from "~/screens/task";
import { Header } from "~/ui/core";

export default function Page() {
  return (
    <SafeAreaView>
      <Header title="Edit a Task" />
      <TaskForm />
    </SafeAreaView>
  );
}
