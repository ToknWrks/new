// swapToUSDC.tsx
import { SigningStargateClient } from "@cosmjs/stargate";
import { osmosis } from "osmojs";
import { SwapExactAmountIn } from "osmojs/osmosis/cosmwasmpool/v1beta1/model/module_sudo_msg";

export const swapToUSDC = async (chain: any, osmosisAddress: string, swapAmount: string) => {
  try {
    console.log(`Swapping tokens on Osmosis...`);

    // Enable the Osmosis chain
    await window.keplr.enable("osmosis-1");
    const offlineSigner = window.keplr.getOfflineSigner("osmosis-1");

    const client = await SigningStargateClient.connectWithSigner(
      "https://osmosis-rpc.publicnode.com",
      offlineSigner
    );

    // Prepare the swap message
    const swapMsg = {
      typeUrl: "/osmosis.gamm.v1beta1.MsgSwapExactAmountIn",
      value: {
        sender: osmosisAddress,
        routes: [
          {
            poolId: chain.swapPoolId.toString(), // Use swapPoolId from Chains.ts
            tokenOutDenom: "uusdc",
          },
        ],
        tokenIn: {
          denom: chain.Denom, // Use the same denom as the rewards being claimed
          amount: swapAmount,
        },
        tokenOutMinAmount: "1",
      },
    };

    // Broadcast swap transaction
    const fee = {
      amount: [{ denom: "uosmo", amount: "200000" }],
      gas: "2000000",
    };

    const result = await client.signAndBroadcast(
      osmosisAddress,
      [swapMsg],
      fee,
      "Swapping tokens on Osmosis"
    );

    if (result.code !== 0) {
      throw new Error(`Failed to swap tokens: ${result.rawLog}`);
    }

    console.log(`Tokens swapped to USDC successfully`);
  } catch (error) {
    console.error(`Failed to swap tokens on Osmosis:`, error);
    throw error;
  }
};