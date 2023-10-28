import { verifyNFTurl } from "./const";

export const verifyNFT = async (walletAddress: string) => {
  const data = {
    query: `
    query info($address: String!) {
        users(where:{senderAddr: $address}){
            id
        }
    }
    `,
    variables: { address: walletAddress },
  };

  return fetch(verifyNFTurl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};
