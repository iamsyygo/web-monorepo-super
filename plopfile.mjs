import storePinia from './plop/config/store_pinia.js';
import pageVue from './plop/config/page_vue.js';
import initVue from './plop/config/init_vue.js';

export default function (plop) {
  // init vue plop config
  plop.setGenerator('init', initVue);
  // create a store generator for pinia
  plop.setGenerator('store', storePinia);
  // create a page generator for vue、router、api
  plop.setGenerator('page', pageVue);
}
