import {
  Connection,
  Keypair,
  Account,
  SYSVAR_RENT_PUBKEY,
  sendAndConfirmTransaction,
  SYSVAR_CLOCK_PUBKEY,
  SystemProgram,
  Transaction,
  TransactionInstruction,
  PublicKey,
} from '@solana/web3.js';
import {
  AccountLayout,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  MintLayout,
  Token,
  TOKEN_PROGRAM_ID,
  AccountInfo,
} from '@solana/spl-token';
// import urlExist from "url-exist"
import urlExistsRaw from "url-exists"

// const urlExist = require('url-exist')


const fetch = require('node-fetch');

import { createMetadata, createMasterEdition, Data, Creator,  updateMetadata } from './metadata2'
import { StringPublicKey, AccountAndPubkey } from './processMetaData'
import { processMetaData } from './metadata2'


import { exists, readFileSync } from 'fs';
import * as BufferLayout from 'buffer-layout';
// import BN from "bn.js";
const BN = require('bn.js');
//
/**
 * Layout for a public key
 */
const publicKey = (property = 'publicKey') => {
  return BufferLayout.blob(32, property);
};

/**
 * Layout for a 64bit unsigned value
 */

const fixed_sized_string = (property = 'fixed_sized_string', length) => {
  return BufferLayout.blob(length, property);
};

const uint64 = (property = 'uint64') => {
  return BufferLayout.blob(8, property);
};

function readKeypairFromPath(path: string): Keypair {
  const data = JSON.parse(readFileSync(path, 'utf-8'));
  return Keypair.fromSecretKey(Buffer.from(data));
}

interface ApiDependencies {
  connection: Connection;
}

async function createTokenMetadata(
  data: Data,
  updateAuthority: PublicKey,
  mintKey: PublicKey,
  mintAuthorityKey: PublicKey,
  payer: PublicKey,

  sendTxn: (transaction: Transaction) => Promise<void>,
  // { connection }: ApiDependencies,
) {

  const instructions = []

  const metadataAccount = await createMetadata(
    data,
    updateAuthority,
    mintKey,
    mintAuthorityKey,
    instructions,
    
    payer,
  );

  const txMeta = new Transaction().add(
    instructions[0]
  );

  void await sendTxn(txMeta)
}


async function getLargestTokenAccountOwnerByMint(mintPubKey:PublicKey, {connection}) {
  const largestAccounts = (
    await connection.getTokenLargestAccounts(mintPubKey, "processed")
  ).value;
  const largestTokenAccountPubkey = largestAccounts[0].address;
  const largestTokenAccountInfo = await connection.getAccountInfo(largestTokenAccountPubkey, "processed")
  const decoded = decodedTokenBuffersToUI(AccountLayout.decode(largestTokenAccountInfo.data), largestTokenAccountPubkey);

  return decoded.owner
}

async function getTokenAddressFromMintAndUser(userAddress: String, mintAddress: String): Promise<PublicKey> {
  return findAssociatedTokenAddress(new PublicKey(userAddress), new PublicKey(mintAddress));
}

function decodedTokenBuffersToUI(decodedTokenState, tokenAddress: PublicKey): TokenView {
  return {
    tokenAccountPubkey: tokenAddress.toBase58(),
    mint: new PublicKey(decodedTokenState.mint).toBase58(),
    owner: new PublicKey(decodedTokenState.owner).toBase58(),
    amount: new BN(decodedTokenState.amount, 10, 'le').toNumber(),
    delegateOption: !!decodedTokenState.delegateOption,
    delegate: new PublicKey(decodedTokenState.delegate).toBase58(),
    state: !!decodedTokenState.state,
    isNativeOption: !!decodedTokenState.isNativeOption,
    isNative: new BN(decodedTokenState.isNative, 10, 'le').toNumber(),
    delegatedAmount: new BN(decodedTokenState.delegatedAmount, 10, 'le').toNumber(),
    closeAuthorityOption: !!decodedTokenState.closeAuthorityOption,
    closeAuthority: new PublicKey(decodedTokenState.closeAuthority).toBase58(),
  };
}

async function getAllUserTokens(
  userPublicKey: PublicKey,
  { connection }: ApiDependencies,
): Promise<TokenView[]> {
  const tokenAccounts = (
    await connection.getTokenAccountsByOwner(userPublicKey, { programId: TOKEN_PROGRAM_ID }, 'singleGossip')
  ).value;
  const parsedAddresses = tokenAccounts.map((tokenAccount) =>
    decodedTokenBuffersToUI(AccountLayout.decode(tokenAccount.account.data), tokenAccount.pubkey),
  ).filter(token => token.amount > 0);


  return parsedAddresses;
}

async function uploadFileToArweave(fileData: String | Uint8Array | ArrayBuffer, contentType: String, key: any ) {
  const Arweave = require('arweave');
  const arweave = Arweave.init({
    host: 'arweave.net',// Hostname or IP address for a Arweave host
    port: 443,          // Port
    protocol: 'https',  // Network protocol http or https
    timeout: 20000,     // Network request timeouts in milliseconds
    logging: false,     // Enable network request logging
  }
  );
  const uploadingTxn = await arweave.createTransaction({
    data: fileData,
  }, key);

  uploadingTxn.addTag('Content-Type', contentType);

  void await arweave.transactions.sign(uploadingTxn, key);
  const response = await arweave.transactions.post(uploadingTxn);

  console.log(response.status);
    // console.log('imageUploading: ', imageUploadingTxn)


  const arweavePath = 'https://www.arweave.net/'

  // console.log('IMAGE URL: ', arweavePath + imageUploadingTxn.id)
  return { status: response.status, url: arweavePath + uploadingTxn.id, id: uploadingTxn.id }
}

