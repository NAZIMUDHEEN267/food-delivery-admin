import { ValidationError } from "yup";
import bcrypt from 'bcrypt';
import { NextApiRequest } from "next";

import { loginSchema } from "@/schema/auth";
import dbConnection from "@/utils/dbConnection";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest, res: NextResponse) {

    try {
        const body = await req.json();

        await loginSchema.validate(body);

        const result = await dbConnection.query('SELECT * FROM users WHERE email = $1', [body.email]);

        if (result.rows.length === 0) throw new Error('No user found.')

        const isPasswordCorrect = await bcrypt.compare(body.password, result.rows[0].password)

        if (isPasswordCorrect) {
            const { password, ...data } = result.rows[0];
            return new Response(JSON.stringify(data), { status: 200 })

        } else {
            throw new Error('Email or password incorrect')
        }

    } catch (error) {
        
        if (error instanceof ValidationError) {
            return new Response(JSON.stringify({ message: error.message }), { status: 400 })
        }

        return new Response(JSON.stringify({ message: error }), { status: 404 });
    }
}