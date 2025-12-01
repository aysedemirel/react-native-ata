import { normalizeFont } from './layout';

const fonts = {
  title: 'hand-b',
  regular: 'rob-r',
  bold: 'rob-b',
  italic: 'rob-i',
  thin: 'rob-t',
};

const fontSizes = {
  xtiny: normalizeFont(7),
  tiny: normalizeFont(9),
  smaller: normalizeFont(10),
  xxxsmall: normalizeFont(11),
  small: normalizeFont(12),
  smallToMedium: normalizeFont(15),
  medium: normalizeFont(16),
  medium2: normalizeFont(18),
  medium3: normalizeFont(20),
  large: normalizeFont(24),
  title: normalizeFont(30),
  larger: normalizeFont(64),
  icon: normalizeFont(40),
};

export { fonts, fontSizes };
