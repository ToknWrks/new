interface ChainConfig {
  chainId: string;
  rpcEndpoint: string;
  restEndpoint: string;
}

export const COSMOS_HUB: ChainConfig = {
  chainId: "cosmoshub-4",
  rpcEndpoint: "https://cosmos-rpc.publicnode.com",
  restEndpoint: "https://cosmos-rest.publicnode.com",
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