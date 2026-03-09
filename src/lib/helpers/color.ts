export const getColorBySymbol = (symbol: string): string => {
  let hash = 0;
  for (let i = 0; i < symbol.length; i++) {
    hash = symbol.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    const darkValue = Math.floor((value % 150) + 50);
    color += ("00" + darkValue.toString(16)).slice(-2);
  }

  return color;
};
