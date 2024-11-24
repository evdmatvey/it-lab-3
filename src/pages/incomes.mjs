import { CreateIncomeComponent } from '../components/create-income.mjs';
import { DropdownComponent } from '../components/dropdown.mjs';
import { IncomesComponent } from '../components/incomes.mjs';

import { SidebarComponent } from '../components/sidebar.mjs';
import { routes } from '../config/navigation.config.mjs';

const sidebar = new SidebarComponent('.sidebar', routes);

const dropdown = new DropdownComponent(
  '.incomes__controls-dropdown',
  ['Текущая неделя', 'Месяц', 'Всё время'],
  selectTimeGapHandler,
);

const incomes = new IncomesComponent(
  '.incomes__table-items',
  '.incomes__total-price',
  incomeUpdateHandler,
  'Текущая неделя',
);
const createIncome = new CreateIncomeComponent('.create__income-form', incomeCreateHandler);

function selectTimeGapHandler(value) {
  incomes.render(value);
}

function incomeCreateHandler() {
  const modal = document.getElementById('create-income');
  incomes.render('Текущая неделя');
  modal.hidePopover();
}

function incomeUpdateHandler() {
  const modal = document.getElementById('update-income');
  modal.hidePopover();
}
