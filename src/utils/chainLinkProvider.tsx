import { ethers } from 'ethers';

const RPC_URLS = [
  'https://mainnet.infura.io/v3/f184c109a0ee494fb07a77c74ffd88a1',
  'https://rpc.ankr.com/eth',
  'https://eth.llamarpc.com',
];

let provider: ethers.JsonRpcProvider | null = null;

const getProvider = async (): Promise<ethers.JsonRpcProvider> => {
  for (const url of RPC_URLS) {
    try {
      const testProvider = new ethers.JsonRpcProvider(url);
      await testProvider.getBlockNumber();
      console.log(`Connected to RPC: ${url}`);
      return testProvider;
    } catch (error) {
      console.warn(`Failed to connect to ${url}, trying next...`, error);
    }
  }
  throw new Error('All RPC providers failed. Check your Infura key or network.');
};

getProvider().then(p => provider = p).catch(console.error);

export default provider!;