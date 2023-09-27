import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { addYears } from "date-fns";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Platform, StyleSheet, View } from "react-native";

import { Button, Input, colors } from "~/ui";

interface AddTaskForm {
  label: string;
  description: string;
  date: Date;
}

export const Add = () => {
  const today = new Date();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddTaskForm>({
    defaultValues: {
      label: "",
      description: "",
      date: today,
    },
  });
  const onSubmit = (data: AddTaskForm) => {
    console.log("test");
    console.log(data);
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
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Task description"
            placeholder="Add a description"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            editable
            multiline
            numberOfLines={14}
            requiredMessage={errors.description ? "This is required." : null}
          />
        )}
        name="description"
      />

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <DateTimePicker
            value={value || today}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onChange}
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
    gap: 10,
    padding: 40,
    backgroundColor: colors.white,
  },
  input: {},
});
