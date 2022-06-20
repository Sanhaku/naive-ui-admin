import { http } from '@/utils/http/axios';

export function createContribution(params) {
  return http.request(
    {
      url: '/contributions',
      method: 'POST',
      params,
    },
    {
      withToken: true,
    }
  );
}

export function UpdateContribution(params) {
  return http.request(
    {
      url: '/contributions',
      method: 'PUT',
      params,
    },
    {
      withToken: true,
    }
  );
}

export function showContribution(id) {
  return http.request({
    url: '/contributions/common/' + id,
    method: 'GET',
  });
}

export function listContributionsOfContributor() {
  return http.request(
    {
      url: '/contributions/user',
      method: 'GET',
    },
    {
      withToken: true,
    }
  );
}

export function listContributionsOfConference(id) {
  return http.request(
    {
      url: '/contributions/conference/' + id,
      method: 'GET',
    },
    {
      withToken: true,
    }
  );
}
