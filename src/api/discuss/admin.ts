import { Conference } from "@/model/conference";
import { baseUrl, getUser, listUsers } from "./common";
import { getConference, listConferences } from "./contributor";

async function createConference(cfe: Conference): Promise<Conference> {
  let url = baseUrl + "conferences"; // post
  let body = cfe;
  return new Conference();
}

async function updateConference(cfe: Conference): Promise<Conference> {
  let url = baseUrl + "conferences"; // put
  let body = cfe;
  return new Conference();
}

async function addReferee(
  conferenceId: string,
  userId: string
): Promise<boolean> {
  let url =
    baseUrl + "referees/conferences/" + conferenceId + "/users/" + userId; // put
  return true;
}

async function removeReferee(
  conferenceId: string,
  userId: string
): Promise<boolean> {
  let url =
    baseUrl + "referees/conferences/" + conferenceId + "/users/" + userId; // delete
  return true;
}

export {
  listConferences,
  getConference,
  createConference,
  updateConference,
  getUser,
  listUsers,
  addReferee,
  removeReferee,
};
