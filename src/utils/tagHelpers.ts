export const generateTagGradient = (color: string): string[] => {
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  const rgb = hexToRgb(color);
  if (!rgb) return [color];

  const lighterColor = rgbToHex(
    Math.min(255, rgb.r + 30),
    Math.min(255, rgb.g + 30),
    Math.min(255, rgb.b + 30),
  );

  const darkerColor = rgbToHex(
    Math.max(0, rgb.r - 30),
    Math.max(0, rgb.g - 30),
    Math.max(0, rgb.b - 30),
  );

  return [lighterColor, color, darkerColor];
};

export const getContrastTextColor = (
  backgroundColor: string,
): 'white' | 'black' => {
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const rgb = hexToRgb(backgroundColor);
  if (!rgb) return 'white';

  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  return luminance > 0.5 ? 'black' : 'white';
};
