import { Conference } from "@/model/conference";
import { Contribution } from "@/model/contribution";
import { baseUrl } from "./common";

async function listConferences(): Promise<Conference[]> {
  let url = baseUrl + "conferences"; // get
  return [];
}

async function getConference(conferenceId: string): Promise<Conference> {
  let url = baseUrl + "conferences/" + conferenceId; // get
  return new Conference();
}

async function createContribution(ctb: Contribution): Promise<Contribution> {
  let url = baseUrl + "contributions"; // post
  let body = ctb;
  return new Contribution();
}

async function updateContribution(ctb: Contribution): Promise<Contribution> {
  let url = baseUrl + "contributions"; // put
  let body = ctb;
  return new Contribution();
}

/**
 * Server should infer user id from token and
 * judge whether the user id is eaual to userId.
 * @param userId is contributor's user id
 */
async function listContributions(userId: string): Promise<Contribution[]> {
  let url = baseUrl + "contributions/contributors/" + userId; // get
  return [];
}

async function getContribution(contributionId: string): Promise<Contribution> {
  let url = baseUrl + "contributions/contributors/" + contributionId; // get
  return new Contribution();
}

export {
  listConferences,
  getConference,
  createContribution,
  updateContribution,
  listContributions,
  getContribution,
};
