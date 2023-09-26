import { format, isWeekend, isSameDay, getDate } from "date-fns";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

import { colors } from "~/ui/themes";

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
        height: 50,
        width: DAY_WIDTH,
        borderRadius: 8,
        backgroundColor: isSelected ? colors.indigo[500] : colors.white,
      }}
    >
      <Text
        style={{
          color: isSelected
            ? colors.white
            : isWeekend(date)
            ? colors.red[500]
            : colors.slate[900],
          fontWeight: "600",
        }}
      >
        {format(date, "iii")}
      </Text>
      <Text
        style={{
          color: isSelected ? colors.white : colors.slate[900],
          fontWeight: "600",
        }}
      >
        {getDate(date)}
      </Text>
    </TouchableOpacity>
  );
};

export { Day };
