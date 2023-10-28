"use client";
import { verifyNFT } from "@/utils/verifyNFT";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { MetamaskProvider } from "@rarimo/providers-evm";
import { useProvider } from "@rarimo/react-provider";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Wallet = () => {
  const { provider, connect } = useProvider(MetamaskProvider);
  const [address, setAddress] = useState<string | undefined>();
  // verifying
  const [redirected, setRedirected] = useState<boolean>(false); // has the user already been redirected?
  const [loading, setLoading] = useState<boolean>(false);
  const [hasNFT, setNFT] = useState<boolean>(false);

  const verifyNFTInWallet = (walletAddress: string) => {
    setLoading(true);

    verifyNFT(walletAddress)
      .then((resp) => resp.json())
      .then(({ data }) => {
        console.log(data);

        if (data.users?.length > 0) setNFT(true);
      });

    setLoading(false);
  };
  // PoH contract token:   0x0151A3BC48acEE7840F8B07fAae83020dFb057d2
  // 1. login with metamask
  // 2. check if wallet has the nft
  // 3. if not, redirect to get one
  // 4. if so, grant the role

  useEffect(() => {
    if ("address" in provider) {
      console.log("ad", loading);
      setAddress(provider.address);
      if (!loading) verifyNFTInWallet(provider.address!);
    }
  }, [provider.address]);

  return (
    <section className="wallet w-48 flex flex-col gap-1 justify-center">
      <div className="flex gap-2 items-center">
        <p>Your wallet: </p>

        {loading ? (
          <p>loading</p>
        ) : hasNFT ? (
          <p className="text-green-500">Verified</p>
        ) : (
          address &&
          (redirected ? (
            <p>Reload</p>
          ) : (
            <a
              href="https://robotornot.rarimo.com/"
              className="px-2 py-1 rounded shadow border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white flex items-center gap-1 cursor-pointer group"
              onClick={() => setRedirected(true)}
            >
              <p className="text-xs">Verify</p>
              <div className="relative">
                <InformationCircleIcon className="w-5" />
                {/* hover card */}
                <div className="absolute top-8 -right-4 group-hover:opacity-100 opacity-0">
                  {/* card */}
                  <div className="text-center p-2 rounded shadow border bg-white text-black w-64 border-black">
                    <p className="">
                      Our records indicate you are not a human yet!
                    </p>
                    <p>Click to prove us otherwise and come back.</p>
                  </div>
                  {/* /card */}
                </div>
                {/* hover card */}
              </div>
            </a>
          ))
        )}
      </div>
      {address ? (
        <p className="text-center px-4 py-2 rounded shadow border border-[#7289da] text-[#7289da] font-medium">
          {address.slice(0, 4)}...{address.slice(-4)}
        </p>
      ) : (
        <button
          onClick={connect}
          className="px-4 py-2 rounded shadow border border-[#7289da] text-[#7289da] hover:bg-[#7289da] hover:text-white font-medium"
        >
          Verify your wallet
        </button>
      )}
    </section>
  );
};

export default Wallet;
