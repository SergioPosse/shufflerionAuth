"use client";
import { ReactNode, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { LocalState } from "./localState.ts/localState";
import Loader from "./Loader";

const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
const REDIRECT_URI = process.env.NEXT_PUBLIC_SPOTIFY_AUTH_REDIRECT_URI!;
const AUTH_DOMAIN = process.env.NEXT_PUBLIC_SPOTIFY_AUTH_DOMAIN!;
const AUTH_SCOPE = process.env.NEXT_PUBLIC_SPOTIFY_AUTH_SCOPE!;

export default function Home() {
  const searchParams = useSearchParams();
  const sessionIdFromParam = searchParams.get("sessionId");
  const guestEmailFromParam = searchParams.get("guestEmail");

  useEffect(() => {
    if (sessionIdFromParam && guestEmailFromParam) {
      LocalState.setSession({
        sessionId: sessionIdFromParam,
        guestEmail: guestEmailFromParam,
      });
    }
  }, [sessionIdFromParam, guestEmailFromParam]);

  useEffect(() => {
    const session = LocalState.getSession();

    if (session.sessionId && session.guestEmail) {
      setTimeout(() => {
        const authUrl = `${AUTH_DOMAIN}?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
          REDIRECT_URI
        )}&scope=${encodeURIComponent(AUTH_SCOPE)}`;
        window.location.href = authUrl;
      }, 3000);
    }
  }, []);

  const HomeBody: ReactNode = <div>Redirigiendo a Spotify...</div>;

  return <Loader active={true} renderDescription={() => HomeBody} />;
}
