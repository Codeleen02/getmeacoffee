import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import User from "@/models/User";
import connectDb from "@/db/connectDb";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account,profile }) {
      await connectDb();

      if (!user.email) return false;

      await User.findOneAndUpdate(
        { email: user.email },
        {
          email: user.email,
          name: user.name,
          username: user.email.split("@")[0],
          profilepic: user.image,
        },
        {
          upsert: true,
          new: true,
        }
      );

      return true;
    },

    async jwt({ token, user }) {
      await connectDb();

      // Runs only once when the user signs in
      if (user) {
        const dbUser = await User.findOne({
          email: user.email,
        });

        if (dbUser) {
          token.id = dbUser._id.toString();
        }
      }

      // Always refresh the latest data from MongoDB
      if (token.id) {
        const dbUser = await User.findById(token.id);

        if (dbUser) {
          token.id = dbUser._id.toString();
          token.email = dbUser.email;
          token.username = dbUser.username;
          token.name = dbUser.name;
          token.profilepic = dbUser.profilepic;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.username = token.username;
        session.user.name = token.name;
        session.user.image = token.profilepic;
      }

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
