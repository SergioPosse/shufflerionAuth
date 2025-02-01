import type { NextRequest, NextResponse } from "next/server";
// import axios from "axios";

export default async function handler(req: NextRequest, res: NextResponse) {
  if (req.method === "POST") {
    try {
      const data = await req.json();  // Usamos req.json() para leer el cuerpo de la solicitud
      console.log(data);  // Ahora deberías ver el cuerpo de la solicitud correctamente

    } catch (error) {
      console.error("Error al leer el cuerpo de la solicitud:", error);
    }
  } else {
  }
}

  // const {code, sessionId, guestEmail } = data
  // if (!code || !sessionId || !guestEmail ) return res.status(400).json({ error: "Missing parameters" });
  // console.log("code from api auth: ", code)
//   try {
//     const response = await axios.post("https://accounts.spotify.com/api/token", new URLSearchParams({
//       grant_type: "authorization_code",
//       code,
//       redirect_uri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI!,
//       client_id: process.env.SPOTIFY_CLIENT_ID!,
//       client_secret: process.env.SPOTIFY_CLIENT_SECRET!
//     }));

//     const { access_token } = response.data;

//     // Aquí llamamos a tu backend para guardar el access_token
//     // await axios.post("https://tu-backend.com/api/save-token", { sessionId, guestEmail, access_token });
//     console.log('data saved mock: ', {access_token, sessionId, guestEmail})

//     return res.status(200).json({ message: "Access token saved" });
//   } catch (error) {
//     console.error("Error al obtener token de Spotify:", error);
//     return res.status(500).json({ error: "Error fetching access token" });
//   }
