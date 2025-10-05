import { ethers } from 'ethers';
import { getProvider } from './chainLinkProvider';

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
  isSimulated?: boolean;
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

const lastUpdatedAt: Record<string, number> = {
  ETH: 0,
  BTC: 0,
  LINK: 0,
  UNI: 0,
};

const previousPrices: Record<string, number> = {
  ETH: 0,
  BTC: 0,
  LINK: 0,
  UNI: 0,
};

export const fetchLivePrice = async (token: Token): Promise<Partial<Token>> => {
  try {
    const provider = await getProvider();
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
  const updatedTokens: Token[] = [];
  for (const token of tokens) {
    const { price, updatedAt } = await fetchLivePrice(token);
    let newPrice = price ?? token.price;
    let newUpdatedAt = updatedAt ?? token.updatedAt;
    let isSimulated = false;

    if (newPrice > 0) {
      const fluctuation = (Math.random() * 1 - 0.5) / 100;
      newPrice *= 1 + fluctuation;
      newPrice = parseFloat(newPrice.toFixed(2));
      newUpdatedAt = Date.now();
      isSimulated = true;
      console.log(`Applied fluctuation to ${token.symbol}: ${newPrice}`);
    }

    const prevPrice = previousPrices[token.symbol] || 0;
    const change = prevPrice > 0 ? ((newPrice - prevPrice) / prevPrice) * 100 : 0;

    previousPrices[token.symbol] = newPrice;

    lastUpdatedAt[token.symbol] = newUpdatedAt;

    updatedTokens.push({
      ...token,
      price: newPrice,
      change: parseFloat(change.toFixed(2)),
      updatedAt: newUpdatedAt,
      isSimulated,
    });

    await new Promise(resolve => setTimeout(resolve, 500));
  }
  console.log('Fetched tokens:', updatedTokens);
  return updatedTokens;
};