import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Toast from "react-native-root-toast";

import { SWIPE } from "./constants";
import { LeftActions } from "./leftAction";
import { RightActions } from "./rightAction";
import { TaskItem } from "../taskItem";
import { deleteTask } from "../taskSlice";

import { useAppSelector, useAppDispatch, useBiometricAuth } from "~/core/hooks";
import { NoData } from "~/ui/core/noData";

export const List = () => {
  const taskList = useAppSelector((state) => state.taskList);
  const dispatch = useAppDispatch();
  const [isBiometricAvailable, bioAuth] = useBiometricAuth();
  const router = useRouter();

  const handleOnSwipeableOpen =
    (taskId: string) => (direction: "left" | "right", swipeable: Swipeable) => {
      // check if biometrics are working
      if (!isBiometricAvailable) {
        // show a helper message
        Toast.show("Device biometrics not working.", {
          duration: Toast.durations.LONG,
        });
      }
      bioAuth().then((auth) => {
        if (auth.success) {
          if (direction === SWIPE.DELETE) dispatch(deleteTask(taskId));
          else router.push("task/add");
        }
        // close the swiper at the end in any cases
        swipeable.close();
      });
    };

  return (
    <ScrollView contentContainerStyle={style.scrollView}>
      {taskList.length ? (
        taskList.map((task) => (
          <Swipeable
            key={task.id}
            renderLeftActions={LeftActions}
            onSwipeableOpen={handleOnSwipeableOpen(task.id)}
            renderRightActions={RightActions}
          >
            <TaskItem task={task} />
          </Swipeable>
        ))
      ) : (
        <NoData label="No Tasks!" />
      )}
    </ScrollView>
  );
};

const style = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 30,
    paddingBottom: 100,
  },
});
