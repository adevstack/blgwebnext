import bcrypt from 'bcrypt'

import NextAuth, {AuthOptions} from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from '../../../lib/prismadb'

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Invalid credentials');
                }
                
                // Find user in the database by email
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                if (!user || !user.hashedPassword) {
                    throw new Error('Invalid credentials');
                }

                // Compare the password entered by user with the hashed password
                const isCorrect = await bcrypt.compare(credentials.password, user.hashedPassword);
                
                if (!isCorrect) {
                    throw new Error('Invalid credentials');
                }

                return user;
            }
        })
    ],
    pages: {
        signIn:'/'
    },
    debug:process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt',
    },
    secret:process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}