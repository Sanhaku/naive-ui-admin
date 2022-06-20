import { User } from "@/model/user";

const baseUrl = "http://x.x.x.x:xxxx/api/v1/";

async function getUser(userId: string): Promise<User> {
  let url = baseUrl + "users/" + userId; // get
  return new User();
}

async function listUsers(): Promise<User[]> {
  let url = baseUrl + "users"; // get
  return [];
}

async function updateUser(user: User): Promise<User> {
  let url = baseUrl + "users"; // put
  let body = user;
  return new User();
}

export { baseUrl, getUser, listUsers, updateUser };
