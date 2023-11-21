import { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

const AuthOptions: AuthOptions = {
  secret: process.env.SECRET,

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials, req) => {
        const user = { id: '1', name: 'J Smith', email: 'jsmith@example.com' };
        // cek user apakah ada
        // decode password dengan bcrypt
        // cek password
        if (req?.body?.username === 'admin' && req?.body?.password === 'password') {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {
    session: async ({ session, user }: any) => {
      session.user.id = user.id;
      return session;
    },
    redirect: async ({ url, baseUrl }) => {
      console.log('url', url);
      console.log('baseUrl', baseUrl);
      return baseUrl
    },
  },
};

export const handler = NextAuth(AuthOptions);

export { handler as GET, handler as POST };
