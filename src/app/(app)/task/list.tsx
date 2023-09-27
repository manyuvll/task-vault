import { SafeAreaView, Text } from "react-native";

import { List } from "~/screens";
import { Header } from "~/ui";

export default function Page() {
  return (
    <SafeAreaView>
      <Header title="Task List" />
      <List />
    </SafeAreaView>
  );
}
