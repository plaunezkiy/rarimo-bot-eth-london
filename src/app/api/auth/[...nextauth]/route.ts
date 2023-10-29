import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { AuthOptions } from "next-auth";

const NextAuthOptions: AuthOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    DiscordProvider({
      clientId: process.env.CLIENT_ID as string,
      clientSecret: process.env.CLIENT_SECRET as string,
    }),
  ],

  // When the user signs in, get their token
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.userId = account.providerAccountId;
      }
      return token;
    },

    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      // @ts-ignore
      session.user.id = token.userId;
      return session;
    },
  },
};

const handler = NextAuth(NextAuthOptions);

export { handler as GET, handler as POST };
