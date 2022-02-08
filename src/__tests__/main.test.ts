import { getAllUserTokenAccounts, getCreatorsMetadataTokens, getCreatorsMetadataTokensAll,} from '../index';
 import {
   Connection,
   PublicKey,

 } from '@solana/web3.js';
import { getMetadata } from './../getArweaveMetadata/lib';

// import * as frKtStaking from '@frakters/frkt-staking-library'
 jest.setTimeout(2000000000) 
 
test('Examples', async () => {

    const connection = new Connection('https://api.mainnet-beta.solana.com', "confirmed")
    // const allMetaAccount = await getCreatorsMetadataTokens(new PublicKey('6wPYbuGRXZjVw2tCeTxwRiQU7AzFDTeFEKuUFpJZpcix'), { connection })

    // console.log(allMetaAccount.find(meta => meta.mintAddress == 'ErGB9xa24Szxbk1M28u2Tx8rKPqzL6BroNkkzk5rG4zj'))
    // const tokens = await getAllUserTokenAccounts(new PublicKey('6wPYbuGRXZjVw2tCeTxwRiQU7AzFDTeFEKuUFpJZpcix'), { connection })

    // console.log(tokens.filter(token => token.amount == 0))

    // const metas = await getCreatorsMetadataTokensAll({connection})

    // console.log(metas)
    // const meta = await getMetadata(new PublicKey('5ovnCT8vbaNj7QhKrGPJhczmrWqSMbv2Yn5t9Yx5GTYq'), 'https://api.mainnet-beta.solana.com')
    // console.log('meta: ', meta)
  // console.log(frKtStaking.getAllProgramAccounts())
});