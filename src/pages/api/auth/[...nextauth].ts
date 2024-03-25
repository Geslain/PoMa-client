import NextAuth, {NextAuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import fetchDataApi from "@/app/helpers/fetchDataApi";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {label: "Username", type: "text"},
        password: {label: "Password", type: "password"}
      },
      async authorize(credentials) {
        try {
          const res = await fetchDataApi("/auth/login", {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {"Content-Type": "application/json"}
          })

          // Returning token to set in session
          return {id: "", token: (await res.json()).access_token}
        } catch (e) {
          // Todo implement error
          throw e
        }
      },
    })
  ],
  pages: {
    signIn: "/login", //Need to define custom login page (if using)
  },
  session: {
    strategy: 'jwt',
  },
}
export default NextAuth(authOptions)
