// import { API_URL } from "@/contants/URLS";
// import { AuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// export const authOptions: AuthOptions = {
//   // Configure one or more authentication providers
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",

//       credentials: {
//         username: { label: "Username", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials, req) {
//         // Add logic here to look up the user from the credentials supplied
//         console.log(`🚀🚀🚀!..credentials`, credentials);
//         const res = await fetch(`${API_URL}/customers/login`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             email: credentials?.username,
//             password: credentials?.password,
//           }),
//         });

//         const userInfo = await res.json();
//         if (userInfo) {
//           const userString = await fetch(`${API_URL}/customers/login/profile`, {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${userInfo.token}`,
//             },
//           });

//           const user = await userString.json();
//           user.token = userInfo.token;
//           user.refreshToken = userInfo.refreshToken;

//           return user;
//         } else {
//           return null;
//         }
//       },
//     }),
//   ],
//   secret: process.env.NEXT_PUBLIC_SECRET,

//   pages: {
//     signIn: "/login",
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       return { ...token, ...user };
//     },
//     async session({ session, token, user }) {
//       session.user = token as any;

//       return session;
//     },
//   },
// };
