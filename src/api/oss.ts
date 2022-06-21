import { http } from '@/utils/http/axios';

export function getUploadUrl(params) {
  return http.request(
    {
      url: '/oss/upload',
      method: 'POST',
      params,
    },
    {
      withToken: true,
    }
  );
}

export function getDownloadUrl(params) {
  return http.request(
    {
      url: '/oss/download',
      method: 'POST',
      params,
    },
    {
      withToken: true,
    }
  );
}
