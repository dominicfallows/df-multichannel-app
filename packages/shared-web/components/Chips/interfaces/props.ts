export interface ClickableChipItem {
  to: string;
  title: string;
  label: string;
}

export interface ChipsProps {
  style?: {
    [key: string]: string;
  };
  clickableChips?: ClickableChipItem[];
  chips?: string[];
}
