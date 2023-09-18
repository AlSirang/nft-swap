# NFT SWAP

## Problem Statement

NFT enthusiasts lack a secure and streamlined platform to swap their digital assets with optional ETH incentives, leading to trust issues and inefficient processes.

## Solution

Create a user-friendly NFT swap platform, It allows NFT swap, optional ETH can be send along offer. It is an escrow service to enhance trust, efficiency, and accessibility in the NFT swap ecosystem.

# Folder structure

## Contracts

This folder contains the contracts, written in Solidity, for the blockchain.

### Available Scripts

```bash
npm run hh-node # runs local hardhat node
npm run deploy # Deploys contracts to local hardhat node
npx hardhat test # run tests
```

### Folder layout

```
contracts
├── mock
│   └── ERC721.sol
└── NFTExchange.sol
test
└── Exchange.test.ts
```

## Frontend

### Available Scripts

```bash
npm run install
npm run dev
npm run build
```

### Folder layout

```
  ├── public
  │   ├── icons
  │   ├── img
  ├── src
  │   ├── abi
  │   │   ├── ERC721.json
  │   │   └── exchange.json
  │   ├── components
  │   │   ├── card
  │   │   ├── collection
  │   │   ├── connectButton.tsx
  │   │   ├── etherscanLink.tsx
  │   │   ├── footer.tsx
  │   │   ├── header.tsx
  │   │   └── profile
  │   ├── configs
  │   │   ├── alchemy.config.ts
  │   │   ├── axios.config.ts
  │   │   └── contract.config.ts
  │   ├── context
  │   │   ├── offersHistoryProvider.tsx
  │   │   └── profileContextProvider.tsx
  │   ├── core
  │   │   ├── getAllCollections.ts
  │   │   └── getOffers.ts
  │   ├── middleware
  │   │   └── mongodb.ts
  │   ├── models
  │   │   ├── index.ts
  │   │   └── user.ts
  │   ├── pages
  │   │   ├── api
  │   │   │   └── create-user.ts
  │   │   ├── _app.tsx
  │   │   ├── [collection]
  │   │   │   └── [tokenId].tsx
  │   │   ├── collections
  │   │   │   └── [collection].tsx
  │   │   ├── index.tsx
  │   │   └── profile
  │   │       └── [account].tsx
  │   ├── providers
  │   │   └── rainbowKit.tsx
  │   ├── styles
  │   │   └── globals.css
  │   ├── svgIcons
  │   ├── types
  │   ├── utils
  │   │   ├── dummyCollections.ts
  │   │   ├── functions.ts
  │   │   ├── gqlQeries.ts
  │   │   └── imgSrc.ts
  │   └── views
  │       ├── homeView.tsx
  │       ├── NFTInfoView.tsx
  │       └── profileView.tsx
  ├── tailwind.config.js
  └── tsconfig.json
```

## Subgraph

This folder contains the subgraph for the contract events.

### Folder layout

```
  subgraph/
  ├── abis
  │   └── NFTExchange.json
  ├── build
  │   ├── NFTExchange
  │   │   ├── abis
  │   │   │   └── NFTExchange.json
  │   │   └── NFTExchange.wasm
  │   ├── schema.graphql
  │   └── subgraph.yaml
  ├── generated
  │   ├── NFTExchange
  │   │   └── NFTExchange.ts
  │   └── schema.ts
  ├── networks.json
  ├── package.json
  ├── schema.graphql
  ├── src
  │   └── nft-exchange.ts
  ├── subgraph.yaml
  ├── tests
  │   ├── nft-exchange.test.ts
  │   └── nft-exchange-utils.ts
  ├── tsconfig.json
  └── yarn.lock
```
