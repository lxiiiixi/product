import { configureChains, createConfig } from 'wagmi';
import { mainnet, goerli, polygon, optimism, arbitrum } from 'wagmi/chains';
import {
  getDefaultWallets,
  connectorsForWallets
} from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  trustWallet,
  ledgerWallet
} from '@rainbow-me/rainbowkit/wallets';
import { publicProvider } from 'wagmi/providers/public';

export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, goerli, polygon, optimism, arbitrum],
  [publicProvider()]
);

const projectId = import.meta.env.VITE_PROJECT_ID;
const { wallets } = getDefaultWallets({
  appName: 'RainbowKit demo',
  projectId,
  chains
});

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains })
    ]
  }
]);

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient
});
