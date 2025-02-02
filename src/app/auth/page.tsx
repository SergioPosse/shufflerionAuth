"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { LocalState } from "../localState.ts/localState";
import { Loader } from "../Loader";

export default function Callback() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);
  const [guestEmail, setGuestEmail] = useState<string | undefined>(undefined);
  const [isReady, setIsReady] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);

  useEffect(() => {
    const session = LocalState.getSession();

    if (session.sessionId) {
      setSessionId(session.sessionId);
    }
    if (session.guestEmail) {
      setGuestEmail(session.guestEmail);
    }
  }, []);

  useEffect(() => {
    if (sessionId && guestEmail) {
      setIsReady(true);
    }
  }, [sessionId, guestEmail]);

  useEffect(() => {
    setTimeout(() => {
      if (isReady && code) {
        axios
          .post(
            "/api/auth",
            { code, sessionId, guestEmail },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then(() => {
            console.log("Éxito promise");
            setSuccess(true);
          })
          .catch((err: Error) => {
            console.log("Error promise", err);
            setSuccess(false);
          });
      }
    }, 4000)
  }, [isReady, code, sessionId, guestEmail]);
  return (
    <Loader
      active={success === null ? true : false}
      renderDescription={() => (
        <div>
          {success === null && <p>Procesando autenticación...</p>}
          {success === true && <div>✅ ¡Éxito!</div>}
          {success === false && <div>❌ Error autenticando</div>}
        </div>
      )}
    />
  );
}
