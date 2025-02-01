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

  useEffect(() => {
    // Recuperamos las cookies que guardamos previamente
    const sessionIdFromCookie = Cookies.get("sessionId");
    const guestEmailFromCookie = Cookies.get("guestEmail");

    if (sessionIdFromCookie) {
      setSessionId(sessionIdFromCookie);
    }
    if (guestEmailFromCookie) {
      setGuestEmail(guestEmailFromCookie);
    }
  }, []); // Este useEffect se ejecuta solo una vez, cuando el componente se monta

  useEffect(() => {
    if (sessionId && guestEmail) {
      setIsReady(true); // Marcamos como listo cuando sessionId y guestEmail están disponibles
    }
  }, [sessionId, guestEmail]);

  useEffect(() => {
    if (isReady && code) {
      console.log(sessionId);
      console.log(guestEmail);
      axios
        .post(
          "/api/auth",
          { code, sessionId, guestEmail },
          {
            headers: {
              "Content-Type": "application/json", // Especificar el tipo de contenido como JSON
            },
          }
        )
        .then(() => {
          console.log("Éxito promise");
          // router.push("/success");
        })
        .catch((err: Error) => {
          console.log("Error promise", err);
          // router.push("/error");
        });
    }
  }, [isReady, code, sessionId, guestEmail]);

  return <p>Procesando autenticación...</p>;
}
