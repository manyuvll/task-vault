import { TaskPriority } from "./types";

import { colors } from "~/ui";

export const priorityToColor = (priority: TaskPriority | undefined) => {
  switch (priority) {
    case "low":
      return colors.green[400];
    case "medium":
      return colors.indigo[400];
    case "high":
      return colors.red[400];
    default:
      return colors.slate[400];
  }
};
