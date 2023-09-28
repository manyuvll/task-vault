import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker, PickerIOS } from "@react-native-picker/picker";
import { addYears } from "date-fns";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import {
  Alert,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Toast from "react-native-root-toast";
import uuid from "react-native-uuid";

import { addTask } from "../taskSlice";
import { Task, TaskPriority } from "../types";

import { useBiometricAuth, useBoolean } from "~/core/hooks";
import { useAppDispatch } from "~/core/hooks/useAppDispatch";
import { Button, Input } from "~/ui/core";
import { colors, shadows } from "~/ui/themes";

interface AddTaskForm {
  label: string;
  priority: TaskPriority;
  date: Date;
}

export const Add = () => {
  const [isBiometricAvailable, bioAuth] = useBiometricAuth();
  const [modalVisible, setModalVisible] = useBoolean(false);

  const router = useRouter();
  const today = useRef(new Date());
  const defaultValues = useRef<AddTaskForm>({
    label: "",
    priority: "medium",
    date: new Date(),
  });
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddTaskForm>({
    defaultValues: defaultValues.current,
  });
  const label = useWatch({ control, name: "label" });

  const resetForm = () => {
    reset(defaultValues.current);
  };

  const onSubmit = (submittedTask: AddTaskForm) => {
    const task: Task = {
      ...submittedTask,
      id: uuid.v4().toString(),
      date: submittedTask.date.toISOString(),
      completed: false,
    };
    try {
      setModalVisible.off();
      if (!isBiometricAvailable) {
        // show a helper message
        Toast.show("Device biometrics not working correctly.", {
          duration: Toast.durations.LONG,
        });
        // no need to go at the next action
        return;
      }
      bioAuth().then((auth) => {
        if (auth.success) {
          dispatch(addTask(task));
          router.push("task/list");
          // reset form after redirect
          resetForm();
        } else {
          Toast.show("No permissions to perform this action.");
        }
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      Toast.show("Error during the creation");
    }
  };

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
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
              required
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

        <Modal
          animationType="slide"
          transparent
          visible={modalVisible}
          onRequestClose={setModalVisible.toggle}
        >
          <View style={style.modalView}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <DateTimePicker
                  value={value}
                  mode="date"
                  display={Platform.OS === "ios" ? "inline" : "default"}
                  onChange={(_event, date) => {
                    onChange(date);
                  }}
                  style={{ flex: 1 }}
                  maximumDate={addYears(today.current, 3)}
                  minimumDate={today.current}
                />
              )}
              name="date"
            />

            <View style={style.modalActionContainer}>
              <Button
                title="Cancel"
                variant="error"
                onPress={setModalVisible.off}
              />
              <Button
                title="Create"
                onPress={handleSubmit(onSubmit)}
                rightIcon={
                  <Ionicons
                    name="calendar-outline"
                    size={16}
                    color={colors.white}
                  />
                }
              />
            </View>
          </View>
        </Modal>

        <Button
          title="When?"
          disabled={!label}
          onPress={setModalVisible.on}
          rightIcon={
            <Ionicons name="calendar-outline" size={16} color={colors.white} />
          }
        />
      </View>
    </ScrollView>
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
  modalView: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: colors.indigo[500],
    ...shadows.default,
    elevation: 5,
    minHeight: 600,
  },
  calendar: {
    flex: 1,
  },
  modalActionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
