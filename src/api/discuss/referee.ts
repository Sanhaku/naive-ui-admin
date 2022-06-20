import { Conference } from "@/model/conference";
import { Contribution, ContributionStatus } from "@/model/contribution";
import { baseUrl } from "./common";
import { getConference } from "./contributor";

/**
 * Server should infer user id from token and
 * judge whether the user id is eaual to userId.
 * @param userId is refere's user id
 */
async function listConferences(userId: string): Promise<Conference[]> {
  let url = baseUrl + "conferences/referees/" + userId; // get
  return [];
}

/**
 * Server should infer user id from token and
 * judge whether the user id is eaual to userId.
 * @param userId is refere's user id
 * @returns each Contribution's userId and contributors are empty
 */
async function listContributions(
  userId: string,
  conferenceId: string
): Promise<Contribution[]> {
  let url =
    baseUrl +
    "contributions/referees/" +
    userId +
    "/conferences/" +
    conferenceId; // get
  return [];
}

/**
 * @returns Contribution's userId and contributors are empty
 */
async function getContribution(contributionId: string): Promise<Contribution> {
  let url = baseUrl + "contributions/referees/" + contributionId; // get
  return new Contribution();
}

/**
 * @returns Contribution's userId and contributors are empty
 */
async function updateContribution(
  contributionId: string,
  comment: string,
  status: ContributionStatus
): Promise<Contribution> {
  let url = baseUrl + "contributions/referees/" + contributionId; // put
  let body = {
    comment,
    status,
  };
  return new Contribution();
}

export {
  listConferences,
  getConference,
  listContributions,
  getContribution,
  updateContribution,
};
