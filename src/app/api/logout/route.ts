import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json(
    { message: 'Logged out successfully' },
    { status: 200 }
  );

  // Clear both access and refresh token cookies
  response.cookies.delete('access_token');
  response.cookies.delete('refresh_token');

  return response;
} 