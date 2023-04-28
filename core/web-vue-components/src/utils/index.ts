// 判断插槽是否存在，存在返回插槽名称 key \ k1,k2,k3
export const hasSlot = (name: string, slots: any) => {
  const slotname = slots[name] ? name : '';

  if (slotname) return name;

  for (const key in slots) {
    if (Object.prototype.hasOwnProperty.call(slots, key)) {
      if (key.split(',').includes(name)) return key;
    }
  }
};
// 获取插槽内容
export const getSlotValue = (name: string, slots: any) => {
  const key = hasSlot(name, slots);
  return key ? slots[key] : null;
};
