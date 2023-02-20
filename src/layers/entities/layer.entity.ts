import { Exception } from "./exception";
import { LayerType } from "./layer-type.enum";

export interface Layer {
  image: string;
  name: string;
  type: LayerType;
  exceptions: Exception[];
}
