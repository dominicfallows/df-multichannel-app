export interface ClickableChipItem {
  to: string;
  title: string;
  label: string;
}

export interface ChipsProps {
  clickableChips?: ClickableChipItem[];
  chips?: string[];
}
