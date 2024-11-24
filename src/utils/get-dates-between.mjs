export const getDatesBetween = (startDateStr, endDateStr) => {
  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split('.').map(Number);
    return new Date(year, month - 1, day);
  };

  const startDate = parseDate(startDateStr);
  const endDate = parseDate(endDateStr);
  const datesArray = [];

  if (startDate > endDate) {
    throw new Error('Start date must be before or equal to end date.');
  }

  for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}.${String(
      date.getMonth() + 1,
    ).padStart(2, '0')}.${date.getFullYear()}`;
    datesArray.push(formattedDate);
  }

  return datesArray;
};
