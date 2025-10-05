import { useQuery } from '@tanstack/react-query';
import type { Token } from '../utils/chainLinkFeeds';

interface HistoricalData {
  prices: [timestamp: number, price: number][];
}

interface HistoricalQueryProps {
  token: Token;
  days: number; 
  apiKey?: string;
}

const COINGECKO_IDS = {
  ETH: 'ethereum',
  BTC: 'bitcoin',
  LINK: 'chainlink',
  UNI: 'uniswap',
};

export const useHistoricalData = ({ token, days, apiKey }: HistoricalQueryProps) => {
  const coinId = COINGECKO_IDS[token.symbol as keyof typeof COINGECKO_IDS];
  const daysAgo = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const now = new Date().toISOString().split('T')[0];

  return useQuery<HistoricalData>({
    queryKey: ['historical', token.symbol, days],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));

      const url = `/api/coingecko/api/v3/coins/${coinId}/market_chart/range?vs_currency=usd&from=${daysAgo}&to=${now}${apiKey ? `&x_cg_demo_api_key=${apiKey}` : ''}`;
      const response = await fetch(url);
      if (!response.ok) {
        if (response.status === 429) throw new Error('Rate limited—try again in 1 min');
        throw new Error(`CoinGecko API error: ${response.status}`);
      }
      const data = await response.json();
      return { prices: data.prices || [] };
    },
    staleTime: 10 * 60 * 1000,
    retry: (failureCount, error) => failureCount < 2 && error.message !== 'Rate limited—try again in 1 min',
    retryDelay: (attemptIndex) => 1000 * (attemptIndex + 1),
  });
};