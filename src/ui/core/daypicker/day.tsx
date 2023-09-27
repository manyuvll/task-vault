import { format, isWeekend, isSameDay, getDate } from "date-fns";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

import { colors, shadows } from "~/ui/themes";

export const DAY_WIDTH = 50;

const Day = ({
  date,
  selected,
  onSelectDate,
}: {
  date: Date;
  selected: Date;
  onSelectDate: (date: Date) => void;
}) => {
  // compare and check if selected
  const isSelected = isSameDay(selected, date);

  return (
    <TouchableOpacity
      onPress={() => onSelectDate(date)}
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: 70,
        width: DAY_WIDTH,
        borderRadius: 16,
        marginHorizontal: 4,
        gap: 6,
        backgroundColor: isSelected ? colors.indigo[500] : colors.blue[50],
        shadowColor: colors.indigo[500],
        ...shadows.elevated,
      }}
    >
      <Text
        style={{
          color: isSelected
            ? colors.white
            : isWeekend(date)
            ? colors.red[400]
            : colors.slate[400],
          fontWeight: "600",
          fontSize: 12,
        }}
      >
        {format(date, "iii")}
      </Text>
      <Text
        style={{
          color: isSelected ? colors.white : colors.slate[900],
          fontWeight: "600",
          fontSize: 26,
        }}
      >
        {getDate(date)}
      </Text>
    </TouchableOpacity>
  );
};

export { Day };
