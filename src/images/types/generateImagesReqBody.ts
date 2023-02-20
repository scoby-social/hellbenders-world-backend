import { LayersToGenerate } from "./layersToGenerate";

export interface GenerateImagesReqBody {
  selectedLayers: LayersToGenerate[];
  name: string;
}
