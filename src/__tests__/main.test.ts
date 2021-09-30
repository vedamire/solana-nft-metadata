import { getCreatorsMetadataTokens,} from '../index';
 import {
   Connection,
   PublicKey,

 } from '@solana/web3.js';

test('Examples', async () => {

    const connection = new Connection('https://api.mainnet-beta.solana.com', "confirmed")
    const allMetaAccount = await getCreatorsMetadataTokens(new PublicKey('6wPYbuGRXZjVw2tCeTxwRiQU7AzFDTeFEKuUFpJZpcix'), { connection })
    console.log(allMetaAccount)
});