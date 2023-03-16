import { defineComponent as m, toRefs as _, openBlock as o, createElementBlock as r, unref as e, normalizeStyle as i, createCommentVNode as c, createElementVNode as u, toDisplayString as y, renderSlot as v } from "vue";
const $ = { class: "tree-node-wrapper" }, k = {
  key: 2,
  class: "label-afterline"
}, N = /* @__PURE__ */ m({
  __name: "d-tree-line",
  props: {
    node: null,
    indent: { default: 0 },
    showLine: { type: [Boolean, String] }
  },
  setup(d) {
    const p = d, { node: t, indent: l, showLine: n } = _(p);
    function f(s) {
      const { parent: a } = s;
      if (a) {
        const { childNodes: h } = a;
        return h.at(-1) === s;
      }
      return !1;
    }
    return (s, a) => (o(), r("span", $, [
      e(t).level !== 1 && (e(n) === !0 || e(n) === "structure") ? (o(), r("span", {
        key: 0,
        class: "tree-node-line-level",
        style: i({
          left: -e(l) - 15 + "px",
          width: `${!e(t).canFocus || e(t).childNodes.length ? `${e(l) - 27}px` : `${e(l)}px`}`
        })
      }, null, 4)) : c("", !0),
      e(t).level !== 1 && f(e(t)) && (e(n) === !0 || e(n) === "structure") ? (o(), r("span", {
        key: 1,
        class: "tree-node-line-vert-t",
        style: i({ left: `${-e(l) - 15}px`, height: `${100 * 100}%` })
      }, null, 4)) : c("", !0),
      u("span", null, y(e(t).label), 1),
      e(n) === !0 || e(n) === "label" ? (o(), r("span", k)) : c("", !0),
      u("div", null, [
        v(s.$slots, "label-append", { node: e(t) }, void 0, !0)
      ])
    ]));
  }
});
export {
  N as default
};
