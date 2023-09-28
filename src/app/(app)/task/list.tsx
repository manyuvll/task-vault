import { SafeAreaView } from "react-native";

import { List } from "~/screens/task";
import { Header } from "~/ui/core";
import { safeArea } from "~/ui/themes";

export default function Page() {
  return (
    <SafeAreaView style={safeArea.AndroidSafeArea}>
      <Header title="Task List" />
      <List />
    </SafeAreaView>
  );
}
