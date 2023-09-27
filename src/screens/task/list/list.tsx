import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { useAppSelector } from "~/core/hooks/useAppSelector";
import { colors, text } from "~/ui";

export const List = () => {
  const taskList = useAppSelector((state) => state.taskList);

  return (
    <ScrollView style={style().container}>
      {taskList.map((task) => (
        <View style={style().task}>
          <View style={style(task.completed).status} />
          <View style={style().taskBody}>
            <Text style={style().label}>{task.label}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const style = (completed?: boolean) =>
  StyleSheet.create({
    container: {
      height: "100%",
      borderRadius: 30,
      gap: 10,
      padding: 40,
      backgroundColor: colors.white,
    },
    status: {
      height: 10,
      width: 10,
      backgroundColor: completed ? colors.green[300] : colors.red[300],
      borderRadius: 50,
    },
    taskBody: {
      // backgroundColor: colors.white,
      // borderRadius: 12,
      padding: 4,
      marginVertical: 6,
    },
    task: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    label: {
      fontSize: 16,
      lineHeight: 28,
      fontWeight: "700",
      color: colors.slate[900],
    },
    description: {
      fontSize: 15,
      lineHeight: 28,
      fontWeight: "500",
      color: colors.slate[500],
    },
  });
