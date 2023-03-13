import 'virtual:svg-icons-register';
import ids from 'virtual:svg-icons-names';
import './icons/iconfont.js';
import iconfonts from './icons/iconfont.json';
iconfonts.glyphs.map((icon) => {
  ids.push(icon.font_class);
});
export { ids };
