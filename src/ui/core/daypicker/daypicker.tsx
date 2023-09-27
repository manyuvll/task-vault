import React, { useMemo, useRef, useState } from "react";
import { ScrollView, Text, View } from "react-native";

import { DAY_WIDTH, Day } from "./day";
import {
  formatMonth,
  generateDayPickerRange,
  getFirstDayInRange,
} from "./helpers";
import { DayPickerProps } from "./types";

import { text } from "~/ui/themes";

const Daypicker = ({ value, onChange }: DayPickerProps) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  // using ref since these are supposed to not change or
  // retrigger rerenderings
  const dateRanges = useRef(generateDayPickerRange());
  const firstDayInRange = useRef(getFirstDayInRange());

  const getCurrentScrolledMonth = useMemo(
    () => formatMonth(firstDayInRange.current, scrollPosition, DAY_WIDTH),
    [scrollPosition],
  );

  // the current day is at the middle of the range
  // multiplying by the width of each square will move us
  // to today
  const todayScrollOffset = {
    y: 0,
    x: (dateRanges.current.length / 2) * DAY_WIDTH,
  };

  return (
    <View style={{ alignItems: "center", gap: 4 }}>
      <Text style={text.heading}>{getCurrentScrolledMonth}</Text>
      <ScrollView
        contentOffset={todayScrollOffset}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={100}
        onScroll={(e) => setScrollPosition(e.nativeEvent.contentOffset.x)}
        style={{
          // backgroundColor: colors.white,
          padding: 6,
          borderRadius: 18,
          flexDirection: "row",
          gap: 10,
          overflow: "visible",
          // ...shadows.default,
        }}
      >
        {dateRanges.current.map((date) => (
          <Day
            key={date.toString()}
            selected={value}
            date={date}
            onSelectDate={onChange}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export { Daypicker };
