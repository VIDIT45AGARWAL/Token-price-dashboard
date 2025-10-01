import type { FC } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { formatEther } from 'viem';

const WalletInfo: FC = () => {
  const { address, isConnected } = useAccount();

  // Fetch ETH balance (native)
  const { data: ethBalance } = useBalance({ address });

  // Fetch LINK balance (ERC-20)
  const { data: linkBalance } = useBalance({
    address,
    token: '0x514910771AF9Ca656af840dff83E8264EcF986CA', // LINK Mainnet
  });

  // Fetch UNI balance (ERC-20)
  const { data: uniBalance } = useBalance({
    address,
    token: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984', // UNI Mainnet
  });

  // Mock BTC/SOL balances (not native to Ethereum)
  const mockBtcBalance = 0.001; // Replace with WBTC if real data needed
  const mockSolBalance = 5.2; // Replace with WSOL if real data needed

  if (!isConnected) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-8 text-center">
        <p className="text-gray-500">Connect your wallet to view balances</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-8">
      <h2 className="text-xl font-semibold mb-2 text-white">Wallet Info</h2>
      <p className="text-white">Address: {address}</p>
      <p className="text-white">ETH Balance: {ethBalance ? parseFloat(formatEther(ethBalance.value)).toFixed(4) : 'Loading...'} ETH</p>
      <p className="text-white">BTC Balance: {mockBtcBalance.toFixed(4)} (Mock)</p>
      <p className="text-white">SOL Balance: {mockSolBalance.toFixed(2)} (Mock)</p>
      <p className="text-white">LINK Balance: {linkBalance ? parseFloat(formatEther(linkBalance.value)).toFixed(4) : 'Loading...'} LINK</p>
      <p className="text-white">UNI Balance: {uniBalance ? parseFloat(formatEther(uniBalance.value)).toFixed(4) : 'Loading...'} UNI</p>
    </div>
  );
};

export default WalletInfo;