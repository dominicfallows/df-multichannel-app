import moment from "moment";

export const articleTimeStr = (created: string, updated: string) => {
  const format = "Do MMM YYYY";
  const createdFormated = moment(created).format(format);
  const updatedFormatted = moment(updated).format(format);

  let timeStr = `Created: ${createdFormated}`;

  if (createdFormated !== updatedFormatted) {
    timeStr = `${timeStr}. Last updated: ${updatedFormatted}`;
  }

  return timeStr;
};
