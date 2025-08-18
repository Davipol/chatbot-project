import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET, // or `secret` env you already use
  session: {
    strategy: "jwt", // <-- important
    // maxAge: 30 * 24 * 60 * 60, // optional: 30 days
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.provider = account.provider;
      }

      return token;
    },

    async session({ session, token }) {
      session.user.provider = token.provider ?? null;
      session.user.id = token.sub ?? null;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
