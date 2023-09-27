import { format } from "date-fns";
import Checkbox from "expo-checkbox";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Toast from "react-native-root-toast";

import { SWIPE } from "./constants";
import { Item } from "./item";
import { LeftActions } from "./leftAction";
import { RightActions } from "./rightAction";
import { deleteTask } from "../taskSlice";

import { useAppSelector, useAppDispatch, useBiometricAuth } from "~/core";
import { colors, text } from "~/ui";

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
    <ScrollView style={style().container}>
      {taskList.map((task) => (
        <Swipeable
          key={task.id}
          renderLeftActions={LeftActions}
          onSwipeableOpen={handleOnSwipeableOpen(task.id)}
          renderRightActions={RightActions}
        >
          <Item task={task} />
        </Swipeable>
      ))}
    </ScrollView>
  );
};

const style = (completed?: boolean) =>
  StyleSheet.create({
    container: {
      height: "100%",
      padding: 30,
      // backgroundColor: colors.white,
    },
  });
