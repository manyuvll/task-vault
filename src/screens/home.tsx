import { isSameDay } from "date-fns";
import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { TaskItem } from "./task/taskItem";

import { useAppSelector } from "~/core";
import { Daypicker, colors } from "~/ui";
import { NoData } from "~/ui/core/noData";

export const Home = () => {
  const taskList = useAppSelector((state) => state.taskList);
  const [selectedDay, setSelectedDay] = useState(new Date());

  // return the completed and todo tasks
  // for the current day on DayPicker
  const currentDayTasks = useMemo(() => {
    const todayTasks = taskList.filter((task) =>
      isSameDay(new Date(task.date), selectedDay),
    );

    return {
      // since it's daily I preferred
      // to make a easier to read code
      // than a single (more complex) loop
      completed: todayTasks.filter((task) => task.completed),
      todo: todayTasks.filter((task) => !task.completed),
    };
  }, [taskList, selectedDay]);

  return (
    <View style={styles.container}>
      <Daypicker value={selectedDay} onChange={setSelectedDay} />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>TODO</Text>
          <View style={styles.counterContainer}>
            <Text style={styles.counter}>{currentDayTasks.todo.length}</Text>
          </View>
        </View>
        <View style={styles.taskContainer}>
          {currentDayTasks.todo.length ? (
            currentDayTasks.todo.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))
          ) : (
            <NoData label="Congratulations, you have no tasks to do!" />
          )}
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>COMPLETED</Text>
          <View style={styles.counterContainer}>
            <Text style={styles.counter}>
              {currentDayTasks.completed.length}
            </Text>
          </View>
        </View>
        <View style={styles.taskContainer}>
          {currentDayTasks.completed.length ? (
            currentDayTasks.completed.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))
          ) : (
            <NoData label="No task completed for this day." />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  scrollView: {
    gap: 10,
    paddingHorizontal: 30,
    paddingBottom: 140,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  title: {
    fontWeight: "700",
  },
  counterContainer: {
    padding: 4,
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: colors.white,
  },
  counter: {
    fontWeight: "800",
    color: colors.indigo[500],
  },
  taskContainer: {},
});
