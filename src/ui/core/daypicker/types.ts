export interface DayProps {
  date: Date;
  selected: Date;
  onSelectDate: (date: Date) => void;
}

export interface DayPickerProps {
  value: Date;
  onChange: (date: Date) => void;
}
