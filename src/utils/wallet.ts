import { createProvider } from "@rarimo/provider";
import { MetamaskProvider } from "@rarimo/providers-evm";

export const getMetamaskWallet = async () => {
  const provider = await createProvider(MetamaskProvider);
  console.log(provider.address);

  return provider.address;
};
