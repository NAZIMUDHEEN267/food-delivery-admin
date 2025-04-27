import { loginSchema } from '@/schema/auth';
import dbConnection from '@/utils/dbConnection';
import CredentialProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt'
import NextAuth, { AuthOptions } from 'next-auth';



export const authOptions: AuthOptions = {
    providers: [
        CredentialProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'email', type: 'text', placeholder: 'Email' },
                password: { label: 'password', type: 'password', placeholder: 'Password' }
            },
            async authorize(credentials: { email: string, password: string }) {

                await loginSchema.validate(credentials);

                const result = await dbConnection.query('SELECT * FROM users WHERE email = $1', [credentials.email]);

                if (result.rows.length === 0) return null

                const isPasswordCorrect = await bcrypt.compare(credentials.password, result.rows[0].password)

                if (isPasswordCorrect) {
                    const { password, ...data } = result.rows[0];
                    return data;

                } else {
                    return null;
                }
            }
        })
    ],
    session: {
        strategy: 'jwt'
    },
    secret: process.env.AUTH_SECRET
}


export default NextAuth(authOptions)