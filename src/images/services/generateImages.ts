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

  // const combinedImage = await combineImages(layersToCombine);

  // const croppedImage = await cropFakeIDImage(combinedImage, 3100, 3100);

  // const [resizedImage, nftImageURL] = await Promise.all([
  // resizeImageForProfile(croppedImage),
  // uploadNFTImage(`${request.name}.png`, croppedImage),
  // ]);

  // const profileImageURL = await uploadProfileImage(
  // `profile/${request.name}-${new Date().getTime()}.png`,
  // resizedImage
  // );

  return { profileImageURL, nftImageURL };
}
