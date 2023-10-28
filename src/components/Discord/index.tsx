"use client";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const Discord = () => {
  const { data: session } = useSession();
  const [isDisordAuth, setDiscordAuth] = useState<boolean>(false);

  useEffect(() => {
    setDiscordAuth(!!session?.user);
  }, [session]);

  return (
    <section className="discord w-48 flex flex-col gap-1">
      <div className="flex gap-1 items-center">
        <p>Discord:</p>
        {isDisordAuth && (
          <button
            className="px-2 py-1 text-xs rounded shadow border text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        )}
      </div>
      {isDisordAuth ? (
        <p className="text-center px-4 py-2 rounded shadow border border-green-500 text-green-500 font-medium">
          Hello, {session?.user?.name}
        </p>
      ) : (
        <button
          onClick={() => signIn("discord")}
          className=" px-4 py-2 rounded shadow border border-[#7289da] text-[#7289da] hover:bg-[#7289da] hover:text-white font-medium"
        >
          Sign In with Discord
        </button>
      )}
    </section>
  );
};

export default Discord;
