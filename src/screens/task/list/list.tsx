import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Toast from "react-native-root-toast";

import { SWIPE } from "./constants";
import { LeftActions } from "./leftAction";
import { RightActions } from "./rightAction";
import { TaskItem } from "../taskItem";
import { deleteTask } from "../taskSlice";
import { Task } from "../types";

import { useAppSelector, useAppDispatch, useBiometricAuth } from "~/core/hooks";
import { Input } from "~/ui/core";
import { NoData } from "~/ui/core/noData";

export const List = () => {
  const taskList = useAppSelector((state) => state.taskList);
  const dispatch = useAppDispatch();
  const [isBiometricAvailable, bioAuth] = useBiometricAuth();
  const router = useRouter();
  const [filter, setFilter] = useState("");

  const handleOnSwipeableOpen =
    (task: Task) => (direction: "left" | "right", swipeable: Swipeable) => {
      // check if biometrics are working
      if (!isBiometricAvailable) {
        // show a helper message
        Toast.show("Device biometrics not working correctly.", {
          duration: Toast.durations.LONG,
        });
        return;
      } else {
        // if available, request it
        bioAuth().then((auth) => {
          if (auth.success) {
            if (direction === SWIPE.DELETE) dispatch(deleteTask(task.id));
            else {
              // redirect and pass which task we want to edit
              router.push({
                pathname: `/task/edit`,
                params: { task: JSON.stringify(task) },
              });
            }
          }
        });
      }
      // close the swiper at the end in any cases
      swipeable.close();
    };

  const taskListFiltered = useMemo(() => {
    // if no filter, return
    if (!filter) {
      return taskList;
    }
    return taskList.filter(
      // filter by label or priority
      (task) => {
        const filterLowerCased = filter.toLowerCase();
        return (
          task.label.toLowerCase().includes(filterLowerCased) ||
          task.priority.toLowerCase().includes(filterLowerCased)
        );
      },
    );
  }, [taskList, filter]);

  return (
    <View>
      <View style={styles.filterContainer}>
        <View style={styles.inputContainer}>
          <Input
            label="Filter"
            value={filter}
            placeholder="Label or priority"
            onChangeText={setFilter}
          />
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {taskListFiltered.length ? (
          taskListFiltered.map((task) => (
            <Swipeable
              key={task.id}
              renderLeftActions={LeftActions}
              onSwipeableOpen={handleOnSwipeableOpen(task)}
              renderRightActions={RightActions}
            >
              <TaskItem task={task} />
            </Swipeable>
          ))
        ) : (
          <NoData label="No Tasks!" />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    gap: 10,
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 33,
    paddingBottom: 10,
  },
  inputContainer: { flex: 1 },
  scrollView: {
    paddingHorizontal: 30,
    paddingBottom: 300,
  },
});
