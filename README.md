```markdown
# Token Price Dashboard

A **Web3 dashboard** built with **React, TypeScript, and Vite**, showcasing real-time token prices (ETH, BTC, LINK, UNI) using **Chainlink oracles**, historical price charts via **CoinGecko**, and secure wallet integration with **Wagmi**.  
The app also supports **Firebase Authentication** (Google) with a fully responsive design for both mobile and desktop.

---

## 🚀 Project Overview

This project fulfills the task of designing a **user-centric Web3 application** with real-time functionality and secure wallet integration.

- **Live token prices** from Chainlink oracles  
- **Historical price charts** from CoinGecko  
- **Wallet balances** via Wagmi  
- **Multi-login system** with Firebase Authentication  
- **Responsive UI** optimized for mobile and desktop   

---

## ✨ Features

### 1. Real-Time Token Prices (Chainlink Oracles)
- Oracles Used: Chainlink price feeds for ETH/USD, BTC/USD, LINK/USD, and UNI/USD on Ethereum Mainnet.  
- Feed Addresses:
  - ETH: `0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419`  
  - BTC: `0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c`  
  - LINK: `0x2c1d072e956AFFC0D435Cb7AC38EF18d24d9127c`  
  - UNI: `0x553303d460EE0afB37EdFf9bE42922D8FF63220e`  
- Updates every **30 seconds** with React Query (`refetchInterval`).  
- **Simulated ±0.5% fluctuations** to mimic real-time activity.  
- Color-coded percentage change (+green / –red).    

---

### 2. Historical Price Charts
- **API**: CoinGecko (`/coins/{coinId}/market_chart`).  
- Supports **2d / 7d / 30d** historical views.  
- Charts rendered with **Chart.js**.    

---

### 3. Secure Wallet Integration
- **Library**: Wagmi + ethers.js  
- Features:
  - Connect Ethereum wallet (MetaMask, WalletConnect, etc.)  
  - View **wallet address** (truncated on mobile)

---

### 4. Authentication (Firebase)
- Providers: **Google**  
- Handled via Firebase Authentication.  
- User session persistence with `AuthProvider.tsx`.  

---

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS  
- **Web3**: Wagmi, ethers.js, Chainlink  
- **APIs**: Chainlink (live prices), CoinGecko (charts)  
- **Auth**: Firebase Authentication  
- **State Management**: tanstackQuery  
- **Charts**: Chart.js    

---

## 🧩 Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/your-username/token-dashboard.git
cd real-time-token
````

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Variables

Create a `.env` file in the root directory:

```env
VITE_COIN_GECKO_API=
VITE_INFURA_KEY=
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
```

### 4. Run Development Server

```bash
npm run dev
# or
yarn dev
```

### 5. Build for Production

```bash
npm run build
```

---


