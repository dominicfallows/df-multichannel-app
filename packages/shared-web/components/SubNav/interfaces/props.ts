export interface SubNavItem {
  to: string;
  title: string;
}

export interface SubNavProps {
  items: SubNavItem[];
  style?: {
    [key: string]: string;
  };
}
