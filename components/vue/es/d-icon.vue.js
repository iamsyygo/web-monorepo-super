import { defineComponent as l, computed as t, openBlock as c, createElementBlock as r, normalizeStyle as i, createElementVNode as a, unref as s } from "vue";
const f = ["href", "fill"], p = /* @__PURE__ */ l({
  __name: "d-icon",
  props: {
    name: null,
    prefix: { default: "#icon" },
    color: null,
    size: { default: 16 }
  },
  setup(e) {
    const n = e, o = t(() => `${n.prefix}-${n.name}`);
    return (u, m) => (c(), r("svg", {
      "aria-hidden": "true",
      class: "icon",
      style: i({
        fontSize: e.size + "px"
      })
    }, [
      a("use", {
        href: s(o),
        fill: e.color
      }, null, 8, f)
    ], 4));
  }
});
export {
  p as default
};
