"use client";
import { testWalletAddress } from "@/utils/const";
import { verifyNFT } from "@/utils/verifyNFT";
import {
  XCircleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";

import { MetamaskProvider } from "@rarimo/providers-evm";
import { useProvider } from "@rarimo/react-provider";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Props {
  setWallet: (arg0: string | undefined) => void;
  verified: boolean;
  setVerified: (arg0: boolean) => void;
  redirect: () => void;
  isRedirected: boolean;
}

const Wallet = ({
  verified,
  isRedirected,
  setWallet,
  setVerified,
  redirect,
}: Props) => {
  const { provider, connect } = useProvider(MetamaskProvider);
  const [address, setAddress] = useState<string | undefined>();
  // verifying
  const [loading, setLoading] = useState<boolean>(false);

  const verifyNFTInWallet = (walletAddress: string) => {
    setLoading(true);
    console.log("verifying");

    verifyNFT(isRedirected ? testWalletAddress : walletAddress)
      .then((resp) => resp.json())
      .then(({ data }) => {
        console.log(data);

        if (data.users?.length > 0) setVerified(true);
        setLoading(false);
      });
  };
  // PoH contract token:   0x0151A3BC48acEE7840F8B07fAae83020dFb057d2
  // 1. login with metamask
  // 2. check if wallet has the nft
  // 3. if not, redirect to get one
  // 4. if so, grant the role

  useEffect(() => {
    if ("address" in provider) {
      setAddress(provider.address);
      setWallet(provider.address);
      if (!loading) verifyNFTInWallet(provider.address!);
    }
  }, [provider.address]);

  return (
    <section className="wallet w-48 flex flex-col gap-1 justify-center">
      <div className="flex justify-between items-center">
        <p className="flex gap-1 items-center">
          Your wallet:{" "}
          {verified ? (
            <CheckCircleIcon className="w-5 text-green-500" />
          ) : (
            <XCircleIcon className="text-red-500 w-5"></XCircleIcon>
          )}
        </p>
        {loading ? (
          <p className="text-xs ">loading</p>
        ) : verified ? (
          <p className="text-green-500 font-medium">Verified</p>
        ) : (
          address &&
          (isRedirected ? (
            <button
              onClick={() => {
                redirect();
                verifyNFTInWallet(address);
              }}
              className="text-xs text-blue-500 underline"
            >
              Reload
            </button>
          ) : (
            <div className="relative px-2 py-1 rounded shadow border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white">
              <a
                className="flex items-center gap-1 peer/label"
                href="https://robotornot.rarimo.com/"
                onClick={redirect}
              >
                <p className="text-xs">Verify</p>
                <InformationCircleIcon className="w-5" />
              </a>
              {/* hover card */}
              <div className="absolute top-8 -right-4 opacity-0 peer-hover/label:opacity-100">
                {/* card */}
                <div className="text-center p-2 rounded shadow border bg-white text-black w-64 border-black">
                  <p className="">
                    Our records indicate you are not a human yet!
                  </p>
                  <p>
                    Click to prove us otherwise and come back to get the role 👀
                  </p>
                </div>
                {/* /card */}
              </div>
              {/* hover card */}
            </div>
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
