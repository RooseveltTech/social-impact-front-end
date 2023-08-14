import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import { getCsrfToken, signIn, signOut } from "next-auth/react"

export const options: NextAuthOptions = {
    providers : [
        CredentialsProvider({
            name: "Sign in",
            credentials: {
                email: { label: "Email", type: "text"},
                password: {  label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                try {
                    const res = await fetch(process.env.BASE_URL + "/auth/login/", {
                        method: "POST",
                        body: JSON.stringify({
                            email: credentials?.email,
                            password: credentials?.password
                        }),
                        headers: {
                        "content-type": "application/json",
                        },
                    })
                    const user = await res.json()
                    console.log(user)
                    // If no error and we have user data, return it
                    if (res.ok && user) {
                        // console.log(user)
                        return user
                    }else{
                        // Return null if user data could not be retrieved
                        return user
                        // throw new Error( JSON.stringify({ errors: user.errors, status: false }))
                    }
                    
                    
                    
                } catch (err) {
                    console.log(err);
                }
            }
        }),
    ],
    pages : {
        signIn: '/login',
    },
    callbacks : {
        async jwt({token, user, session}) {
            return {...token, ...user, ...session}
        },
        async session({session, token, user}) {
            // session.user = token.access;
            return {...session, ...token, ...user}
            // return session
        }
    }
}