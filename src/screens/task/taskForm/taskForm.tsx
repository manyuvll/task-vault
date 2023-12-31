import Ionicons from "@expo/vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import { addYears } from "date-fns";
import { useGlobalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Controller, FieldError, useForm, useWatch } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Toast from "react-native-root-toast";
import uuid from "react-native-uuid";

import { addTask, editTask } from "../taskSlice";
import { Task, TaskFormProps } from "../types";

import { useBiometricAuth, useBoolean } from "~/core/hooks";
import { useAppDispatch } from "~/core/hooks/useAppDispatch";
import { Button, Datepicker, Input } from "~/ui/core";
import { colors } from "~/ui/themes";

export const TaskForm = () => {
  const [bioAuthInfo, bioAuth] = useBiometricAuth();
  const [modalVisible, setModalVisible] = useBoolean(false);
  const params = useGlobalSearchParams();
  const taskToEdit = useRef<Task | null>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const today = useRef(new Date());
  const defaultValues = useRef<TaskFormProps>({
    label: "",
    priority: "medium",
    date: new Date(),
  });

  // init form
  useEffect(() => {
    // If we have a task in param
    // initialize form since it's edit
    if (params.task) {
      // Parse JSON data from 'params.task' and ensure it's of type 'Task'
      taskToEdit.current = JSON.parse(params.task as string) as Task;
      // Create a new object with the parsed data and convert the 'date' property to a Date object
      const editedTask: TaskFormProps = {
        ...taskToEdit.current,
        date: new Date(taskToEdit.current.date),
      };

      // Reset the form with the edited task
      resetForm(editedTask);
    } else {
      taskToEdit.current = null;
      // else create a new one
      resetForm();
    }
  }, [params]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormProps>({ mode: "onChange" });

  const label = useWatch({ control, name: "label" });

  const resetForm = (task?: TaskFormProps) => {
    reset(task || defaultValues.current);
  };

  const handleBiometricsUnavailable = () => {
    // Show a message for biometrics issue
    Toast.show("Device biometrics not working correctly.", {
      duration: Toast.durations.LONG,
    });
  };

  const handleAuthenticationFailure = () => {
    // Show a message if biometric authentication fails
    Toast.show("No permissions to perform this action.");
  };

  const handleTaskEdit = (task: Task) => {
    // Dispatch an action to edit the task
    dispatch(editTask(task));
  };

  const handleTaskAdd = (task: Task) => {
    // Dispatch an action to add a new task
    dispatch(addTask(task));
  };

  const redirectToTaskList = () => {
    // Redirect to the task list
    router.push("task/list");
  };

  const onSubmit = (submittedTask: TaskFormProps) => {
    try {
      // Close the modal if it's open
      setModalVisible.off();

      // Check if device biometrics are available
      if (!bioAuthInfo.isAvailable) {
        handleBiometricsUnavailable();
        return;
      }

      // Perform biometric authentication
      bioAuth().then((auth) => {
        if (!auth.success) {
          handleAuthenticationFailure();
          return;
        }

        // Create a Task object with properties from the submitted form data
        if (taskToEdit.current) {
          const task: Task = {
            ...taskToEdit.current,
            ...submittedTask,
            date: submittedTask.date.toISOString(),
          };
          handleTaskEdit(task);
        } else {
          const task: Task = {
            ...submittedTask,
            id: uuid.v4().toString(),
            date: submittedTask.date.toISOString(),
            completed: false,
          };
          handleTaskAdd(task);
        }

        // Redirect to the task list after adding/editing the task
        redirectToTaskList();

        // Reset after the redirect
        resetForm();
        taskToEdit.current = null;
      });
    } catch (err) {
      console.log(err);
      // Show an error message in case of any unexpected errors
      Toast.show("Error, try again.");
    }
  };

  const getInputErrorMessage = (error: FieldError) => {
    switch (error.type) {
      case "maxLength":
        return "30 characters maximum.";
      default:
        return "This field is required.";
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <Controller
          control={control}
          rules={{
            required: true,
            maxLength: 30,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Task title"
              placeholder="Add a title"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              required
              requiredMessage={
                errors.label ? getInputErrorMessage(errors.label) : null
              }
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
            <Datepicker
              value={value || new Date()}
              onRequestClose={setModalVisible.off}
              visible={modalVisible}
              onChange={onChange}
              maximumDate={addYears(today.current, 3)}
              minimumDate={today.current}
              onClose={setModalVisible.off}
              onSave={handleSubmit(onSubmit)}
              saveLabel={taskToEdit.current ? "Edit" : "Create"}
            />
          )}
          name="date"
        />

        <Button
          title="When?"
          disabled={!label || Boolean(errors.label)}
          onPress={setModalVisible.on}
          rightIcon={
            <Ionicons name="calendar-outline" size={16} color={colors.white} />
          }
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: { paddingBottom: 100 },
  container: {
    height: "100%",
    borderRadius: 30,
    gap: 0,
    padding: 40,
    backgroundColor: colors.white,
  },
});
