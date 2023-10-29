import { roleId, serverId } from "@/utils/const";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { userId } = await request.json();
  console.log(serverId, userId, roleId);

  const res = await fetch(
    `https://discordapp.com/api/guilds/${serverId}/members/${userId}/roles/${roleId}/`,
    { method: "PUT", headers: { Authorization: `Bot ${process.env.TOKEN}` } }
  );
  console.log(await res.json());

  return NextResponse.json({ data: "ok" });
}
