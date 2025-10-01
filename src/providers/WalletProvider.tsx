import {connectorsForWallets} from '@rainbow-me/rainbowkit'
import {metaMaskWallet, walletConnectWallet, coinbaseWallet} from '@rainbow-me/rainbowkit/wallets'
import { mainnet, sepolia } from 'wagmi/chains'
import { createConfig, http, WagmiProvider } from 'wagmi'
import { QueryClient as WagmiQueryClient } from '@tanstack/query-core'
import { QueryClientProvider } from '@tanstack/react-query'
import type { FC, PropsWithChildren } from 'react'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'

const connectors = connectorsForWallets(
    [
        {
            groupName: 'Recommended',
            wallets: [metaMaskWallet, walletConnectWallet, coinbaseWallet],
        },
    ],
    {
        appName: 'Token Dashboard',
        projectId: '52b3892895b2e58a41e9fc2e19537eb2',
        appDescription: 'Real-Time Token Price Dashboard',
    }
)

const config = createConfig({
    chains: [mainnet, sepolia],
    connectors,
    transports: {
        [mainnet.id]: http(),
        [sepolia.id]: http(),
    }
})

const queryClient = new WagmiQueryClient();

export const WalletProvider: FC<PropsWithChildren> = ({children}) =>{
    return(
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}