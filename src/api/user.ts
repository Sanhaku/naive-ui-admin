import { http } from '@/utils/http/axios';

export interface BasicResponseModel {
  status: number;
  data: any;
}

/**
 * @description: 用户注册
 */
export function register(params) {
  return http.request({
    url: '/users',
    method: 'POST',
    params,
  });
}

/**
 * @description: 用户登录
 */
export function login(params) {
  return http.request({
    url: '/login/user',
    method: 'POST',
    params,
  });
}
