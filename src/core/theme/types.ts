import { colors } from "~/ui/themes";

export interface Theme {
  colors: keyof typeof colors;
  secondaryColor: string;
  fontFamily: string;
}
