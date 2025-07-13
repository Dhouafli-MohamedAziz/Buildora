import mysql from 'mysql2/promise' ; 
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
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
        return NextResponse.json (
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

    }
    catch (error){
        console.error("Failed to login:", error)
        return NextResponse.json(
            { message: 'Failed to login' },
            { status: 500 }
          );

    }
  }