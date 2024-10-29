import { CurrencyController } from "./controllers/currency.controller.mjs";
import { ExpenseTypeController } from "./controllers/expense-type.controller.mjs";
import { ExpenseController } from "./controllers/expense.controller.mjs";
import { IncomeTypeController } from "./controllers/income-type.controller.mjs";
import { IncomeController } from "./controllers/income.controller.mjs";
import { Budget } from "./core/budget.mjs";

const init = () => {
  const currency1 = CurrencyController.create("Рубль");

  if (currency1) {
    currency1.addRate("27.10.24", 1, 1.01);
    currency1.addRate("28.10.24", 1, 1);

    CurrencyController.update(currency1);
  }

  const currency2 = CurrencyController.create("Доллар");

  if (currency2) {
    currency2.addRate("27.10.24", 98, 101);
    currency2.addRate("28.10.24", 96, 100);

    CurrencyController.update(currency2);
  }

  const expenseType1 = ExpenseTypeController.create("Покупки");
  const expenseType2 = ExpenseTypeController.create("Еда");

  const incomeType1 = IncomeTypeController.create("Работа");
  const incomeType2 = IncomeTypeController.create("Подарок");

  const income1 = IncomeController.create(
    100,
    currency1,
    incomeType1,
    "23.10.24",
  );
  const income2 = IncomeController.create(
    1000,
    currency1,
    incomeType2,
    "28.10.24",
  );
  const income3 = IncomeController.create(
    200,
    currency1,
    incomeType1,
    "27.10.24",
  );

  const expense1 = ExpenseController.create(
    100,
    currency1,
    expenseType1,
    "23.10.24",
  );
  const expense2 = ExpenseController.create(
    1000,
    currency1,
    expenseType2,
    "24.10.24",
  );
};

const incomeType = IncomeTypeController.getByName("Работа");
const expenseType = ExpenseTypeController.getByName("Еда");

const { incomes, expenses } = Budget.filter(
  "20.10.24",
  "25.10.24",
  incomeType.name,
  expenseType.name,
);
console.log("Incomes:", incomes);
console.log("Expenses:", expenses);

const balance = Budget.balance(
  "20.10.24",
  "25.10.24",
  incomeType.name,
  expenseType.name,
);
console.log(balance);
