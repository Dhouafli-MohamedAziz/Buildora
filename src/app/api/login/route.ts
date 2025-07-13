import mysql from 'mysql2/promise' ; 
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { createAccessToken, createRefreshToken } from '@/app/lib/jwt';
// database connection
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || undefined,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
  });

  
  export async function POST(request : Request) {
    try {
        const {email , password} = await request.json() ;
        
        //validate the input 
        if (!email || !password) {
            return NextResponse.json (
                {message: "email and password are required"},
                {status: 400}
            );
        }

        //check if the user exists 
        const [users] = await pool.execute("SELECT * FROM users WHERE email = ?", [email.toLowerCase()]) as any;

        if (Array.isArray(users) && users.length === 0) {
            return NextResponse.json (
                {message: "Email does not exist"}, {status: 400} 
            );
        }

        const user = users[0];
        
        // Compare the input password with the stored hash
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            return NextResponse.json(
                {message: "Invalid password"}, {status: 400}
            );
        }

        // Generate JWT access and refresh tokens
        const accessToken = await createAccessToken(
            user.id.toString(),
            user.email,
            user.role ? user.role.toString() : undefined
        );
        
        const refreshToken = await createRefreshToken(user.id.toString());

        // Set HTTP-only cookies with both tokens
        const response = NextResponse.json(
            {
                message: "Login successful",
                user: {
                    id: user.id,
                    email: user.email,
                    username: user.username
                }
            }, 
            {status: 200}
        );

        // Set secure HTTP-only cookies
        response.cookies.set('access_token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60, // 15 minutes in seconds
            path: '/'
        });

        response.cookies.set('refresh_token', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
            path: '/'
        });

        return response;

    }
    catch (error){
        console.error("Failed to login:", error)
        return NextResponse.json(
            { message: 'Failed to login' },
            { status: 500 }
          );

    }
  }