async function getProgramAccounts(
  connection: Connection,
  programId: StringPublicKey,
  configOrCommitment?: any,
): Promise<Array<AccountAndPubkey>> {
  const extra: any = {};
  let commitment;
  //let encoding;

  if (configOrCommitment) {
    if (typeof configOrCommitment === 'string') {
      commitment = configOrCommitment;
    } else {
      commitment = configOrCommitment.commitment;
      //encoding = configOrCommitment.encoding;

      if (configOrCommitment.dataSlice) {
        extra.dataSlice = configOrCommitment.dataSlice;
      }

      if (configOrCommitment.filters) {
        extra.filters = configOrCommitment.filters;
      }
    }
  }

  const args = connection._buildArgs([programId], commitment, 'base64', extra);
  const unsafeRes = await (connection as any)._rpcRequest(
    'getProgramAccounts',
    args,
  );

  const data = (
    unsafeRes.result as Array<{
      account: any;
      pubkey: string;
    }>
  ).map(item => {
    return {
      account: {
        // TODO: possible delay parsing could be added here
        data: Buffer.from(item.account.data[0], 'base64'),
        executable: item.account.executable,
        lamports: item.account.lamports,
        // TODO: maybe we can do it in lazy way? or just use string
        owner: item.account.owner,
      } as any,
      pubkey: item.pubkey,
    };
  });

  return data;
}

const MAX_NAME_LENGTH = 32;

const MAX_SYMBOL_LENGTH = 10;

const MAX_URI_LENGTH = 200;

const MAX_CREATOR_LIMIT = 5;

const MAX_CREATOR_LEN = 32 + 1 + 1;
const MAX_METADATA_LEN =
1 +
32 +
32 +
MAX_NAME_LENGTH +
MAX_SYMBOL_LENGTH +
MAX_URI_LENGTH +
MAX_CREATOR_LIMIT * MAX_CREATOR_LEN +
2 +
1 +
1 +
198;

async function getCreatorsMetadataTokens(creatorPubKey: PublicKey, {connection}: ApiDependencies) {

  const allMetaAccount = await connection.getProgramAccounts(new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'), {
  filters: [
      {
        memcmp: {
          offset:
            1 + // key
            32 + // update auth
            32 + // mint
            4 + // name string length
            MAX_NAME_LENGTH + // name
            4 + // uri string length
            MAX_URI_LENGTH + // uri
            4 + // symbol string length
            MAX_SYMBOL_LENGTH + // symbol
            2 + // seller fee basis points
            1 + // whether or not there is a creators vec
            4 + // creators vec length
            0 * MAX_CREATOR_LEN,
          bytes: creatorPubKey.toBase58(),
        },
      },
    ],
})

  const parsedObj = { metadataByMint: [], editions: [], masterEditions: [],
     masterEditionsByPrintingMint: [], masterEditionsByOneTimeAuthMint: [] }
  for(let account of allMetaAccount) {
    processMetaData(account, parsedObj)
  }


  const filteredMetas = parsedObj.metadataByMint
  .filter(metaAccount => metaAccount.account.info &&  metaAccount.account.info.updateAuthority.toBase58() == creatorPubKey.toBase58())

  return filteredMetas
}


async function findAssociatedTokenAddress(walletAddress: PublicKey, tokenMintAddress: PublicKey): Promise<PublicKey> {
  return (
    await PublicKey.findProgramAddress(
      [walletAddress.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), tokenMintAddress.toBuffer()],
      ASSOCIATED_TOKEN_PROGRAM_ID,
    )
  )[0];
}



interface TokenView {
  tokenAccountPubkey: String;
  mint: String;
  owner: String;
  amount: Number;
  delegateOption: boolean;
  delegate: String;
  state: boolean;
  isNativeOption: boolean;
  isNative: Number;
  delegatedAmount: Number;
  closeAuthorityOption: boolean;
  closeAuthority: String;
}

interface MetadataOptions {
  files: ArweaveFile[];
  externalUrl: String;
}

interface ArweaveFile {
  content: String | Uint8Array | ArrayBuffer;
  type: String;
}

export {
  getAllUserTokens,
  getTokenAddressFromMintAndUser,
  readKeypairFromPath,
  getLargestTokenAccountOwnerByMint,

  createTokenMetadata,
  uploadFileToArweave,

  getCreatorsMetadataTokens,
  createMasterEdition,
  updateMetadata,
  createMetadata,
  // interfaces
  TokenView,
  ApiDependencies,

  MetadataOptions,
  ArweaveFile,

  Data,
  Creator,


  MAX_NAME_LENGTH,
  MAX_URI_LENGTH,
  MAX_SYMBOL_LENGTH,
  MAX_CREATOR_LIMIT,
  MAX_CREATOR_LEN,
  MAX_METADATA_LEN
};
