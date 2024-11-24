import { SidebarComponent } from '../components/sidebar.mjs';
import { routes } from '../config/navigation.config.mjs';
import { CurrenciesComponent } from '../components/currencies.mjs';
import { CreateCurrencyComponent } from '../components/create-currency.mjs';
import { CreateIncomeTypeComponent } from '../components/create-income-type.mjs';
import { IncomeTypesComponent } from '../components/incomes-type.mjs';
import { ExpenseTypesComponent } from '../components/expenses-type.mjs';
import { CreateExpenseTypeComponent } from '../components/create-expense-type.mjs';

const sidebar = new SidebarComponent('.sidebar', routes);

const currencies = new CurrenciesComponent('.settings__currency-list', updateCurrencyHandler);
const createCurrency = new CreateCurrencyComponent('.create__currency-form', createCurrencyHandler);
const incomes = new IncomeTypesComponent('.settings__incomes-list', updateIncomesHandler);
const createIncomes = new CreateIncomeTypeComponent('.create__incomes-form', createIncomesHandler);
const expenses = new ExpenseTypesComponent('.settings__expenses-list', updateExpensesHandler);
const createExpenses = new CreateExpenseTypeComponent(
  '.create__expenses-form',
  createExpensesHandler,
);

function createCurrencyHandler() {
  const createCurrencyModal = document.getElementById('create-currency');
  currencies.render();
  createCurrencyModal.hidePopover();
}

function createIncomesHandler() {
  const createCurrencyModal = document.getElementById('create-incomes-type');
  incomes.render();
  createCurrencyModal.hidePopover();
}

function createExpensesHandler() {
  const createCurrencyModal = document.getElementById('create-expenses-type');
  expenses.render();
  createCurrencyModal.hidePopover();
}

function updateCurrencyHandler() {
  const updateCurrencyModal = document.getElementById('update-currency');
  updateCurrencyModal.hidePopover();
}

function updateIncomesHandler() {
  const updateCurrencyModal = document.getElementById('update-incomes-type');
  updateCurrencyModal.hidePopover();
}

function updateExpensesHandler() {
  const updateCurrencyModal = document.getElementById('update-expenses-type');
  updateCurrencyModal.hidePopover();
}
