import { NextRequest, NextResponse } from "next/server";
import jwt, { NotBeforeError, VerifyErrors, TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import { resetSchema } from "@/schema/auth";
import { ValidationError } from "yup";
import dbConnection from "@/utils/dbConnection";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json();
        resetSchema(true).validate(body);

        const decode = jwt.verify(body.token, process.env.JWT_SECRET);
        const userid = body.userid;


        const hashedPasswd = await bcrypt.hash(body.passwd, 10);
        const getUser = await dbConnection.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPasswd, userid]);        

        if (getUser.rowCount === 0) throw new Error('User not found');

        return new Response(JSON.stringify({ message:  'Password updated' }), { status: 200 })
    } catch (error: JsonWebTokenError | NotBeforeError | TokenExpiredError | ValidationError) {
        const errors = [JsonWebTokenError, NotBeforeError, TokenExpiredError, ValidationError]
        if (errors?.some(item => error instanceof item)) {
            return new Response(JSON.stringify({ message: error.message }), { status: 401 })
        }
        return new Response(JSON.stringify({ message: error.message }), { status: 404 })
    }
}