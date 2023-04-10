import { axios } from '@/utils';

/**
 * @description 获取首页发现入口列表
 * @return {void}
 */
export const findIndex = () => {
  return axios.get(`/api/homepage/dragon/ball`);
};

/**
 * 获取轮播
 * @param type: 0 | 1 | 2
 * @return
 */
export const findBanner = (type?: 0 | 1 | 2 | 3) => {
  return axios.get(`/api/banner`, { params: { type } });
};
