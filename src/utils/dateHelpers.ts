
export const formatDate = (inputDate: string): string => {
  const date = new Date(inputDate);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return date.toLocaleDateString('en-US', options);
}

export const formatTime = (inputTime: string): string => {
  const timeParts = inputTime.split(":");
  return `${timeParts[0]}:${timeParts[1]}`;
}