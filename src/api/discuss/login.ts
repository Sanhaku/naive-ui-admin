import { User } from "@/model/user";
import { baseUrl } from "./common";

/**
 * @throws NotAuthedError if password or account is wrong.
 */
async function loginUser(
  email: string,
  password: string
): Promise<{ user: User; token: string }> {
  let url = baseUrl + "login/user"; // post
  let body = {
    email,
    password,
  };
  return { user: new User(), token: "" };
}

/**
 * @throws NotAuthedError if password or account is wrong.
 */
async function loginAdmin(
  email: string,
  password: string
): Promise<{ user: User; token: string }> {
  let url = baseUrl + "login/admin"; // post
  let body = {
    email,
    password,
  };
  return { user: new User(), token: "" };
}

export { loginUser, loginAdmin };
