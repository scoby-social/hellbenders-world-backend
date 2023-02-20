import { db } from "../../config/mongoClient";
import { LayerType } from "../entities/layer-type.enum";
import { Layer } from "../entities/layer.entity";

export async function getLayers(layerTypes: LayerType[]): Promise<Layer[]> {
  const photoBoothLayersCollection = db.collection<Layer>("photoBoothLayers");

  const query = { type: { $in: [...layerTypes] } };

  const layers = await photoBoothLayersCollection.find(query).toArray();

  return layers;
}
