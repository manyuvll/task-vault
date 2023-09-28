import { format, isWeekend, isSameDay, getDate } from "date-fns";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { DayProps } from "./types";

import { colors, shadows } from "~/ui/themes";

export const DAY_WIDTH = 50;

const Day = ({ date, selected, onSelectDate }: DayProps) => {
  // compare and check if selected
  const isSelected = isSameDay(selected, date);

  return (
    <TouchableOpacity
      onPress={() => onSelectDate(date)}
      style={styles(isSelected).container}
    >
      <Text style={styles(isSelected, isWeekend(date)).dayName}>
        {format(date, "iii")}
      </Text>
      <Text style={styles(isSelected).dayNumber}>{getDate(date)}</Text>
    </TouchableOpacity>
  );
};

export { Day };

const styles = (isSelected: boolean, isWeekend?: boolean) =>
  StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      height: 70,
      width: DAY_WIDTH,
      borderRadius: 16,
      marginHorizontal: 4,
      gap: 6,
      backgroundColor: isSelected ? colors.indigo[500] : colors.blue[50],
      zIndex: 4,
      shadowColor: colors.indigo[500],
      ...shadows[isSelected ? "default" : "elevated"],
    },
    dayName: {
      color: isSelected
        ? colors.white
        : isWeekend
        ? colors.red[400]
        : colors.slate[400],
      fontWeight: "600",
      fontSize: 12,
    },
    dayNumber: {
      color: isSelected ? colors.white : colors.slate[900],
      fontWeight: "600",
      fontSize: 26,
    },
  });
