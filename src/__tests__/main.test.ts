import { getCreatorsMetadataTokens,} from '../index';
 import {
   Connection,
   PublicKey,

 } from '@solana/web3.js';

 jest.setTimeout(2000000000) 
 
test('Examples', async () => {

    const connection = new Connection('https://api.mainnet-beta.solana.com', "confirmed")
    const allMetaAccount = await getCreatorsMetadataTokens(new PublicKey('6wPYbuGRXZjVw2tCeTxwRiQU7AzFDTeFEKuUFpJZpcix'), { connection })

    console.log(allMetaAccount.find(meta => meta.mintAddress == 'ErGB9xa24Szxbk1M28u2Tx8rKPqzL6BroNkkzk5rG4zj'))
});