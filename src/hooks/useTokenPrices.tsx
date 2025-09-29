import { useQuery } from '@tanstack/react-query';
import {  fetchAllLivePrices } from '../utils/chainLinkFeeds';
import type { Token } from '../utils/chainLinkFeeds';

export const useTokenPrices = () => {
  return useQuery<Token[]>({
    queryKey: ['tokenPrices'],
    queryFn: async () => {
      console.log('Fetching prices at', new Date().toLocaleTimeString());
      const liveTokens = await fetchAllLivePrices();
      return liveTokens.map((token) => ({ ...token }));
    },
    refetchInterval: 30000,
    staleTime: 60000,
    retry: 2,
  });
};