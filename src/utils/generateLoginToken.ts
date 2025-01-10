import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookie";

export const GenerateLoginToken = () => {
  const uniqueToken = uuidv4();

  Cookies.set("auth_token", uniqueToken, {
    expires: 1000 * 60 * 10,
    secure: true,
    sameSite: "Strict",
  });
};
