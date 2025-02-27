"use client";
import { ReactNode, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { LocalState } from "./localState.ts/localState";
import { Loader } from "./Loader";

const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
const REDIRECT_URI = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI!;

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
        const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
          REDIRECT_URI
        )}&scope=user-library-read streaming user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-private user-read-playback-position user-read-email`;
        window.location.href = authUrl;
      }, 3000);
    }
  }, []);

  const HomeBody: ReactNode = <div>Redirigiendo a Spotify...</div>;

  return <Loader active={true} renderDescription={() => HomeBody} />;
}
