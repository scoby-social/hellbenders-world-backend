import { LayerType } from "./layer-type.enum";

export interface Exception {
  type: LayerType | "*";
  items: string[] | "*";
  reverse: boolean;
}
