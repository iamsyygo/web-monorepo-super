// hlc: header left content, header z-index 最高
// lhc: left header content, left z-index 最高
// lc: left content
// hc: header content
export type LayotLight = 'l-hlc' | 'l-lhc' | 'l-lc' | 'l-hc';

export type LayotDark = 'd-hlc' | 'd-lhc' | 'd-lc' | 'd-hc';

export type Layout = LayotLight | LayotDark;

// export interface LayoutConfig {
//   head_height: number;
//   aside_width: number;
//   main_padding: number;
// }
