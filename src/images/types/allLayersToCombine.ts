import { LayerType } from "../../layers/entities/layer-type.enum";

export interface AllLayersToCombine {
  layers: LayerToCombine[];
}

export interface LayerToCombine {
  image: string;
  name: string;
  type: LayerType;
}
