const calculateBrightness = (hexColor: string): number => {
  const bigint = parseInt(hexColor.slice(1), 16);

  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return 0.299 * r + 0.587 * g + 0.114 * b;
};

const calculateColor = (color: string) => {
  const brightness = calculateBrightness(color);
  return brightness < 128 ? '#FFFFFF' : '#000000';
};
const calculateDarkColor = (color: string) => {
  const brightness = calculateBrightness(color);
  return brightness < 128 ? '#000000' : '#FFFFFF';
};

const makeTransparent = (color: string, opacity = 0.5): string => {
  if (
    !/^#([A-Fa-f0-9]{3}){1,2}$/.test(color) &&
    !/^rgb(a)?\((\d{1,3},\s?){2,3}[\d.]+\)$/.test(color)
  ) {
    throw new Error('Invalid color format! Please enter in HEX or RGB format.');
  }

  if (opacity < 0 || opacity > 1) {
    throw new Error('Opacity value must be between 0 and 1.');
  }

  if (color.startsWith('#')) {
    let hex = color.substring(1);
    if (hex.length === 3) {
      hex = hex
        .split('')
        .map((c) => c + c)
        .join('');
    }
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  if (color.startsWith('rgb')) {
    return color.replace(/rgb(a)?\(([\d,\s]+)\)/, `rgba($2, ${opacity})`);
  }

  return color;
};

export { calculateColor, makeTransparent, calculateDarkColor };
