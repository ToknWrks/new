
export interface ChainConfig {
  chainName?: string;
  chainId: string;
  rpcEndpoint: string;
  restEndpoint: string;
  icon?: string;
  AddressForChain: string;
  AssetId: string;
  Denom: string;
  decimals: number;
  Symbol: string;
  gasPrice: string;
  gasMultiplier?: number;
  unbondingDays?: number;
  swapPoolId?: number; // Swap pool id to USDC
  intermediateSwapPoolId?: number;
  sourceChannel?: string; // 
  destinationChannel?: string; //  
  destinationPort?: string; //
  tipAddress?: string;
}

export const COSMOS_HUB: ChainConfig = {
  chainName: "Cosmos Hub",
  chainId: "cosmoshub-4",
  rpcEndpoint: "https://cosmos-rpc.publicnode.com",
  restEndpoint: "https://cosmos-rest.publicnode.com",
  icon: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png',
  AddressForChain: "cosmosAddress",
  AssetId: "cosmos",
  Denom: "uatom",
  decimals: 6,
  Symbol: "ATOM",
  gasPrice: '0.0025uosmo',
  gasMultiplier: 1.2,
  unbondingDays: 21,
  swapPoolId: 1282,
  sourceChannel: "channel-141", //  Source channel for Cosmos Hub
  destinationChannel: "channel-0", // 
  destinationPort: "transfer", //  
  tipAddress: "cosmos19pvdg6ut7n5kqzmsrxysln2cfedenw85t9canv",
};

export const OSMOSIS: ChainConfig = {
  chainName: "Osmosis",
  chainId: "osmosis-1",
  rpcEndpoint: "https://osmosis-rpc.publicnode.com",
  restEndpoint: "https://osmosis-rest.publicnode.com",
  icon: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.png',
  AddressForChain: "osmosisAddress",
  AssetId: "osmosis",
  Denom: "uosmo",
  decimals: 6,
  Symbol: "OSMO",
  gasPrice: '0.0025uosmo',
  gasMultiplier: 1.2,
  unbondingDays: 14,
  swapPoolId: 1464,
  tipAddress: "osmo19pvdg6ut7n5kqzmsrxysln2cfedenw85r7td97",
 
};

