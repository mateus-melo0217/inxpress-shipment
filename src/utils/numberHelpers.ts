
export const trimNumber = (number: number): string => {
  if (number % 1 === 0) {
    return number.toString();
  } else {
    return number.toFixed(2);
  }
}

export const formatNumber = (num: number): string => {
  const numStr = num.toString();
  const parts = numStr.split(".");
  if (parts.length === 2 && parseInt(parts[1]) === 0) {
    return parts[0];
  } else {
    return numStr;
  }
}