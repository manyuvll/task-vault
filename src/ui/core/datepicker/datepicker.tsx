import Ionicons from "@expo/vector-icons/Ionicons";
import RNDateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useEffect } from "react";
import { Modal, View, Platform, StyleSheet } from "react-native";

import { Button } from "../button";

import { colors, shadows } from "~/ui/themes";

export const Datepicker = ({
  value,
  visible,
  saveLabel,
  cancelLabel,
  maximumDate,
  minimumDate,
  onChange,
  onRequestClose,
  onClose,
  onSave,
}: {
  value: Date;
  visible: boolean;
  saveLabel?: string;
  cancelLabel?: string;
  maximumDate: Date;
  minimumDate: Date;
  onRequestClose: () => void;
  onChange: (date: Date | undefined) => void;
  onClose: () => void;
  onSave: () => void;
}) => {
  // android is a bit more complicated
  // this follows best practices of the doc
  // https://github.com/react-native-datetimepicker/datetimepicker#android-imperative-api
  useEffect(() => {
    if (Platform.OS === "ios") return;

    const handleOnChange = (
      event: DateTimePickerEvent,
      date?: Date | undefined,
    ) => {
      switch (event.type) {
        // if cancel button pressed
        case "dismissed": {
          DateTimePickerAndroid.dismiss("date");
          onClose();
          break;
        }
        // if ok button pressed
        case "set": {
          onChange(date);
          onSave();
          break;
        }
        default: {
          onClose();
        }
      }
    };
    if (visible) {
      DateTimePickerAndroid.open({
        style: { backgroundColor: "red" },
        value,
        mode: "date",
        display: "default",
        onChange: handleOnChange,
        maximumDate,
        minimumDate,
      });
    }
  }, [visible]);

  if (Platform.OS === "android") return null;

  return (
    // create a modal to save space on iphone 8 and similar.
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <View style={styles.modalView}>
        <RNDateTimePicker
          value={value}
          mode="date"
          display={Platform.OS === "ios" ? "inline" : "default"}
          onChange={(_event, date) => {
            onChange(date);
          }}
          style={styles.calendar}
          maximumDate={maximumDate}
          minimumDate={minimumDate}
        />
        <View style={styles.modalActionContainer}>
          <View>
            <Button title="Cancel" variant="error" onPress={onClose} />
          </View>
          <View>
            <Button
              title={saveLabel || "Save"}
              onPress={onSave}
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
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    flex: 5,
  },
  modalActionContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
});
