import { Metaplex } from "@metaplex-foundation/js";
import { Connection, PublicKey } from "@solana/web3.js";

export async function checkIfFakeIDExists(
  fakeIDAddress: string | undefined,
  count = 0
): Promise<boolean> {
  try {
    if (!fakeIDAddress || count === 4) return false;
    await getNFTWithMetadata(fakeIDAddress);
    return true;
  } catch (err) {
    return checkIfFakeIDExists(fakeIDAddress, count + 1);
  }
}

async function getNFTWithMetadata(nftAddress: string) {
  const conn = new Connection(process.env.SOLANA_CLUSTER!);
  const mintAddress = new PublicKey(nftAddress);

  const metaplex = new Metaplex(conn);

  return await metaplex.nfts().findByMint({ mintAddress });
}
