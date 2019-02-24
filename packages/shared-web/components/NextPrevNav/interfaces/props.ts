import { MdxNode } from "@df/multichannel-app-shared/interfaces/markdown";

export interface NextPrevNavProps {
  style?: {
    [key: string]: string;
  };
  next?: MdxNode;
  prev?: MdxNode;
}
