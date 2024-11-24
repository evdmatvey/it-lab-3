import { CreateExpenseComponent } from '../components/create-expense.mjs';
import { DropdownComponent } from '../components/dropdown.mjs';
import { ExpensesComponent } from '../components/expenses.mjs';

import { SidebarComponent } from '../components/sidebar.mjs';
import { routes } from '../config/navigation.config.mjs';

const sidebar = new SidebarComponent('.sidebar', routes);

const dropdown = new DropdownComponent(
  '.expenses__controls-dropdown',
  ['Текущая неделя', 'Месяц', 'Всё время'],
  selectTimeGapHandler,
);

const expenses = new ExpensesComponent(
  '.expenses__table-items',
  '.expenses__total-price',
  expenseUpdateHandler,
  'Текущая неделя',
);
const createExpense = new CreateExpenseComponent('.create__expense-form', expenseCreateHandler);

function selectTimeGapHandler(value) {
  expenses.render(value);
}

function expenseCreateHandler() {
  const modal = document.getElementById('create-expense');
  expenses.render('Текущая неделя');
  modal.hidePopover();
}

function expenseUpdateHandler() {
  const modal = document.getElementById('update-expense');
  modal.hidePopover();
}
