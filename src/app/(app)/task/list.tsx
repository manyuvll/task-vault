import { SafeAreaView, Text } from "react-native";

import { useAppDispatch } from "~/core/hooks/useAppDispatch";
import { useAppSelector } from "~/core/hooks/useAppSelector";
import { addTask, deleteTask } from "~/screens";
import { Header } from "~/ui";

export default function Page() {
  const task = useAppSelector((state) => state.taskList);
  const dispatch = useAppDispatch();
  return (
    <SafeAreaView>
      <Header title="Task List" />
      <Text onPress={() => console.log(task)}>List</Text>
      <Text
        onPress={() =>
          dispatch(
            addTask({
              id: "ddjns",
              label: "Task1",
              description: "This is a description",
              date: new Date().toISOString(),
              completed: false,
            }),
          )
        }
      >
        Add
      </Text>
      <Text onPress={() => dispatch(deleteTask("ddjns"))}>Delete</Text>
    </SafeAreaView>
  );
}
