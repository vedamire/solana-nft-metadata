import { getMeta } from './lib';
import { BinaryReader, BinaryWriter } from 'borsh';
import { PublicKey } from '@solana/web3.js';
import base58 from 'bs58';
import { StringPublicKey, MetadataByMint } from './arweave.model';

(() => {
  // https://www.npmjs.com/package/borsh
  // Extend Borsh function for read/write pubkey
  (BinaryReader.prototype as any).readPubkey = function () {
    const reader = this as unknown as BinaryReader;
    const array = reader.readFixedArray(32);
    return new PublicKey(array);
  };

  (BinaryWriter.prototype as any).writePubkey = function (value: any) {
    const writer = this as unknown as BinaryWriter;
    writer.writeFixedArray(value.toBuffer());
  };

  (BinaryReader.prototype as any).readPubkeyAsString = function () {
    const reader = this as unknown as BinaryReader;
    const array = reader.readFixedArray(32);
    return base58.encode(array) as StringPublicKey;
  };

  (BinaryWriter.prototype as any).writePubkeyAsString = function (
    value: StringPublicKey,
  ) {
    const writer = this as unknown as BinaryWriter;
    writer.writeFixedArray(base58.decode(value));
  };
})();

export const getArweaveMetadataByMint = async (
  tokenMints: string[],
  endpoint: string
): Promise<MetadataByMint> => {
  const rawMeta = await getMeta(tokenMints, endpoint);

  const metadataByMint =
    rawMeta?.reduce((acc, { mint, metadata }) => {
      acc[mint] = metadata;
      return acc;
    }, {}) || {};

  return metadataByMint as MetadataByMint;
};
