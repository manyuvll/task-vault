import React, { useMemo, useRef, useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";

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
    <View style={styles.container}>
      <Text style={text.heading}>{getCurrentScrolledMonth}</Text>
      <ScrollView
        contentOffset={todayScrollOffset}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={100}
        onScroll={(e) => setScrollPosition(e.nativeEvent.contentOffset.x)}
        style={styles.scrollview}
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

const styles = StyleSheet.create({
  container: { alignItems: "center", gap: 4 },
  scrollview: {
    padding: 6,
    borderRadius: 18,
    flexDirection: "row",
    gap: 10,
    // "visible" on ios will render a better shadow
    // on android will stop scrolling so I set it as scroll
    overflow: Platform.OS === "ios" ? "visible" : "scroll",
  },
});

export { Daypicker };
