import { colornames } from "color-name-list";
import tinycolor from "tinycolor2";

export const getColorDistance = (c1: any, c2: any) => {
  const rgb1 = c1.toRgb();
  const rgb2 = c2.toRgb();
  return Math.sqrt(Math.pow(rgb1.r - rgb2.r, 2) + Math.pow(rgb1.g - rgb2.g, 2) + Math.pow(rgb1.b - rgb2.b, 2));
};

export const getClosestColorName = (hex: any) => {
  const inputColor = tinycolor(hex);
  let closest = colornames[0];
  let minDistance = Number.MAX_VALUE;

  colornames.forEach((color: any) => {
    const distance = getColorDistance(inputColor, tinycolor(color.hex));
    if (distance < minDistance) {
      minDistance = distance;
      closest = color;
    }
  });
  return closest.name;
};
