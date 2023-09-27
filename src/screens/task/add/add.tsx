import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { addYears } from "date-fns";
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Platform, StyleSheet, View } from "react-native";
import Toast from "react-native-root-toast";
import uuid from "react-native-uuid";

import { addTask } from "../taskSlice";
import { Task, TaskPriority } from "../types";

import { useAppDispatch } from "~/core/hooks/useAppDispatch";
import { Button, Input } from "~/ui/core";
import { colors } from "~/ui/themes";

interface AddTaskForm {
  label: string;
  priority: TaskPriority;
  date: Date;
}

const DEFAULT_VALUES: AddTaskForm = {
  label: "",
  priority: "medium",
  date: new Date(),
};

export const Add = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const today = new Date();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddTaskForm>({
    defaultValues: DEFAULT_VALUES,
  });

  const resetForm = () => {
    reset(DEFAULT_VALUES);
  };

  const onSubmit = (submittedTask: AddTaskForm) => {
    const task: Task = {
      ...submittedTask,
      id: uuid.v4().toString(),
      date: submittedTask.date.toISOString(),
      completed: false,
    };
    try {
      dispatch(addTask(task));
      router.push("task/list");
      // reset form after redirect
      resetForm();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      Toast.show("Error during the creation");
    }
  };

  return (
    <View style={style.container}>
      <Controller
        control={control}
        rules={{
          required: true,
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Task title"
            placeholder="Add a title"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            requiredMessage={errors.label ? "This is required." : null}
          />
        )}
        name="label"
      />

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <Picker selectedValue={value} onValueChange={onChange}>
            <Picker.Item label="Low Priority" value="low" />
            <Picker.Item label="Medium Priority" value="medium" />
            <Picker.Item label="High Priority" value="high" />
          </Picker>
        )}
        name="priority"
      />

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <DateTimePicker
            value={value}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={(_event, date) => onChange(date)}
            maximumDate={addYears(today, 3)}
            minimumDate={today}
          />
        )}
        name="date"
      />

      <Button
        title="Add"
        onPress={handleSubmit(onSubmit)}
        rightIcon={
          <Ionicons name="paper-plane-outline" size={12} color={colors.white} />
        }
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    height: "100%",
    borderRadius: 30,
    gap: 0,
    padding: 40,
    backgroundColor: colors.white,
  },
  input: {},
});
