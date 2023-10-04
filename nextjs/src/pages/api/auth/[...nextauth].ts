import { API_URL } from "@/contants/URLS";
import { useCartStore } from "@/hook/useCountStore";
import NextAuth, { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

async function fetchUserCart(userId: any, token: any) {
  const cartString = await fetch(`${API_URL}/carts/customer/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const cart = await cartString.json();
  useCartStore.getState().getDataServer(cart, userId);
  return cart;
}

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const res = await fetch(`${API_URL}/customers/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.username,
            password: credentials?.password,
          }),
        });

        const userInfo = await res.json();
        if (userInfo) {
          const userString = await fetch(`${API_URL}/customers/login/profile`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userInfo.token}`,
            },
          });

          const user = await userString.json();

          user.token = userInfo.token;
          user.refreshToken = userInfo.refreshToken;

          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,

  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        console.log(`🎶🎶🎶.. 123`);
        // Note, that `session` can be any arbitrary object, remember to validate it!
        token = { ...token, ...session };
      }
      return { ...token, ...user };
    },
    async session({ session, token }) {
      console.log(`🎶🎶🎶.. 123`);
      const carts = await fetchUserCart(token?._id, token?.token);
      session.carts = carts.cart;
      session.user = token as any;

      return session;
    },
  },
};
export default NextAuth(authOptions);
