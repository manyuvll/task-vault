import { useState } from "react";

const useBoolean = (
  initialValue: boolean = false,
): [
  boolean,
  {
    on: () => void;
    off: () => void;
    toggle: () => void;
  },
] => {
  const [flag, setFlag] = useState(initialValue);

  const on = () => {
    setFlag(true);
  };

  const off = () => {
    setFlag(false);
  };

  const toggle = () => {
    setFlag((prev) => !prev);
  };

  return [flag, { on, off, toggle }];
};

export { useBoolean };
