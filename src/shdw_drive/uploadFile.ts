import { Keypair, PublicKey } from "@solana/web3.js";
import crypto from "crypto";
import axios, { AxiosError } from "axios";
import bs58 from "bs58";
import nacl from "tweetnacl";

const SHDW_DRIVE_ENDPOINT = "https://shadow-storage.genesysgo.net";

export async function uploadFile(
  fileName: string,
  file: Buffer
): Promise<string> {
  const shdwDrivePrivateKey = process.env
    .SHDW_DRIVE_ACC_SECRET_KEY!.split(",")
    .map((val) => Number(val));

  const SECRET_KEY_ARR = Keypair.fromSecretKey(
    new Uint8Array(shdwDrivePrivateKey)
  );

  const storageAccount = new PublicKey(process.env.SHDW_STORE_ACCOUNT!);

  const data = new FormData();

  const keypair = SECRET_KEY_ARR;

  const fileBlob = new Blob([file]);

  const owner_storageAccount = new PublicKey(keypair.publicKey);
  const _filename = fileName;
  const fileHashSum = crypto.createHash("sha256");
  const fileNameHashSum = crypto.createHash("sha256");
  fileHashSum.update(file);
  fileNameHashSum.update(_filename);
  const fileNameHash = fileNameHashSum.digest("hex");

  const msg = `Shadow Drive Signed Message:\nStorage Account: ${storageAccount.toString()}\nUpload files with hash: ${fileNameHash}`;
  const encodedMessage = new TextEncoder().encode(msg);
  const signedMessage = nacl.sign.detached(encodedMessage, keypair.secretKey);
  const signature = bs58.encode(signedMessage);

  data.append("file", fileBlob, _filename);
  data.append("fileNames", _filename);
  data.append("message", signature.toString());
  data.append("storage_account", storageAccount.toString());
  data.append("signer", owner_storageAccount.toString());

  return axios
    .post(`${SHDW_DRIVE_ENDPOINT}/upload`, data, {
      maxBodyLength: -1,
      headers: {
        "Content-Type": `multipart/form-data`,
      },
    })
    .then(function (response: any) {
      return response.data.finalized_locations[0];
    })
    .catch(function (error: AxiosError) {
      throw new Error(error.message);
    });
}
