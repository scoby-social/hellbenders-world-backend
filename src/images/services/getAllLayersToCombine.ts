import { LayerType } from "../../layers/entities/layer-type.enum";
import { getNFTLayers } from "../repositories/getNFTLayers";
import { AllLayersToCombine } from "../types/allLayersToCombine";
import { LayersToGenerate } from "../types/layersToGenerate";

const layersOrder = {
  [LayerType.BACKGROUND]: 0,
  [LayerType.MALE_BODY]: 1,
  [LayerType.FEMALE_BODY]: 1,
  [LayerType.MALE_SHIRT]: 2,
  [LayerType.FEMALE_TOP]: 2,
  [LayerType.MALE_JACKET]: 3,
  [LayerType.FEMALE_JACKET]: 3,
  [LayerType.ACCESORY]: 4,
  [LayerType.HAIR]: 5,
  [LayerType.EYES]: 6,
  [LayerType.MOUTH]: 7,
  [LayerType.BEARD]: 8,
  [LayerType.HAT]: 9,
  [LayerType.HELMET]: 10,
  [LayerType.MASK]: 11,
  [LayerType.LASERS]: 12,
};

export async function getAllLayersToCombine(
  requestLayers: LayersToGenerate[]
): Promise<AllLayersToCombine> {
  const layers = await getNFTLayers(requestLayers);

  const resultingLayers = layers.map((val) => ({
    image: val.image,
    name: val.name,
    type: val.type,
  }));

  resultingLayers.sort((a, b) => {
    if (layersOrder[a.type] > layersOrder[b.type]) return 1;
    if (layersOrder[b.type] > layersOrder[a.type]) return -1;

    return 0;
  });

  return { layers: resultingLayers };
}
