import { db } from "../../config/mongoClient";
import { Layer } from "../../layers/entities/layer.entity";
import { LayersToGenerate } from "../types/layersToGenerate";

export async function getNFTLayers(data: LayersToGenerate[]): Promise<Layer[]> {
  const nftLayersCollection = db.collection<Layer>("nftLayers");

  const layerTypes = data.map((val) => val.type);
  const layerNames = data.map((val) => val.name);

  const query = { type: { $in: layerTypes }, name: { $in: layerNames } };

  const result = await nftLayersCollection.find(query).toArray();

  return result;
}
