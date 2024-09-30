import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { InvaliEmailPasswordError } from "./utils/error"
import { sendRequest } from "./utils/api"
import { IUser } from "./types/next-auth"

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
        strategy: "jwt"
    },
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials): Promise<any> => {
                let user = null;
                const res = await sendRequest<IBackendRes<ILogin>>({
                    method: "POST",
                    url: "http://localhost:8081/api/v1/auths/login",
                    body: {
                        username: credentials.email,
                        password: credentials.password
                    }
                })
                console.log('Data :', res)
                if (res.statusCode == 400) {
                    throw new InvaliEmailPasswordError()
                }
                if (res.statusCode == 201) {
                    return {
                        access_token: res.data?.access_token
                    }
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = (user as IUser)
            }
            return token
        },
        async session({ session, token }) {
            (session.user as IUser) = token.user;
            return session
        },
        authorized: async ({ auth }) => {
            return !!auth;
        }
    },
    pages: {
        signIn: "/auth/login"
    }
})