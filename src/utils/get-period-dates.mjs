import { formatDate } from './format-date.mjs';

export const getPeriodDates = (period) => {
  const startDate = new Date();

  const timeZoneOffset = startDate.getTimezoneOffset() * 60000;

  switch (period) {
    case 'Текущая неделя':
      const currentDay = startDate.getDay();
      const startOfWeek = new Date(startDate);
      const daysToSubtract = currentDay === 0 ? -6 : 1 - currentDay;
      startOfWeek.setDate(startDate.getDate() + daysToSubtract);
      startOfWeek.setHours(0, 0, 0, 0);

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);

      return {
        start: formatDate(new Date(startOfWeek.getTime() + timeZoneOffset)),
        end: formatDate(new Date(endOfWeek.getTime() + timeZoneOffset)),
      };

    case 'Месяц':
      const currentMonth = startDate.getMonth();
      const startOfMonth = new Date(startDate.getFullYear(), currentMonth, 1);
      startOfMonth.setHours(0, 0, 0, 0);

      const endOfMonth = new Date(startDate.getFullYear(), currentMonth + 1, 0);
      endOfMonth.setHours(23, 59, 59, 999);

      return {
        start: formatDate(new Date(startOfMonth.getTime() + timeZoneOffset)),
        end: formatDate(new Date(endOfMonth.getTime() + timeZoneOffset)),
      };

    case 'Всё время':
      const startOfAllTime = new Date(0);
      const endOfAllTime = new Date();

      return {
        start: formatDate(new Date(startOfAllTime.getTime() + timeZoneOffset)),
        end: formatDate(endOfAllTime),
      };

    default:
      throw new Error('Invalid period specified. Use "Текущая неделя", "Месяц", or "Всё время".');
  }
};
