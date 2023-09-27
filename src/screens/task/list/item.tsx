import { format } from "date-fns";
import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { toggleCompletedTask } from "../taskSlice";
import { Task } from "../types";

import { useAppDispatch } from "~/core";
import { colors } from "~/ui";

export const Item = ({ task }: { task: Task }) => {
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
          <Text style={style().label}>{task.label}</Text>
          <Text style={style().date}>
            {format(new Date(task.date), "yy MMM d")}
          </Text>
        </View>
      </View>
      <View style={style(task.completed).status} />
    </View>
  );
};

const style = (completed?: boolean) =>
  StyleSheet.create({
    task: {
      backgroundColor: colors.white,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
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
      color: colors.slate[900],
    },
    date: {
      fontSize: 10,
      fontWeight: "700",
      color: colors.slate[500],
    },
    status: {
      height: 10,
      width: 10,
      backgroundColor: completed ? colors.green[300] : colors.red[300],
      borderRadius: 50,
      marginHorizontal: 5,
    },
  });
