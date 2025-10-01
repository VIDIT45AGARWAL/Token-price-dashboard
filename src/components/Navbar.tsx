import type { FC } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Navbar: FC = () => {
  return (
    <nav className="bg-black p-4 px-6 sm:px-10 flex flex-row justify-between items-center border-b-4 border-b-gray-500">
      <div className="text-emerald-500 text-2xl sm:text-3xl font-bold flex flex-row items-center">
        <i className="bx bx-stats mr-2"></i> TokenTrak
      </div>
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          const ready = mounted && authenticationStatus !== 'loading';
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus || authenticationStatus === 'authenticated');

          return (
            <div
              className="bg-emerald-500 rounded-2xl p-2 sm:p-3 text-white font-bold text-sm sm:text-base flex items-center"
              {...(!ready && {
                'aria-hidden': true,
                style: { opacity: 0, pointerEvents: 'none' },
              })}
            >
              {!ready ? (
                <span>Loading...</span>
              ) : !connected ? (
                <button
                  onClick={openConnectModal}
                  type="button"
                  className="w-full px-4 py-2 hover:bg-emerald-600 transition rounded-2xl"
                >
                  Connect Wallet
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="px-3 py-1 hover:bg-emerald-600 transition rounded-xl"
                    title="Switch Network"
                  >
                    {chain.unsupported ? 'Wrong Network' : chain.name}
                  </button>
                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="px-3 py-1 hover:bg-emerald-600 transition rounded-xl"
                  >
                    {account.displayName}
                    {account.displayBalance ? ` (${account.displayBalance})` : ''}
                  </button>
                </div>
              )}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </nav>
  );
};

export default Navbar;