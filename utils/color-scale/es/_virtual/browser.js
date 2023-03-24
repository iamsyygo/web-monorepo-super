var r = {}, s = {
  get exports() {
    return r;
  },
  set exports(e) {
    r = e;
  }
};
export {
  s as __module,
  r as exports
};
