import type { FC } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { formatEther } from 'viem';

const truncateAddress = (address: string | undefined)=>{
  if(!address) return 'N/A';
  return `${address.slice(0,6)}...${address.slice(-4)}`;
}

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

  if (!isConnected) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-8 text-center">
        <p className="text-gray-500">Connect your wallet to view balances</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-8">
      <h2 className="text-xl font-semibold mb-2 text-emerald-500">Wallet Info</h2>
      <div className='md:px-12 grid grid-cols-3'>
          <span className='text-sm md:text-lg text-white font-bold'>Address:</span>
          <span className='text-sm md:text-lg text-end text-white col-span-2 hidden md:block'>{address}</span>
          <span className='text-sm md:text-lg text-end text-white col-span-2 md:hidden'>{truncateAddress(address)}</span>
          <span className='text-sm md:text-lg text-white font-bold'>ETH Balance:</span>
          <span className='text-sm md:text-lg text-end text-white col-span-2'>{ethBalance ? parseFloat(formatEther(ethBalance.value)).toFixed(4) : 'Loading...'} ETH</span>
          <span className='text-sm md:text-lg text-white font-bold'>BTC Balance:</span>
          <span className='text-sm md:text-lg text-end text-white col-span-2'>{mockBtcBalance.toFixed(4)} (Mock)</span>
          <span className='text-sm md:text-lg text-white font-bold'>LINK Balance:</span>
          <span className='text-sm md:text-lg text-end text-white col-span-2'>{linkBalance ? parseFloat(formatEther(linkBalance.value)).toFixed(4) : 'Loading...'} LINK</span>
          <span className='text-sm md:text-lg text-white font-bold'>UNI Balance:</span>
          <span className='text-sm md:text-lg text-end text-white col-span-2'>{uniBalance ? parseFloat(formatEther(uniBalance.value)).toFixed(4) : 'Loading...'} UNI</span>
      </div>
    </div>
  );
};

export default WalletInfo;