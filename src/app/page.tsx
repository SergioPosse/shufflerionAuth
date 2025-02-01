"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Cookies from "js-cookie";

const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
const REDIRECT_URI = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI!;

export default function Home() {
  const searchParams = useSearchParams();
  const sessionIdFromParam = searchParams.get("sessionId");
  const guestEmailFromParam = searchParams.get("guestEmail");

  useEffect(() => {
    if (sessionIdFromParam) {
      Cookies.set("sessionId", sessionIdFromParam, { expires: 7 }); // Cookie válida por 7 días
    }
    if (guestEmailFromParam) {
      Cookies.set("guestEmail", guestEmailFromParam, { expires: 7 });
    }
  }, [sessionIdFromParam, guestEmailFromParam]);

  useEffect(() => {
    const sessionId = Cookies.get("sessionId");
    const guestEmail = Cookies.get("guestEmail");

    if (sessionId && guestEmail) {
      const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=user-read-private user-read-email`;
      window.location.href = authUrl;
    }
  }, []);

  return <p>Redirigiendo a Spotify...</p>;
}

