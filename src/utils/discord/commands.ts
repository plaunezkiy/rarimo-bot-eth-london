/**
 * Share command metadata from a common spot to be used for both runtime
 * and registration.
 *
 * @see https://discord.com/developers/docs/interactions/application-commands#registering-a-command
 */

import { ApplicationCommandType } from "discord-api-types/v10";

export const PING_COMMAND = {
  name: "ping",
  description: "Ping pong! I'll respond with pong.",
} as const;

export const INVITE_COMMAND = {
  name: "invite",
  description: "Get an invite link to add this bot to your server",
} as const;

export const HELP_COMMAND = {
    name: "help",
    description: ""
} as const;

export const CONFIGURE_ROLE = {
    name: "configure_role",
    description: ""
} as const;

export const CONFIGURE_DM_PROMPT = {
    name: "configure_dm_prompt",
    description: ""
} as const;

export const CONFIGURE_DM_MESSAGE = {
    name: "configure_dm_message",
    description: ""
} as const;

export const VERIFY = {
    name: "verify",
    description: ""
} as const;

export const SUPPORT = {
    name: "support",
    description: ""
} as const;

export const commands = {
  ping: PING_COMMAND,
  invite: INVITE_COMMAND,
  help: HELP_COMMAND,
  configure_role: CONFIGURE_ROLE,
  configure_dm_prompt: CONFIGURE_DM_PROMPT,
  configure_dm_message: CONFIGURE_DM_MESSAGE,
  verify: VERIFY,
  support: SUPPORT,
} as const;
