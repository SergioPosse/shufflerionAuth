import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { code, sessionId, guestEmail } = body;

    if (!code || !sessionId || !guestEmail) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const response = await axios.post("https://accounts.spotify.com/api/token", new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI!,
      client_id: process.env.SPOTIFY_CLIENT_ID!,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET!,
    }));

    const { access_token, refresh_token } = response.data;

    console.log("data saved mock:", { access_token, sessionId, guestEmail, refresh_token });

    return NextResponse.json({ access_token, sessionId, guestEmail, refresh_token }, { status: 200 });
  } catch (error) {
    console.error("Error al obtener token de Spotify:", error);
    return NextResponse.json({ error: "Error fetching access token" }, { status: 500 });
  }
}
