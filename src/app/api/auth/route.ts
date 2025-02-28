import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  const SPOTIFY_AUTH_URL = process.env.SPOTIFY_TOKEN_URL!
  const SPOTIFY_TOKEN_GRANT_TYPE=process.env.SPOTIFY_TOKEN_GRANT_TYPE!
  try {
    const body = await req.json();
    const { code, sessionId, guestEmail } = body;

    if (!code || !sessionId || !guestEmail) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const response = await axios.post(SPOTIFY_AUTH_URL, new URLSearchParams({
      grant_type: SPOTIFY_TOKEN_GRANT_TYPE,
      code,
      redirect_uri: process.env.NEXT_PUBLIC_SPOTIFY_AUTH_REDIRECT_URI!,
      client_id: process.env.SPOTIFY_CLIENT_ID!,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET!,
    }));

    const { access_token, refresh_token } = response.data;

    return NextResponse.json({ access_token, sessionId, guestEmail, refresh_token }, { status: 200 });
  } catch (error) {
    console.error("Error al obtener token de Spotify:", error);
    return NextResponse.json({ error: "Error fetching access token" }, { status: 500 });
  }
}
