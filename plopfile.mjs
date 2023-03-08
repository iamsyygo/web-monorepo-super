import storeCfg from './plop/config/store.js';
import pageCfg from './plop/config/page.js';
export default function (plop) {
  // create a store generator for pinia
  plop.setGenerator('store', storeCfg);
  // create a page generator for vue、router、api
  plop.setGenerator('page', pageCfg);
}
