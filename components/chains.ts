
interface ChainConfig {
  chainId: string;
  rpcEndpoint: string;
  restEndpoint: string;
  chainIcon?: string;
}

export const COSMOS_HUB: ChainConfig = {
  chainId: "cosmoshub-4",
  rpcEndpoint: "https://cosmos-rpc.publicnode.com",
  restEndpoint: "https://cosmos-rest.publicnode.com",
  chainIcon: "/cosmos.svg",
};

export const OSMOSIS: ChainConfig = {
  chainId: "osmosis-1",
  rpcEndpoint: "https://osmosis-rpc.publicnode.com",
  restEndpoint: "https://osmosis-rest.publicnode.com",
};

export const AKASH: ChainConfig = {
    chainId: "akashnet-2",
    rpcEndpoint: "https://akash-rpc.publicnode.com",
    restEndpoint: "https://akash-rest.publicnode.com",
  };

  export const REGEN: ChainConfig = {
    chainId: "regen-1",
    rpcEndpoint: "https://regen-rpc.publicnode.com",
    restEndpoint: "https://regen-rest.publicnode.com",
  };

  export const OMNIFLIX: ChainConfig = {
    chainId: "omniflixhub-1",
    rpcEndpoint: "https://omniflix-rpc.publicnode.com",
    restEndpoint: "https://omniflix-rest.publicnode.com",
  };

  export const IRIS: ChainConfig = {
    chainId: "irishub-1",
    rpcEndpoint: "https://iris-rpc.publicnode.com",
    restEndpoint: "https://iris-rest.publicnode.com",
  };

  export const JUNO: ChainConfig = {
    chainId: "juno-1",
    rpcEndpoint: "https://juno-rpc.publicnode.com",
    restEndpoint: "https://juno-rest.publicnode.com",
  };

  export const SENTINEL: ChainConfig = {
    chainId: "sentinelhub-2",
    rpcEndpoint: "https://sentinel-rpc.publicnode.com",
    restEndpoint: "https://sentinel-rest.publicnode.com",
  };

  export const CRYPTOORG: ChainConfig = {
    chainId: "crypto-org-chain-mainnet-1",
    rpcEndpoint: "https://crypto-org-rpc.publicnode.com",
    restEndpoint: "https://crypto-org-rest.publicnode.com",
  };

  export const STRIDE: ChainConfig = {
    chainId: "stride-1",
    rpcEndpoint: "https://stride-rpc.publicnode.com",
    restEndpoint: "https://stride-rest.publicnode.com",
  };

  export const COREUM: ChainConfig = {
    chainId: "coreum-mainnet-1",
    rpcEndpoint: "https://coreum-rpc.publicnode.com",
    restEndpoint: "https://coreum-rest.publicnode.com",
  };

  export const INJECTIVE: ChainConfig = {
    chainId: "injective-1",
    rpcEndpoint: "https://injective-rpc.publicnode.com",
    restEndpoint: "https://injective-rest.publicnode.com",
  };

  export const CELESTIA: ChainConfig = {
    chainId: "celestia",
    rpcEndpoint: "https://celestia-rpc.publicnode.com",
    restEndpoint: "https://celestia-rest.publicnode.com",
  };