"use client";
import { ReactNode, Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { LocalState } from "../localState.ts/localState";
import Loader from "../Loader";

function CallbackContent() {
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
            { headers: { "Content-Type": "application/json" } }
          )
          .then((res) => {
            console.log("Éxito obteniendo token:", res.data);
            const { access_token, refresh_token } = res.data;

            if (!access_token || !refresh_token) {
              throw new Error("No se recibieron tokens de Spotify");
            }

            return axios.put(
              "/api/session",
              {
                accessToken: access_token,
                refreshToken: refresh_token,
                sessionId,
                guestEmail,
              },
              { headers: { "Content-Type": "application/json" } }
            );
          })
          .then(() => {
            console.log("Éxito actualizando sesión");
            setSuccess(true);
          })
          .catch((err: Error) => {
            console.error(
              "Error en autenticación o actualización de sesión",
              err
            );
            setSuccess(false);
          });
      }
    }, 4000);
  }, [isReady, code, sessionId, guestEmail]);

  return (
    <Loader
      active={success === null}
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

export default function Callback() {
  const LoaderDescription: ReactNode = <div>Procesando autenticación</div>;

  return (
    <Suspense fallback={<Loader active={true} renderDescription={() => LoaderDescription}/>}>
      <CallbackContent />
    </Suspense>
  );
}

