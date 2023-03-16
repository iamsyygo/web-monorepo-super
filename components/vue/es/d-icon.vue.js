import { defineComponent as l, computed as t, openBlock as c, createElementBlock as r, createElementVNode as s, unref as i } from "vue";
const a = { "aria-hidden": "true" }, d = ["href", "fill"], p = /* @__PURE__ */ l({
  __name: "d-icon",
  props: {
    name: null,
    prefix: { default: "#icon" },
    color: null
  },
  setup(e) {
    const o = e, n = t(() => `${o.prefix}-${o.name}`);
    return console.log(n, "symbolId"), (f, m) => (c(), r("svg", a, [
      s("use", {
        href: i(n),
        fill: e.color
      }, null, 8, d)
    ]));
  }
});
export {
  p as default
};
