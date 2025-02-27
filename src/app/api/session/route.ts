import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { accessToken, refreshToken, sessionId, guestEmail } = body;

    if (!accessToken || !refreshToken || !sessionId || !guestEmail) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const requestData = {
      id: sessionId,
      guest: {
        email: guestEmail,
        tokens: {
          accessToken,
          refreshToken,
        },
      },
    };

    const response = await axios.put(
      "https://shufflerionserver.onrender.com/session/update",
      requestData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );


    console.log("Response update session: ", response.data);

    return NextResponse.json({ message: "guest session info updated!" }, { status: 200 });
  } catch (error) {
    console.error("Error updating session:", error);
    return NextResponse.json({ error: "Error updating guest session info!" }, { status: 500 });
  }
}
