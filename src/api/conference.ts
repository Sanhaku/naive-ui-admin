import { http } from '@/utils/http/axios';

export function listAllConferences() {
  return http.request({
    url: '/conferences',
    method: 'GET',
  });
}

export function showConference(id) {
  return http.request({
    url: `/conferences/${id}`,
    method: 'GET',
  });
}
