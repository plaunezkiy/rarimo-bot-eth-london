"use server";
import { DiscordUser } from "@/types/records";
import prisma from "../../prisma/client";

export const getByDiscordOrCreate = async ({ id, username }: DiscordUser) => {
  const record = await prisma.records.findFirst({
    where: {
      discord_id: id,
      discord_username: username,
      server_id: process.env.SERVER_ID,
    },
  });
  if (record) return record;
  return await prisma.records.create({
    data: {
      server_id: process.env.SERVER_ID!,
      discord_username: username,
    },
  });
};

export const getByWalletOrCreate = async (address: string) => {
  const record = await prisma.records.findFirst({
    where: {
      wallet_address: address,
      server_id: process.env.SERVER_ID,
    },
  });
  if (record) return record;
  return await prisma.records.create({
    data: {
      server_id: process.env.SERVER_ID!,
      wallet_address: address,
    },
  });
};

export const updateRecord = async ({
  record_id,
  data: { discordUser, address, isVerified, isRedirected, completed },
}: {
  record_id: string;
  data: {
    discordUser?: DiscordUser;
    address?: string;
    isVerified?: boolean;
    isRedirected?: boolean;
    completed?: boolean;
  };
}) => {
  return await prisma.records.update({
    where: { id: record_id },
    data: {
      discord_id: discordUser?.id,
      discord_username: discordUser?.username,
      wallet_address: address,
      is_verified: isVerified,
      is_redirected: isRedirected,
      completed: completed,
    },
  });
};
