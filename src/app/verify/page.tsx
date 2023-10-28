"use client";

import Discord from "@/components/Discord";
import Wallet from "@/components/Wallet";

const VerifyPage = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-3xl font-medium">
        Verify your identity with Rarimo and Discord
      </p>
      <div className="flex gap-4 items-end">
        <Discord />
        <Wallet />
      </div>
    </div>
  );
};

export default VerifyPage;
