# frakt-client-library

Library to interact with FRAKT solana program.

## Install

```bash
npm install frakt-client
```


## Read functions

### Get all arts

```js
import { getArts } from 'frakt-client';
import {
  Connection,
  PublicKey,
} from '@solana/web3.js';

  const fraktProgramPubKey = new PublicKey("6zcw5qXiCjScAxYLhxhuPgAo69PSoDijpnWTDGmDVDbv")
  const connection = new Connection("https://api.devnet.solana.com", "processed")
  const arts = await getArts(fraktProgramPubKey, { connection })
  console.log(arts)
```
See [example/__tests__/getArts.js](https://github.com/frakt-solana/frakt-client-library/blob/master/src/__tests__/getArts.test.ts) for a full example.

<details>
<summary>Output</summary>

```js
    [
      {
        metadata: {
          artAccountPubkey: '5GVy2aWvbgtyhc5RXjQJWRSut2H2ntY9spo3hNNGrheX',
          isInitialized: true,
          id: 4,
          first_owner_pubkey: 'DYEfeSZz6fyVyGVefXiKisu94TzQnT2UG8Rc1ZZ2wAWb',
          minted_token_pubkey: '11111111111111111111111111111111',
          is_minted: false,
          created_at: 1622842277
        },
        attributes: {
          shape: 0,
          color: 0,
          art_hash: 0,
          circles_amount: 0,
          fractial_iterations: 0,
          min_rad_low_limit: 0,
          min_rad_high_limit: 0,
          max_rad_low_limit: 0,
          max_rad_high_limit: 0,
          shape_rarity: 0,
          color_rarity: 0,
          image_url: ''
        }
      },
      {
        metadata: {
          artAccountPubkey: 'DHEbQmgGyHbUWuen9knm72DpMvbexuWTgXa3bwsbtY8w',
          isInitialized: true,
          id: 1,
          first_owner_pubkey: 'DYEfeSZz6fyVyGVefXiKisu94TzQnT2UG8Rc1ZZ2wAWb',
          minted_token_pubkey: 'G7dAEvrX14WnAm79a4ziiSKuoJ3wdCxBwVFn6zd4FyNo',
          is_minted: true,
          created_at: 1622841755
        },
        attributes: {
          shape: 1,
          color: 2,
          art_hash: 2,
          circles_amount: 7,
          fractial_iterations: 14,
          min_rad_low_limit: 3,
          min_rad_high_limit: 8,
          max_rad_low_limit: 102,
          max_rad_high_limit: 305,
          shape_rarity: 2,
          color_rarity: 70,
          image_url: 'https://i.ibb.co/hMwzcpF/frakt-ex.jpg'
        }
      },
    ]
```
</details>

### Get all user tokens

```js
  import { getAllUserTokens } from 'frakt-client';
  import {
    Connection,
    PublicKey,
  } from '@solana/web3.js';

  const userPubKey = new PublicKey("DYEfeSZz6fyVyGVefXiKisu94TzQnT2UG8Rc1ZZ2wAWb")
  const connection = new Connection("https://api.devnet.solana.com", "processed")
  const tokens = await getAllUserTokens(userPubKey, { connection })
  console.log(tokens)
```
See [example/__tests__/getArts.js](https://github.com/frakt-solana/frakt-client-library/blob/master/src/__tests__/getArts.test.ts) for a full example.

<details>
<summary>Output</summary>

```js
    [
      {
        tokenAccountPubkey: 'HwBG6T84nXx696reiTXj221Sd9KqfiwJsZDk5AgS4S2w',
        mint: 'nmPRdEQrmp6soRimLvogW92RG6Aj2vi494RAVN768CA',
        owner: 'DYEfeSZz6fyVyGVefXiKisu94TzQnT2UG8Rc1ZZ2wAWb',
        amount: 1,
        delegateOption: false,
        delegate: '11111111111111111111111111111111',
        state: true,
        isNativeOption: false,
        isNative: 0,
        delegatedAmount: 0,
        closeAuthorityOption: false,
        closeAuthority: '11111111111111111111111111111111'
      },
      {
        tokenAccountPubkey: '2HimvoswsC91aYcP1odXmUxXnE4GrYNS8exfrNXFTx2E',
        mint: 'Ht1yx8tz48vbesYFAtLMPNFCaVo2pKsQXYkfo7pZxhDi',
        owner: 'DYEfeSZz6fyVyGVefXiKisu94TzQnT2UG8Rc1ZZ2wAWb',
        amount: 1,
        delegateOption: false,
        delegate: '11111111111111111111111111111111',
        state: true,
        isNativeOption: false,
        isNative: 0,
        delegatedAmount: 0,
        closeAuthorityOption: false,
        closeAuthority: '11111111111111111111111111111111'
      },
      {
        tokenAccountPubkey: 'AfKsnT3b6DERcfJbREAuV7JH8JWjA3dQpTDto4rE7Ndd',
        mint: '5sAdZkmEvxBh7nM7q5asjzmWDeRqDJcLneiF3fNMHcUi',
        owner: 'DYEfeSZz6fyVyGVefXiKisu94TzQnT2UG8Rc1ZZ2wAWb',
        amount: 1,
        delegateOption: false,
        delegate: '11111111111111111111111111111111',
        state: true,
        isNativeOption: false,
        isNative: 0,
        delegatedAmount: 0,
        closeAuthorityOption: false,
        closeAuthority: '11111111111111111111111111111111'
      }
    ]
```
</details>

### Get all specific user's arts

```js
  import { getArts,  getAllUserTokens, getArtTokensFromTokens } from '../index';
  import {
    Connection,
    PublicKey,
  } from '@solana/web3.js';
  const userPubKey = new PublicKey("DYEfeSZz6fyVyGVefXiKisu94TzQnT2UG8Rc1ZZ2wAWb")
  const fraktProgramPubKey = new PublicKey("6zcw5qXiCjScAxYLhxhuPgAo69PSoDijpnWTDGmDVDbv")
  const connection = new Connection("https://api.devnet.solana.com", "processed")

  const tokens = await getAllUserTokens(userPubKey, { connection })
  const arts = await getArts(fraktProgramPubKey, { connection })
  const userArts = getArtTokensFromTokens(arts, tokens)

  console.log(userArts)
```
See [example/__tests__/getArts.js](https://github.com/frakt-solana/frakt-client-library/blob/master/src/__tests__/getArts.test.ts) for a full example.

<details>
<summary>Output</summary>

```js
    [
      {
        metadata: {
          artAccountPubkey: '5GVy2aWvbgtyhc5RXjQJWRSut2H2ntY9spo3hNNGrheX',
          isInitialized: true,
          id: 4,
          first_owner_pubkey: 'DYEfeSZz6fyVyGVefXiKisu94TzQnT2UG8Rc1ZZ2wAWb',
          minted_token_pubkey: '11111111111111111111111111111111',
          is_minted: false,
          created_at: 1622842277
        },
        attributes: {
          shape: 0,
          color: 0,
          art_hash: 0,
          circles_amount: 0,
          fractial_iterations: 0,
          min_rad_low_limit: 0,
          min_rad_high_limit: 0,
          max_rad_low_limit: 0,
          max_rad_high_limit: 0,
          shape_rarity: 0,
          color_rarity: 0,
          image_url: ''
        }
      },
      {
        metadata: {
          artAccountPubkey: 'DHEbQmgGyHbUWuen9knm72DpMvbexuWTgXa3bwsbtY8w',
          isInitialized: true,
          id: 1,
          first_owner_pubkey: 'DYEfeSZz6fyVyGVefXiKisu94TzQnT2UG8Rc1ZZ2wAWb',
          minted_token_pubkey: 'G7dAEvrX14WnAm79a4ziiSKuoJ3wdCxBwVFn6zd4FyNo',
          is_minted: true,
          created_at: 1622841755
        },
        attributes: {
          shape: 1,
          color: 2,
          art_hash: 2,
          circles_amount: 7,
          fractial_iterations: 14,
          min_rad_low_limit: 3,
          min_rad_high_limit: 8,
          max_rad_low_limit: 102,
          max_rad_high_limit: 305,
          shape_rarity: 2,
          color_rarity: 70,
          image_url: 'https://i.ibb.co/hMwzcpF/frakt-ex.jpg'
        }
      },

    ]
```
</details>

### Get counter of current arts supply

```js
  import { getCounter, } from '../index';
  import {
    Connection,
    PublicKey,
  } from '@solana/web3.js';
  const fraktProgramPubKey = new PublicKey("6zcw5qXiCjScAxYLhxhuPgAo69PSoDijpnWTDGmDVDbv")
  const connection = new Connection("https://api.devnet.solana.com", "processed")

  const counter = await getCounter(fraktProgramPubKey, {connection})

  console.log(counter)
```
See [example/__tests__/getArts.js](https://github.com/frakt-solana/frakt-client-library/blob/master/src/__tests__/getArts.test.ts) for a full example.

<details>
<summary>Output</summary>

```js
    {
      counterAccountPubkey: 'Cfbth2vrShsUBwjZZFC1xoPGcDdoFMikCyXxQD5yzEyj',
      isInitialized: true,
      count: 10
    }
```
</details>

## Write functions

Here is the examples of signing write transaction from local keypair, that is feasible only on server. For examples on how to sign write transaction in browser using sollet browser extention visit [frakt-library-browser-example](https://github.com/frakt-solana/frakt-library-browser-example) for a full example.

### Buy art local keypair signed

```js
  import { buyArt } from 'frakt-client';
  import {
    Connection,
    PublicKey,
  } from '@solana/web3.js';

  const fraktProgramPubKey = new PublicKey("6zcw5qXiCjScAxYLhxhuPgAo69PSoDijpnWTDGmDVDbv")
  const adminPubKey = new PublicKey("DQfi54Fspjfi6VyMH1iSDyYAcui2hUF1QRbQ1GM7N1uo")
  const aliceKeypair = readKeypairFromPath(<PATH_TO_YOUR_KEYPAIR>) 

  const connection = new Connection("https://api.devnet.solana.com", "processed")

  void await buyArt(aliceKeypair.publicKey, fraktProgramPubKey, adminPubKey,
    async (txn) => void connection.sendTransaction(txn, [aliceKeypair]), { connection })

```
See [example/__tests__/getArts.js](https://github.com/frakt-solana/frakt-client-library/blob/master/src/__tests__/getArts.test.ts) for a full example.


### Mint art local keypair signed

```js
  import { mintArt } from 'frakt-client';
  import {
    Connection,
    PublicKey,
  } from '@solana/web3.js';

  const fraktProgramPubKey = new PublicKey("6zcw5qXiCjScAxYLhxhuPgAo69PSoDijpnWTDGmDVDbv")
  const adminKeypair = readKeypairFromPath(__dirname + "/keys/admin.json")
  const userPubKey = new PublicKey("DYEfeSZz6fyVyGVefXiKisu94TzQnT2UG8Rc1ZZ2wAWb")
  const artPubKey = new PublicKey("Hsx9yQkqiL5A6vTf2QRjcVBDCzNKTssgiagBVbWXmtd7")
  const connection = new Connection("https://api.devnet.solana.com", "processed")

  void await mintArt({
    shape: 1,
    color: 2,
    art_hash: 2, // Hash of figure+color combination in ranges
    circles_amount: 7,
    fractial_iterations: 14,
    min_rad_low_limit: 3,
    min_rad_high_limit: 8,
    max_rad_low_limit: 102,
    max_rad_high_limit: 305,
    shape_rarity: 2,
    color_rarity: 70,
    image_url: "", // wip anyway
  }, adminKeypair.publicKey, userPubKey, artPubKey, fraktProgramPubKey,
  async (txn) => void connection.sendTransaction(txn, [adminKeypair]),
  { connection })

```
See [example/__tests__/getArts.js](https://github.com/frakt-solana/frakt-client-library/blob/master/src/__tests__/getArts.test.ts) for a full example.

### Util functions
Derives tokenPublicKey from userAddress and mintAddress, which can be user in various situations
* ```getTokenAddressFromMintAndUser(userPublicKey: String, mintAddress: String): PublicKey```

Returns KeyPair from the file path
* ```readKeypairFromPath(path: string): Keypair```