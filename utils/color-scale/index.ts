import { convert } from 'css-color-function';

// 根据传入的颜色和比例，返回一个梯度颜色
export function getColorScaleRatio(color: string, ratio: number) {
  // 每相差 ratio 个单位取一个颜色
  const ratios: IRatios = {};
  for (let index = 100; index > 0; index -= ratio) {
    // 转 hsl
    ratios[100 - index] = convert(`color(${color} l(${-index}%))`);
  }
  return ratios;
}

// 根据传入的变量对象，生成一个 css 变量 字符串并插入body后面
export function appendBodyCssVar(objVar: any) {
  const cssVar = Object.keys(objVar)
    .map((key) => `${key}: ${objVar[key]};`)
    .join('');
  const style = document.createElement('style');
  style.innerHTML = `:root{${cssVar}}`;
  document.body.appendChild(style);
}
