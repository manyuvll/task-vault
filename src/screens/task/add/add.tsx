import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { addYears } from "date-fns";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Platform, StyleSheet, Text, View } from "react-native";
import uuid from "react-native-uuid";

import { addTask } from "../taskSlice";
import { Task } from "../types";

import { useAppDispatch } from "~/core/hooks/useAppDispatch";
import { Button, Input, colors } from "~/ui";

interface AddTaskForm {
  label: string;
  description: string;
  date: Date;
}

export const Add = () => {
  const dispatch = useAppDispatch();

  const today = new Date();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddTaskForm>({
    defaultValues: {
      label: "",
      date: new Date(),
    },
  });
  const onSubmit = (submittedTask: AddTaskForm) => {
    const task: Task = {
      ...submittedTask,
      id: uuid.v4().toString(),
      date: submittedTask.date.toISOString(),
      completed: false,
    };
    dispatch(addTask(task));
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
          <>
            <Text>{value.toISOString()}</Text>
            <DateTimePicker
              value={value}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(_event, date) => onChange(date)}
              maximumDate={addYears(today, 3)}
              minimumDate={today}
            />
          </>
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
    gap: 10,
    padding: 40,
    backgroundColor: colors.white,
  },
  input: {},
});
