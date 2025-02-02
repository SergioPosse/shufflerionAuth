import { LocalStateProps } from "./interfaces";
import Cookies from "js-cookie";


export class LocalState {
  constructor() {}
  public static setSession(session: LocalStateProps) {
    if(!session.guestEmail || !session.sessionId) return false
    if (session.sessionId) {
      Cookies.set("sessionId", session.sessionId, { expires: 7 });
    }
    if (session.guestEmail) {
      Cookies.set("guestEmail", session.guestEmail, { expires: 7 });
    }
    return true
  }

  public static getSession(){
    const sessionId = Cookies.get("sessionId")
    const guestEmail = Cookies.get("guestEmail")
    return {sessionId, guestEmail}
  }
}