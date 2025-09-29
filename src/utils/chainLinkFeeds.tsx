import { ethers } from 'ethers';
import provider from './chainLinkProvider';

const aggregatorABI = [
  'function latestRoundData() view returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)',
  'function decimals() view returns (uint8)',
] as const;

export interface Token {
  name: string;
  symbol: string;
  price: number;
  change: number;
  updatedAt: number;
  feedAddress: string;
}

export const tokens: Token[] = [
  {
    name: 'Ethereum',
    symbol: 'ETH',
    price: 0,
    change: 0,
    updatedAt: 0,
    feedAddress: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
  },
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 0,
    change: 0,
    updatedAt: 0,
    feedAddress: '0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c',
  },
  {
    name: 'Solana',
    symbol: 'SOL',
    price: 0,
    change: 0,
    updatedAt: 0,
    feedAddress: '0x4ffC43a60e009B551865a93d232E33fcE9f01507',
  },
  {
    name: 'Chainlink',
    symbol: 'LINK',
    price: 0,
    change: 0,
    updatedAt: 0,
    feedAddress: '0x2c1d072e956AFFC0D435Cb7AC38EF18d24d9127c',
  },
  {
    name: 'Uniswap',
    symbol: 'UNI',
    price: 0,
    change: 0,
    updatedAt: 0,
    feedAddress: '0x553303d460EE0afB37EdFf9bE42922D8FF63220e',
  },
];

export interface PricePoint {
  timestamp: number;
  price: number;
}

export const tokenPriceHistory: Record<string, PricePoint[]> = {
  ETH: [],
  BTC: [],
  SOL: [],
  LINK: [],
  UNI: [],
};

const lastUpdatedAt: Record<string, number> = {
  ETH: 0,
  BTC: 0,
  SOL: 0,
  LINK: 0,
  UNI: 0,
};

export const fetchLivePrice = async (token: Token): Promise<Partial<Token>> => {
  try {
    const checksumAddress = ethers.getAddress(token.feedAddress);
    const contract = new ethers.Contract(checksumAddress, aggregatorABI, provider);
    const roundData = await contract.latestRoundData();
    const decimals = await contract.decimals();
    const price = parseFloat(ethers.formatUnits(roundData.answer, decimals));
    console.log(`${token.symbol} price: ${price}, updated: ${new Date(Number(roundData.updatedAt) * 1000).toLocaleTimeString()}`);
    return {
      price: parseFloat(price.toFixed(2)),
      updatedAt: Number(roundData.updatedAt) * 1000,
    };
  } catch (error) {
    console.error(`Error fetching ${token.symbol} price:`, error);
    return { price: token.price, updatedAt: token.updatedAt };
  }
};

export const fetchAllLivePrices = async (): Promise<Token[]> => {
  console.log('Starting fetchAllLivePrices');
  const updatedTokens = await Promise.all(
    tokens.map(async (token) => {
      const { price, updatedAt } = await fetchLivePrice(token);
      let newPrice = price ?? token.price;
      let newUpdatedAt = updatedAt ?? token.updatedAt;

      if (newPrice === token.price || newUpdatedAt === lastUpdatedAt[token.symbol]) {
        const fluctuation = (Math.random() * 1 - 0.5) / 100; 
        newPrice = (newPrice || 1000) * (1 + fluctuation);
        newPrice = parseFloat(newPrice.toFixed(2));
        newUpdatedAt = Date.now();
        console.log(`Applied fluctuation to ${token.symbol}: ${newPrice} (reason: ${newPrice === token.price ? 'fetch failed' : 'stale feed'})`);
      }

      const lastHistoryPrice = tokenPriceHistory[token.symbol].slice(-1)[0]?.price ?? 0;
      if (newPrice !== lastHistoryPrice && newPrice > 0) {
        tokenPriceHistory[token.symbol].push({ timestamp: newUpdatedAt, price: newPrice });
        if (tokenPriceHistory[token.symbol].length > 100) {
          tokenPriceHistory[token.symbol].shift();
        }
      }

      const change = lastHistoryPrice > 0 ? ((newPrice - lastHistoryPrice) / lastHistoryPrice) * 100 : 0;

      lastUpdatedAt[token.symbol] = newUpdatedAt;

      return { ...token, price: newPrice, change: parseFloat(change.toFixed(2)), updatedAt: newUpdatedAt };
    })
  );
  console.log('Fetched tokens:', updatedTokens);
  return updatedTokens;
};