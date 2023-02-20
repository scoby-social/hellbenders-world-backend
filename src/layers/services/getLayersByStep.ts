import { LayerType } from "../entities/layer-type.enum";
import { Layer } from "../entities/layer.entity";
import { getLayers } from "../repositories/getLayers";

const STEPS = [
  [LayerType.BACKGROUND],
  [LayerType.MALE_BODY, LayerType.FEMALE_BODY],
  [LayerType.HAIR],
  [LayerType.EYES],
  [LayerType.MOUTH],
  [LayerType.BEARD],
  [LayerType.HAT],
  [LayerType.HELMET],
  [LayerType.MASK],
  [LayerType.LASERS],
  [LayerType.MALE_SHIRT, LayerType.FEMALE_TOP],
  [LayerType.MALE_JACKET, LayerType.FEMALE_JACKET],
  [LayerType.ACCESORY],
];

const bodyTypeInGender = ["MALE", "FEMALE"];

export async function getLayersByStep(
  stepNumber: number,
  bodyType: number
): Promise<Layer[]> {
  const body = bodyTypeInGender[bodyType];

  const layerTypes = filterLayerStepsByIdxAndBody(stepNumber, body);

  return getLayers(layerTypes);
}

function filterLayerStepsByIdxAndBody(
  idx: number,
  bodyType: string
): LayerType[] {
  if (idx > 1) {
    return STEPS[idx].filter(
      (value) =>
        value.toString().split("_")[0] === bodyType ||
        (!value.toString().includes(bodyTypeInGender[1]) &&
          !value.toString().includes(bodyTypeInGender[0]))
    );
  }

  return STEPS[idx];
}
