import { colors } from "~/ui";

export interface Theme {
  colors: keyof typeof colors;
  secondaryColor: string;
  fontFamily: string;
}
