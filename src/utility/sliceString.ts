export const sliceString = (string: string) => {
  return string.length > 20 ? string.substring(0, 20 - 3) + '...' : string;
};
