//dynamic Number
export const dynamicNumber = (totalLength: number) => {
  return Array.from({ length: totalLength }, (_, index) => index + 1);
};
