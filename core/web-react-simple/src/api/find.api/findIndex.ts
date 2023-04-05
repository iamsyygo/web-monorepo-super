import { axios } from '@/utils';

/**
 * @description 获取首页发现入口列表
 * @return {void}
 */
export const findIndex = () => {
  return axios.get(`/api/homepage/dragon/ball`);
};
