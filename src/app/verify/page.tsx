"use client";

import Discord from "@/components/Discord";
import Wallet from "@/components/Wallet";
import { roleId, serverId } from "@/utils/const";
import {
  getByDiscordOrCreate,
  getByWalletOrCreate,
  updateRecord,
} from "@/utils/records";
import { useEffect, useState } from "react";
import { DiscordUser, Record } from "@/types/records";

const VerifyPage = () => {
  const [discordUser, setDiscordUser] = useState<DiscordUser | undefined>();
  const [metamaskWallet, setMetamaskWallet] = useState<string | undefined>();
  const [verified, setVerified] = useState<boolean>(false);
  const [record, setRecord] = useState<Record | undefined>();

  const redirect = () => {
    if (record) {
      updateRecord({ record_id: record.id!, data: { isRedirected: true } });
    }
  };

  useEffect(() => {
    if (record) {
      updateRecord({
        record_id: record.id!,
        data: {
          discordUser,
          address: metamaskWallet,
          isVerified: verified,
        },
      });
      console.log(discordUser, metamaskWallet, verified);

      if (!record.completed && discordUser && metamaskWallet && verified) {
        // assign role
        fetch(
          `/api/bot/assignRole`,
          // `https://discordapp.com/api/guilds/${serverId}/members/${discordUser.id}/roles/${roleId}`,
          {
            method: "POST",
            body: JSON.stringify({ userId: discordUser.id }),
          }
        ).then((resp) => {
          if (resp.ok)
            updateRecord({
              record_id: record.id!,
              data: {
                completed: true,
              },
            }).then((_record) => setRecord(_record));
        });
        alert("Role awarded");
      }
    }
    // if no record, try to getOrCreate
    else if (discordUser) {
      getByDiscordOrCreate(discordUser).then((_record) => {
        setRecord(_record);
      });
    } else if (metamaskWallet) {
      getByWalletOrCreate(metamaskWallet).then((_record) => {
        setRecord(_record);
      });
      // const record = getByWallet(metamaskWallet);
    }
  }, [discordUser, metamaskWallet, verified]);

  return (
    <div className="w-full flex flex-col items-center gap-4 justify-center">
      <p className="text-3xl font-medium">
        Verify your identity with Rarimo and Discord
      </p>
      <div className="flex gap-8 items-end">
        <Discord setUser={setDiscordUser} />
        <Wallet
          setWallet={setMetamaskWallet}
          setVerified={setVerified}
          verified={verified}
          isRedirected={!!record?.is_redirected}
          redirect={redirect}
        />
      </div>
    </div>
  );
};

export default VerifyPage;
