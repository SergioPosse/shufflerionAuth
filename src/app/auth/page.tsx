"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie"; // Importamos js-cookie para manejar cookies

export default function Callback() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);
  const [guestEmail, setGuestEmail] = useState<string | undefined>(undefined);
  const [isReady, setIsReady] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);


  useEffect(() => {
    const sessionIdFromCookie = Cookies.get("sessionId");
    const guestEmailFromCookie = Cookies.get("guestEmail");

    if (sessionIdFromCookie) {
      setSessionId(sessionIdFromCookie);
    }
    if (guestEmailFromCookie) {
      setGuestEmail(guestEmailFromCookie);
    }
  }, []);

  useEffect(() => {
    if (sessionId && guestEmail) {
      setIsReady(true);
    }
  }, [sessionId, guestEmail]);

  useEffect(() => {
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
          setSuccess(true)
        })
        .catch((err: Error) => {
          console.log("Error promise", err);
          setSuccess(false)

        });
    }
  }, [isReady, code, sessionId, guestEmail]);
  return (
    <div>
      {success === null && <p>Procesando autenticación...</p>}
      {success === true && <div>✅ ¡Éxito!</div>}
      {success === false && <div>❌ Error autenticando</div>}
    </div>
  );
}
