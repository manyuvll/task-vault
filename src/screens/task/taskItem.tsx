import { format } from "date-fns";
import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { priorityToColor } from "./helpers";
import { toggleCompletedTask } from "./taskSlice";
import { Task, TaskPriority } from "./types";

import { useAppDispatch } from "~/core";
import { colors } from "~/ui";

export const TaskItem = ({ task }: { task: Task }) => {
  const [isChecked, setChecked] = useState(task.completed);
  const dispatch = useAppDispatch();

  const handleOnToggle = (taskId: string) => () => {
    setChecked((prev) => !prev);
    dispatch(toggleCompletedTask(taskId));
  };

  return (
    <View style={style().task}>
      <View style={style().taskBody}>
        <Checkbox
          value={isChecked}
          onValueChange={handleOnToggle(task.id)}
          color={colors.indigo[500]}
        />
        <View>
          <Text style={style(task.completed).label}>{task.label}</Text>
          <Text style={style().date}>
            {format(new Date(task.date), "yy MMM d")}
          </Text>
        </View>
      </View>
      <View style={style(task.completed, task.priority).status} />
    </View>
  );
};

const style = (completed?: boolean, priority?: TaskPriority) =>
  StyleSheet.create({
    task: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: colors.white,
      borderRadius: 8,
      padding: 4,
      margin: 3,
      paddingHorizontal: 13,
    },
    taskBody: {
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
    },
    label: {
      fontSize: 16,
      lineHeight: 28,
      fontWeight: "700",
      textDecorationLine: completed ? "line-through" : "none",
      color: completed ? colors.slate[400] : colors.slate[900],
    },
    date: {
      fontSize: 10,
      fontWeight: "700",
      color: colors.slate[500],
    },
    status: {
      height: 10,
      width: 10,
      backgroundColor: priorityToColor(priority),
      borderRadius: 50,
      marginHorizontal: 5,
    },
  });
