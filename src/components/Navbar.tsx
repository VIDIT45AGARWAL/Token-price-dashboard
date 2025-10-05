import type { FC } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup, signOut } from 'firebase/auth';

const Navbar: FC = () => {
  const { currentUser } = useContext(AuthContext);

  const handleGoogleLogin = async () => {
    await signInWithPopup(auth, googleProvider);
  }

  const handleLogout = async () => {
    await signOut(auth);
  }

  return (
    <nav className="bg-black p-4 px-6 sm:px-10 space-y-2 md:space-y-0 flex flex-col md:flex-row justify-end items-center border-b-4 border-b-gray-500">
      <div className="text-emerald-500 text-2xl sm:text-3xl font-bold flex flex-row items-center md:mr-auto">
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
              className="bg-emerald-500 rounded-2xl p-2 text-white font-bold text-sm sm:text-base flex items-center justify-center"
              {...(!ready && {
                'aria-hidden': true,
                style: { opacity: 0, pointerEvents: 'none' },
              })} text-
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
      {currentUser ? (
          <button
            onClick={handleLogout}
            className="bg-emerald-500 rounded-2xl ml-3 p-3 text-white font-bold text-sm sm:text-base hover:bg-emerald-600 transition"
          >
            Logout
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleGoogleLogin}
              className="bg-emerald-500 rounded-2xl ml-3 p-3 text-white font-bold text-sm sm:text-base hover:bg-emerald-600 transition"
            >
              Login
            </button>
          </div>
        )}
    </nav>
  );
};

export default Navbar;