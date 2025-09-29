import type { FC } from 'react';
import TokenCard from '../components/TokenCard';
import { useTokenPrices } from '../hooks/useTokenPrices';
import Navbar from '../components/Navbar';

const Dashboard: FC = () => {
  const { data: tokens, isLoading, error } = useTokenPrices();
  console.log('Dashboard tokens:', tokens);

  if (isLoading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">Error: {(error as Error).message}</div>;

  return (
    <>
    <Navbar/>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Token Price Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {tokens?.map((token) => (
          <TokenCard key={token.symbol} token={token} isLoading={isLoading} />
        ))}
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-8">
        <h2 className="text-xl font-semibold mb-2">Price Chart</h2>
        <div className="h-64 flex items-center justify-center text-gray-500">
          Chart Placeholder (24h/7d Trends)
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Token Comparison</h2>
        <div className="h-32 flex items-center justify-center text-gray-500">
          Comparison Table Placeholder
        </div>
      </div>
    </div>
    </>
  );
};

export default Dashboard;