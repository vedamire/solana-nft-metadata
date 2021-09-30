import { PublicKey } from '@solana/web3.js';

// export const STORE_OWNER_ADDRESS = process.env
//   .REACT_APP_STORE_OWNER_ADDRESS_ADDRESS
//   ? new PublicKey(`${process.env.REACT_APP_STORE_OWNER_ADDRESS_ADDRESS}`)
//   : // DEFAULT STORE FRONT OWNER FOR METAPLEX
//     undefined;
// console.debug(`Store owner address: ${STORE_OWNER_ADDRESS?.toBase58()}`);


export const AUCTION_PROGRAM_ID = new PublicKey(
  'C9nHkL6BfGx9M9MyYrJqAD5hPsGJd1fHpp1uAJA6vTCn',
);

export const VAULT_PROGRAM_ID = new PublicKey(
  '94wRaYAQdC2gYF76AUTYSugNJ3rAC4EimjAMPwM7uYry',
);

export const METAPLEX_PROGRAM_ID = new PublicKey(
  'EPtpKdKW8qciGVd1UFyGjgbBHTbSAyvbY61h9uQGVgeu',
);

// TODO: generate key ---
export const AR_SOL_HOLDER_ID = new PublicKey(
  'HvwC9QSAzvGXhhVrgPmauVwFWcYZhne3hVot9EbHuFTm',
);


export const WRAPPED_SOL_MINT = new PublicKey(
  'So11111111111111111111111111111111111111112',
);
export let TOKEN_PROGRAM_ID = new PublicKey(
  'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
);

export let SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new PublicKey(
  'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
);
export let BPF_UPGRADE_LOADER_ID = new PublicKey(
  'BPFLoaderUpgradeab1e11111111111111111111111',
);

export const METADATA_PROGRAM_ID = new PublicKey(
  'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s',
  //'GCUQ7oWCzgtRKnHnuJGxpr5XVeEkxYUXwTKYcqGtxLv4',
);

export const MEMO_ID = new PublicKey(
  'MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr',
);

export const VAULT_ID = new PublicKey(
  'vau1zxA2LbssAUEF7Gpw91zMM1LvXrvpzJtmZ58rPsn',
  //'41cCnZ1Z1upJdtsS1tzFGR34cPFgJLzvJFmgYKpCqkz7',
);

export const AUCTION_ID = new PublicKey(
  'auctxRXPeJoc4817jDhf4HbjnhEcr1cCXenosMhK5R8',
  //'6u5XVthCStUfmNrYhFsST94oKxzwEZfZFHFhiCnB2nR1',
);

export const METAPLEX_ID = new PublicKey(
  'p1exdMJcjVao65QdewkaZRUnU6VPSXhus9n2GzWfh98',
  //'98jcGaKLKx9vv33H9edLUXAydrSipHhJGDQuPXBVPVGp',
);

export let SYSTEM = new PublicKey('11111111111111111111111111111111');

export const ENABLE_FEES_INPUT = false;

// legacy pools are used to show users contributions in those pools to allow for withdrawals of funds
export const PROGRAM_IDS = [
  {
    name: 'mainnet-beta',
  },
  {
    name: 'testnet',
  },

  {
    name: 'devnet',
  },
  {
    name: 'localnet',
  },
];


let STORE: PublicKey | undefined;

export const programIds = () => {
  return {
    token: TOKEN_PROGRAM_ID,
    associatedToken: SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
    bpf_upgrade_loader: BPF_UPGRADE_LOADER_ID,
    system: SYSTEM,
    metadata: METADATA_PROGRAM_ID,
    memo: MEMO_ID,
    vault: VAULT_ID,
    auction: AUCTION_ID,
    metaplex: METAPLEX_ID,
    store: STORE,
  };
};
