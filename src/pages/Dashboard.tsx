import type { FC } from 'react';
import TokenCard from '../components/TokenCard';
import { useTokenPrices } from '../hooks/useTokenPrices';
import Navbar from '../components/Navbar';
import ChartComponent from '../components/ChartComponent';
import WalletInfo from '../components/WalletInfo';

const Dashboard: FC = () => {
  const { data: tokens, isLoading, error } = useTokenPrices();
  console.log('Dashboard tokens:', tokens);

  if (isLoading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">Error: {(error as Error).message}</div>;

  return (
    <>
    <Navbar/>
    <div className="w-screen px-10 py-6 bg-black">
      <h1 className="text-2xl text-emerald-500 font-bold mb-4 text-center">Token Price Dashboard</h1>
      <div className="grid  grid-cols-1 sm:grid-cols-2 text-white gap-4 mb-8">
        {tokens?.map((token) => (
          <TokenCard key={token.symbol} token={token} isLoading={isLoading} />
        ))}
      </div>
      <WalletInfo/>
      <div className="text-white grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        {tokens?.map((token) => (
          <div key={token.symbol} className="bg-gray-800 p-4 rounded-lg shadow">
            <ChartComponent key={token.symbol} token={token} apiKey={import.meta.env.VITE_COIN_GECKO_API} />
          </div>
        ))}
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="text-emerald-500 text-xl font-semibold mb-2">Token Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="p-2 text-left">Token</th>
                <th className="p-2 text-left">Price (USD)</th>
                <th className="p-2 text-left">Change (%)</th>
                <th className="p-2 text-left">Last Update</th>
              </tr>
            </thead>
            <tbody>
              {tokens?.map((token) => (
                <tr key={token.symbol} className="border-b dark:border-gray-700">
                  <td className="p-2 text-white font-bold">{token.name} ({token.symbol})</td>
                  <td className="text-gray-400 p-2">${token.price.toFixed(2)}</td>
                  <td className={`${token.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {token.change.toFixed(2)}%
                  </td>
                  <td className="p-2 text-gray-400">{new Date(token.updatedAt).toLocaleTimeString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  );
};

export default Dashboard;