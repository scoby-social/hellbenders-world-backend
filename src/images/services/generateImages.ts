import axios from "axios";

import { GenerateImagesReqBody } from "../types/generateImagesReqBody";
import { ResultingImages } from "../types/resultingImages";
import { getAllLayersToCombine } from "./getAllLayersToCombine";

export async function generateImages(
  request: GenerateImagesReqBody
): Promise<ResultingImages> {
  const layersToCombine = await getAllLayersToCombine(request.selectedLayers);

  const requestBody = {
    name: request.name,
    layers: layersToCombine.layers.map((layer) => layer.image),
  };

  const cloudFunctionToken = process.env.CLOUD_FUNCTION_TOKEN;

  const result = await axios.post(
    process.env.FAKE_ID_CLOUD_FUNCTION_URL!,
    requestBody,
    {
      headers: {
        Authorization: `Bearer ${cloudFunctionToken}`,
      },
    }
  );

  const { profileImageURL, nftImageURL } = result.data;

  return { profileImageURL, nftImageURL };
}
