import { ethers } from 'ethers';

const RPC_URLS = [
  `https://mainnet.infura.io/v3/${import.meta.env.VITE_INFURA_KEY}`,
  'https://rpc.ankr.com/eth',
  'https://eth.llamarpc.com',
];

export const getProvider = async (): Promise<ethers.JsonRpcProvider> => {
  for (const url of RPC_URLS) {
    try {
      const testProvider = new ethers.JsonRpcProvider(url);
      const blockNumber = await testProvider.getBlockNumber();
      console.log(`Connected to RPC: ${url}, block : ${blockNumber}`);
      return testProvider;
    } catch (error) {
      console.warn(`Failed to connect to ${url}, trying next...`, error);
    }
  }
  throw new Error('All RPC providers failed. Check your Infura key or network.');
};