import { baseUrl } from "./common";

/**
 * @throws NotAuthedError if old password is wrong.
 * @param oldPassword min len: 6, max len: 20
 * @param newPassword min len: 6, max len: 20
 */
async function changeUserPassword(
  oldPassword: string,
  newPassword: string
): Promise<void> {
  let url = baseUrl + "password/users"; // put
  let body = {
    oldPassword,
    newPassword,
  };
  return;
}

/**
 * @throws NotAuthedError if old password is wrong.
 * @param oldPassword min len: 6, max len: 20
 * @param newPassword min len: 6, max len: 20
 */
async function changeAdminPassword(
  oldPassword: string,
  newPassword: string
): Promise<void> {
  let url = baseUrl + "password/admin"; // put
  let body = {
    oldPassword,
    newPassword,
  };
  return;
}

export { changeUserPassword, changeAdminPassword };
