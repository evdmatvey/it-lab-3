import Chart from 'chart.js/auto';
import { DropdownComponent } from '../components/dropdown.mjs';
import { SidebarComponent } from '../components/sidebar.mjs';
import { routes } from '../config/navigation.config.mjs';
import { Budget } from '../core/budget.mjs';
import { getPeriodDates } from '../utils/get-period-dates.mjs';
import { getDatesBetween } from '../utils/get-dates-between.mjs';

let dates = [];
let currentTimeGap = 'Текущая неделя';
let chart = null;

const sidebar = new SidebarComponent('.sidebar', routes);

const dropdown = new DropdownComponent(
  '.balance__dropdown',
  ['Текущая неделя', 'Месяц', 'Всё время'],
  timeGapUpdateHandler,
);

const generateData = () => {
  const data = [];

  dates.forEach((d) => {
    const balance = Budget.balance(d, d);
    data.push({ day: d, balance });
  });

  return data;
};

const updateDates = () => {
  if (chart) chart.destroy();
  const { start, end } = getPeriodDates(currentTimeGap);
  dates = getDatesBetween(start, end);

  const data = generateData();

  chart = new Chart(document.getElementById('chart'), {
    type: 'line',
    data: {
      labels: data.map((row) => row.day),
      datasets: [
        {
          label: 'Баланс',
          data: data.map((row) => row.balance),
        },
      ],
    },
  });
};

function timeGapUpdateHandler(gap) {
  currentTimeGap = gap;
  updateDates();
}

updateDates();

// (async function () {

// })();
