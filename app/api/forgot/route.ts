import { ValidationError } from "yup";
import nodemailer from 'nodemailer'
import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken'

import { forgotSchema } from "@/schema/auth";
import dbConnection from "@/utils/dbConnection";


export async function POST(req: NextRequest) {

    try {
        const body = await req.json()

        await forgotSchema.validate(body);

        const checkUser = await dbConnection.query('SELECT * FROM users WHERE email = $1', [body.email]);

        if (checkUser.rows.length === 0) throw new Error('No user found');

        const token = jwt.sign({ email: body.email }, process.env.JWT_SECRET, { expiresIn: '1h' })

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        })


        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: process.env.MAIL_USER,
            subject: 'Reset password',
            html: `<!DOCTYPE html>
                    <html>
                    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                        <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px;">
                        <h2 style="text-align: center; color: #333;">Password Reset Request</h2>
                        <p>Hello ${checkUser.rows[0].name},</p>

                        <p>We received a request to reset your password. Click the button below to choose a new password:</p>

                        <div style="text-align: center; margin: 30px 0;">
                            <a 
                            href=${`http://192.168.159.107:3000/reset?token=${token}&userid=${checkUser.rows[0].id}`}
                            style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;"
                            >
                            Reset Password
                            </a>
                        </div>

                        <p>If you didn't request a password reset, you can ignore this email. Your password will stay the same.</p>

                        <p>Thanks,<br>Food delivery team</p>
                        </div>
                    </body>
                    </html>
                    `
        })

        return new Response(JSON.stringify({ message: 'Reset mail send to your mail.' }), { status: 200 })

    } catch (error: Error) {
        if (error instanceof ValidationError) {
            return new Response(error.message, { status: 400 })
        }

        return new Response(JSON.stringify({ message: error.message }), { status: 404 });
    }
}