import { subDays, addDays } from "date-fns";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ScrollView, Text, View } from "react-native";

import { DAY_WIDTH, Day } from "./day";
import { formatMonth } from "./helpers";

import { text } from "~/ui/themes";

const DAY_PICKER_RANGE = 30;

const Daypicker = () => {
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState(today);
  const startOfDaypickerRange = useRef(subDays(today, DAY_PICKER_RANGE / 2));

  const [dates, setDates] = useState<Date[]>([]);
  const [scrollPosition, setScrollPosition] = useState(0);

  const getCurrentScrolledMonth = useMemo(
    () => formatMonth(startOfDaypickerRange.current, scrollPosition, DAY_WIDTH),
    [scrollPosition],
  );

  // the current day is at the middle of the range
  // multiplying by the width of each square will move us
  // to today
  const todayScrollOffset = {
    y: 0,
    x: (DAY_PICKER_RANGE / 2) * DAY_WIDTH,
  };

  const getDates = (today: Date) => {
    let current = today;
    const _dates = [];
    // we add days until we reach the end date we set
    // improvement is to dynamically load next and previous
    // page by page for dynamic and better performances
    for (let i = 1; i <= DAY_PICKER_RANGE; i++) {
      _dates.push(current);
      current = addDays(current, 1);
    }
    setDates(_dates);
  };

  useEffect(() => {
    getDates(startOfDaypickerRange.current);
  }, []);

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
        {dates.map((date) => (
          <Day
            key={date.toString()}
            selected={selectedDay}
            date={date}
            onSelectDate={setSelectedDay}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export { Daypicker };
