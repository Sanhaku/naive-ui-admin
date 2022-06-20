import { User } from "@/model/user";
import { baseUrl } from "../discuss/common";

/**
 * @throws EmailExistsError if email exists
 */
async function register(user: User): Promise<User> {
  let url = baseUrl + "/users/register"; // post
  return user;
}

export { register };
