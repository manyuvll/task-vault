import { subDays, addDays } from "date-fns";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";

import { DAY_WIDTH, Day } from "./day";

import { colors, shadows } from "~/ui/themes";

const DAY_PICKER_RANGE = 30;

const Daypicker = () => {
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState(today);

  const [dates, setDates] = useState<Date[]>([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentMonth, setCurrentMonth] = useState();

  // the current day is at the middle of the range
  // multiplying by the width of each square will move us
  // to today
  const todayScrollOffset = {
    y: 0,
    x: (DAY_PICKER_RANGE / 2) * DAY_WIDTH,
  };

  const getDates = (today: Date) => {
    let current = subDays(today, DAY_PICKER_RANGE / 2);
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
    getDates(today);
  }, []);

  return (
    <ScrollView
      contentOffset={todayScrollOffset}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onScroll={(e) => setScrollPosition(e.nativeEvent.contentOffset.x)}
      style={{
        backgroundColor: colors.white,
        marginHorizontal: 20,
        padding: 6,
        borderRadius: 18,
        flexDirection: "row",
        gap: 4,
        ...shadows.default,
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
  );
};

export { Daypicker };
