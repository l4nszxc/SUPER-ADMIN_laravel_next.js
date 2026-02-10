import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Get the token from cookies to call backend logout
    const token = request.cookies.get('access_token')?.value;

    // Call backend logout endpoint if token exists
    if (token) {
      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/logout`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error('Backend logout error:', error);
        // Continue with clearing cookies even if backend logout fails
      }
    }

    // Clear all authentication cookies
    const nextResponse = NextResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 }
    );

    nextResponse.cookies.delete('access_token');
    nextResponse.cookies.delete('token_type');

    // Also clear localStorage
    // Note: This happens on the client side, not here

    return nextResponse;
  } catch (error) {
    console.error('Logout API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
