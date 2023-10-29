export type DiscordUser = {
  id: string;
  username: string;
};

export type Record = {
  id?: string;
  server_id: string;
  discord_id?: string | null;
  discord_username?: string | null;
  wallet_address?: string | null;
  is_redirected: boolean;
  is_verified: boolean;
  completed: boolean;
};
