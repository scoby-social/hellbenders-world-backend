import { Db, MongoClient } from "mongodb";

let client: MongoClient;

export let db: Db;

export function initializeMongoDB() {
  const uri = process.env.MONGO_DB_URI!;

  client = new MongoClient(uri, {
    retryWrites: true,
    connectTimeoutMS: 5000,
    keepAlive: true,
  });

  db = client.db("hellbenders");

  db.listCollections()
    .toArray()
    .then((val) => {
      const hasUser = !!val.find((collection) => collection.name === "users");
      const hasLayers = !!val.find(
        (collection) => collection.name === "nftLayers"
      );
      const hasPhotoBoothLayers = !!val.find(
        (collection) => collection.name === "photoBoothLayers"
      );

      if (!hasUser) {
        db.createCollection("users", {
          collation: { locale: "en", strength: 2 },
        });
      }

      if (!hasLayers) {
        db.createCollection("nftLayers");
      }

      if (!hasPhotoBoothLayers) {
        db.createCollection("photoBoothLayers");
      }
    });

  console.log("MongoDB successfully connected");
}
