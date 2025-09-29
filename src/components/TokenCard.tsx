import type { FC } from 'react';

interface Token {
  name: string;
  symbol: string;
  price: number;
  change: number;
  updatedAt: number;
}

interface TokenCardProps {
  token?: Token;
  isLoading?: boolean;
}

const TokenCard: FC<TokenCardProps> = ({ token, isLoading }) => {
  if (isLoading || !token) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow animate-pulse">
        <div className="flex justify-between items-center">
          <div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
          </div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">{token.name} ({token.symbol})</h3>
          <p className="text-xl font-bold">${token.price.toFixed(2)}</p>
          <p className="text-xs text-gray-500">
            Updated: {new Date(token.updatedAt).toLocaleTimeString()}
          </p>
        </div>
        <p
          className={`text-sm ${token.change >= 0 ? 'text-green-500' : 'text-red-500'}`}
        >
          {token.change >= 0 ? '+' : ''}{token.change.toFixed(2)}%
        </p>
      </div>
    </div>
  );
};

export default TokenCard;