export const AKASH: ChainConfig = {
  chainName: "Akash",
    chainId: "akashnet-2",
    rpcEndpoint: "https://akash-rpc.publicnode.com",
    restEndpoint: "https://akash-rest.publicnode.com",
    icon: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/akash/images/akt.png',
    AddressForChain: "akashAddress",
    AssetId: "akash-network",
    Denom: "uakt",
    decimals: 6,
    Symbol: "AKT",
    gasPrice: '0.025uakt',
    gasMultiplier: 1.3,
    unbondingDays: 21,
    swapPoolId: 1301,
    sourceChannel: "channel-9", //  Source channel for Cosmos Hub
    destinationChannel: "channel-1",
    tipAddress: "akash19pvdg6ut7n5kqzmsrxysln2cfedenw85x7462k",
  };

  export const REGEN: ChainConfig = {
    chainName: "Regen",
    chainId: "regen-1",
    rpcEndpoint: "https://regen-rpc.publicnode.com",
    restEndpoint: "https://regen-rest.publicnode.com",
    icon: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/regen/images/regen.png',
    AddressForChain: "regenAddress",
    AssetId: "regen",
    Denom: "uregen",
    decimals: 6,
    Symbol: "REGEN",
    gasPrice: '0.025uregen',
    gasMultiplier: 1.3,
    unbondingDays: 21,
    swapPoolId: 1464,
    intermediateSwapPoolId: 1483,
    sourceChannel: "channel-1",
    destinationChannel: "channel-8",
    tipAddress: "regen19pvdg6ut7n5kqzmsrxysln2cfedenw8558np9g",
  };

  export const OMNIFLIX: ChainConfig = {
    chainName: "Omniflix",
    chainId: "omniflixhub-1",
    rpcEndpoint: "https://omniflix-rpc.publicnode.com",
    restEndpoint: "https://omniflix-rest.publicnode.com",
    icon: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/omniflixhub/images/flix.png',
    AddressForChain: "omniflixAddress",
    AssetId: "omniflix-network",
    Denom: "uflix",
    decimals: 6,
    Symbol: "FLIX",
    gasPrice: '0.025uflix',
    gasMultiplier: 1.3,
    unbondingDays: 21,
    swapPoolId: 1895,
    sourceChannel: "channel-1",
    destinationChannel: "channel-199",
    tipAddress: "omniflix19pvdg6ut7n5kqzmsrxysln2cfedenw85kmfyyj",
  };


  export const JUNO: ChainConfig = {
    chainName: "Juno",
    chainId: "juno-1",
    rpcEndpoint: "https://juno-rpc.publicnode.com",
    restEndpoint: "https://juno-rest.publicnode.com",
    icon: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/juno.png',
    AddressForChain: "junoAddress",
    AssetId: "juno-network",
    Denom: "ujuno",
    decimals: 6,
    Symbol: "JUNO",
    gasPrice: '0.025ujuno',
    gasMultiplier: 1.3,
    unbondingDays: 28,
    swapPoolId: 1097,
    sourceChannel: "channel-0", 
    destinationChannel: "channel-42",
    tipAddress: "juno19pvdg6ut7n5kqzmsrxysln2cfedenw85ahmx5s",
  };

  export const SENTINEL: ChainConfig = {
    chainName : "Sentinel",
    chainId: "sentinelhub-2",
    rpcEndpoint: "https://sentinel-rpc.publicnode.com",
    restEndpoint: "https://sentinel-rest.publicnode.com",
    icon: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/sentinel/images/dvpn.png',
    AddressForChain: "sentinelAddress",
    AssetId: "sentinel",
    Denom: "udvpn",
    decimals: 6,
    Symbol: "DVPN",
    gasPrice: '0.025udvpn',
    gasMultiplier: 1.3,
    unbondingDays: 21,
    swapPoolId: 5,
    sourceChannel: "channel-2", 
    destinationChannel: "channel-0", 
    destinationPort: "transfer", 
    tipAddress: "sent19pvdg6ut7n5kqzmsrxysln2cfedenw85s7wyhr",
    
  };

  export const STRIDE: ChainConfig = {
    chainName: "Stride",
    chainId: "stride-1",
    rpcEndpoint: "https://stride-rpc.publicnode.com",
    restEndpoint: "https://stride-rest.publicnode.com",
    icon: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/stride/images/strd.png',
    AddressForChain: "strideAddress",
    AssetId: "stride",
    Denom: "ustrd",
    decimals: 6,
    Symbol: "STRD",
    gasPrice: '0.025ustrd',
    gasMultiplier: 1.3,
    unbondingDays: 21,
    swapPoolId: 1243,
    sourceChannel: "channel-5", 
    destinationChannel: "channel-326", 
    destinationPort: "transfer", 
    tipAddress: "stride19pvdg6ut7n5kqzmsrxysln2cfedenw85gwcp8q",
  };


  export const COREUM: ChainConfig = {
    chainName: "Coreum",  
    chainId: "coreum-mainnet-1",
    rpcEndpoint: "https://coreum-rpc.publicnode.com",
    restEndpoint: "https://coreum-rest.publicnode.com",
    icon: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/coreum/images/coreum.png',
    AddressForChain: "coreumAddress",
    AssetId: "coreum",
    Denom: "ucore",
    decimals: 6, 
    Symbol: "CORE",
    gasPrice: '0.025ucore',
    gasMultiplier: 1.3,
    unbondingDays: 14,
    swapPoolId: 1244,
    tipAddress: "core1cwd5cnn6cqpuuxlr95klsperdqplaz5y9x3a3y",
  };

  export const INJECTIVE: ChainConfig = {
    chainName: "Injective",
    chainId: "injective-1",
    rpcEndpoint: "https://injective-rpc.publicnode.com",
    restEndpoint: "https://injective-rest.publicnode.com",
    icon: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/injective/images/inj.png',
    AddressForChain: "injectiveAddress",
    AssetId: "injective-protocol",
    Denom: "inj",
    decimals: 18,
    Symbol: "INJ",
    gasPrice: '0.00025inj',
    gasMultiplier: 1.2,
    unbondingDays: 21,
    swapPoolId: 1319,
    tipAddress: "inj1sak7ul0tqn599ktte8q9jqxmphrc6rcwc4sedx",

  };

  export const CELESTIA: ChainConfig = {
    chainName: "Celestia",
    chainId: "celestia",
    rpcEndpoint: "https://celestia-rpc.publicnode.com",
    restEndpoint: "https://celestia-rest.publicnode.com",
    icon: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/celestia/images/celestia.png',
    AddressForChain: "celestiaAddress",
    AssetId: "celestia",
    Denom: "utia",
    decimals: 6,
    Symbol: "TIA",
    gasPrice: '0.025utia',
    gasMultiplier: 1.3,
    unbondingDays: 21,
    swapPoolId: 1247,
    sourceChannel: "channel-2", 
    destinationChannel: "channel-6994", 
    destinationPort: "transfer", 
    tipAddress: "celestia19pvdg6ut7n5kqzmsrxysln2cfedenw8560fdfp",
  };

  export const STARGAZE: ChainConfig = {
    chainName: "Stargaze",
    chainId: "stargaze-1",
    rpcEndpoint: "https://stargaze-rpc.publicnode.com",
    restEndpoint: "https://stargaze-rest.publicnode.com",
    icon: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/stargaze/images/stars.png',
    AddressForChain: "stargazeAddress",
    AssetId: "stargaze",
    Denom: "ustars",
    decimals: 6,
    Symbol: "STARS",
    gasPrice: '0.025ustars',
    gasMultiplier: 1.3,
    unbondingDays: 14,
    swapPoolId: 1096,
    sourceChannel: "channel-75", 
    destinationChannel: "channel-0", 
    destinationPort: "transfer", 
    tipAddress: "stars19pvdg6ut7n5kqzmsrxysln2cfedenw85le0qca",
  };

  export const ATONE: ChainConfig = {
    chainName: "Atone",
      chainId: "atomone-1",
      rpcEndpoint: "https://atone-rpc.publicnode.com",
      restEndpoint: "https://atone-rest.publicnode.com",
      icon: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/akash/images/atomone.png',
      AddressForChain: "atoneAddress",
      AssetId: "atomeone",
      Denom: "uatone",
      decimals: 6,
      Symbol: "ATONE",
      gasPrice: '0.025uatone',
      gasMultiplier: 1.3,
      unbondingDays: 21,
      swapPoolId: 1301,
      sourceChannel: "channel-9", //  Source channel for Cosmos Hub
      destinationChannel: "channel-1",
      tipAddress: "akash19pvdg6ut7n5kqzmsrxysln2cfedenw85x7462k",
    };
    
  export const CHAINS = [COSMOS_HUB, OSMOSIS, AKASH, REGEN, CELESTIA, INJECTIVE, OMNIFLIX, SENTINEL, JUNO, STARGAZE, COREUM];
 
  // Function to get address for a chain
export const AddressesForChain = (chainName: string, wallet: any) => {
  const chain = CHAINS.find(chain => chain.chainName === chainName);
  return chain ? wallet[chain.AddressForChain] : null;
};


