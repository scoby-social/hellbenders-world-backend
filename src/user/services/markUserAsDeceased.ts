import { deleteShadowDriveFile } from "../../shdw_drive/deleteFile";
import { getUserByID } from "../repositories/getUserByID";
import { deceaseUser } from "../repositories/markUserAsDeceased";

export async function markUserAsDeceased(id: string): Promise<void> {
  await deceaseUser(id);

  const storeAccount = process.env.SHDW_STORE_ACCOUNT!;

  const user = await getUserByID(id);

  const metadataShdwUrl = `https://shdw-drive.genesysgo.net/${storeAccount}/${user.username}.json`;
  const imageShdwUrl = `https://shdw-drive.genesysgo.net/${storeAccount}/${user.username}.png`;

  await Promise.all([
    deleteShadowDriveFile(metadataShdwUrl),
    deleteShadowDriveFile(imageShdwUrl),
  ]);
}
