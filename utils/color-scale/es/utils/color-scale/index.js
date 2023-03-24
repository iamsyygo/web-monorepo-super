import { convert as r } from "../../node_modules/.pnpm/css-color-function@1.3.3/node_modules/css-color-function/lib/index.js";
function s(e, n) {
  const t = {};
  for (let o = 100; o > 0; o -= n)
    t[100 - o] = r(`color(${e} l(${-o}%))`);
  return t;
}
function a(e) {
  const n = Object.keys(e).map((o) => `${o}: ${e[o]};`).join(""), t = document.createElement("style");
  t.innerHTML = `:root{${n}}`, document.body.appendChild(t);
}
export {
  a as appendBodyCssVar,
  s as getColorScaleRatio
};
