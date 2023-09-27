import { SafeAreaView } from "react-native";

import { List } from "~/screens/task";
import { Header } from "~/ui/core";

export default function Page() {
  return (
    <SafeAreaView>
      <Header title="Task List" />
      <List />
    </SafeAreaView>
  );
}
