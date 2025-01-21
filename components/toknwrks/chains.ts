
interface ChainConfig {
  chainName?: string;
  chainId: string;
  rpcEndpoint: string;
  restEndpoint: string;
  icon?: string;
}

export const COSMOS_HUB: ChainConfig = {
  chainName: "Cosmos Hub",
  chainId: "cosmoshub-4",
  rpcEndpoint: "https://cosmos-rpc.publicnode.com",
  restEndpoint: "https://cosmos-rest.publicnode.com",
  icon: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png',
};

export const OSMOSIS: ChainConfig = {
  chainName: "Osmosis",
  chainId: "osmosis-1",
  rpcEndpoint: "https://osmosis-rpc.publicnode.com",
  restEndpoint: "https://osmosis-rest.publicnode.com",
  icon: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.png',
};

export const AKASH: ChainConfig = {
  chainName: "Akash",
    chainId: "akashnet-2",
    rpcEndpoint: "https://akash-rpc.publicnode.com",
    restEndpoint: "https://akash-rest.publicnode.com",
    icon: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/akash/images/akt.png',
  };

  export const REGEN: ChainConfig = {
    chainName: "Regen",
    chainId: "regen-1",
    rpcEndpoint: "https://regen-rpc.publicnode.com",
    restEndpoint: "https://regen-rest.publicnode.com",
    icon: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/regen/images/regen.png',
  };

  export const OMNIFLIX: ChainConfig = {
    chainName: "Omniflix",
    chainId: "omniflixhub-1",
    rpcEndpoint: "https://omniflix-rpc.publicnode.com",
    restEndpoint: "https://omniflix-rest.publicnode.com",
    icon: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/omniflixhub/images/flix.png',
  };

  export const IRIS: ChainConfig = {
    chainName : "Iris",
    chainId: "irishub-1",
    rpcEndpoint: "https://iris-rpc.publicnode.com",
    restEndpoint: "https://iris-rest.publicnode.com",
  };

  export const JUNO: ChainConfig = {
    chainName: "Juno",
    chainId: "juno-1",
    rpcEndpoint: "https://juno-rpc.publicnode.com",
    restEndpoint: "https://juno-rest.publicnode.com",
  };

  export const SENTINEL: ChainConfig = {
    chainName : "Sentinel",
    chainId: "sentinelhub-2",
    rpcEndpoint: "https://sentinel-rpc.publicnode.com",
    restEndpoint: "https://sentinel-rest.publicnode.com",
  };

  export const CRYPTOORG: ChainConfig = {
    chainName: "Crypto.org",
    chainId: "crypto-org-chain-mainnet-1",
    rpcEndpoint: "https://crypto-org-rpc.publicnode.com",
    restEndpoint: "https://crypto-org-rest.publicnode.com",
  };

  export const STRIDE: ChainConfig = {
    chainName: "Stride",
    chainId: "stride-1",
    rpcEndpoint: "https://stride-rpc.publicnode.com",
    restEndpoint: "https://stride-rest.publicnode.com",
  };

  export const COREUM: ChainConfig = {
    chainName: "Coreum",  
    chainId: "coreum-mainnet-1",
    rpcEndpoint: "https://coreum-rpc.publicnode.com",
    restEndpoint: "https://coreum-rest.publicnode.com",
  };

  export const INJECTIVE: ChainConfig = {
    chainName: "Injective",
    chainId: "injective-1",
    rpcEndpoint: "https://injective-rpc.publicnode.com",
    restEndpoint: "https://injective-rest.publicnode.com",
  };

  export const CELESTIA: ChainConfig = {
    chainName: "Celestia",
    chainId: "celestia",
    rpcEndpoint: "https://celestia-rpc.publicnode.com",
    restEndpoint: "https://celestia-rest.publicnode.com",
    icon: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/celestia/images/celestia.png',
  };

  export const CHAINS = [COSMOS_HUB, OSMOSIS, AKASH, REGEN, CELESTIA];