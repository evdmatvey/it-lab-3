import { ExpenseController } from '../controllers/expense.controller.mjs';
import { formatCurrency } from '../utils/format-currency.mjs';
import { sumMoneys } from '../utils/sum-moneys.mjs';
import { UpdateExpenseComponent } from './update-expense.mjs';
import { Budget } from '../core/budget.mjs';
import { getPeriodDates } from '../utils/get-period-dates.mjs';

export class ExpensesComponent {
  constructor(selector, totalSelector, onUpdate, timeGap) {
    this.element = document.querySelector(selector);
    this.totalElement = document.querySelector(totalSelector);
    this.onUpdate = onUpdate;

    this.render(timeGap);
  }

  render(timeGap) {
    this.element.innerHTML = '';
    this.totalElement.innerText = this.calculateTotalElement(timeGap);
    this.addExpensesToList(timeGap);
    this.initListeners();
  }

  initListeners() {
    const expenses = this.element.querySelectorAll('.expenses__table-item');

    expenses.forEach((expense) => {
      const expenseId = expense.dataset.id;
      const deleteHandler = () => this.deleteHandler(expenseId);
      const updateHandler = () => {
        new UpdateExpenseComponent('.update__expense-form', expenseId, () => {
          this.onUpdate();
          this.render('Текущая неделя');
        });
      };

      const deleteButton = expense.querySelector('.transactions-item__info-delete');
      const updateButton = expense.querySelector('.transactions-item__info-update');

      deleteButton.addEventListener('click', deleteHandler);
      updateButton.addEventListener('click', updateHandler);
    });
  }

  deleteHandler(id) {
    ExpenseController.delete(+id);
    this.render('Текущая неделя');
  }

  calculateTotalElement(timeGap) {
    const { start, end } = getPeriodDates(timeGap);
    const { expenses } = Budget.filter(start, end);
    const moneys = expenses.map((i) => ({
      currency: i.currency,
      value: i.value,
    }));

    return formatCurrency(sumMoneys(moneys), 'RUB');
  }

  addExpensesToList(timeGap) {
    const { start, end } = getPeriodDates(timeGap);
    const { expenses } = Budget.filter(start, end);
    expenses.forEach((expense) => {
      this.element.insertAdjacentHTML('beforeend', this.getExpenseLayout(expense));
    });
  }

  getExpenseLayout(expense) {
    const { id, name, type, value, currency } = expense;
    const formattedAmount = formatCurrency(value, currency);

    return `
      <div class="expenses__table-item transactions__table-item" data-id=${id}>
        <div class="expenses__item-info transactions__item-info">
          <h3 class="expenses-item__info-title transactions-item__info-title">
            ${name}
            <div class="transactions-item__info-controls">
              <button class="transactions-item__info-update" popovertarget="update-expense"
                popovertargetaction="show">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M22 7.24002C22.0008 7.10841 21.9756 6.97795 21.9258 6.85611C21.876 6.73427 21.8027 6.62346 21.71 6.53002L17.47 2.29002C17.3766 2.19734 17.2658 2.12401 17.1439 2.07425C17.0221 2.02448 16.8916 1.99926 16.76 2.00002C16.6284 1.99926 16.4979 2.02448 16.3761 2.07425C16.2543 2.12401 16.1435 2.19734 16.05 2.29002L13.22 5.12002L2.29002 16.05C2.19734 16.1435 2.12401 16.2543 2.07425 16.3761C2.02448 16.4979 1.99926 16.6284 2.00002 16.76V21C2.00002 21.2652 2.10537 21.5196 2.29291 21.7071C2.48045 21.8947 2.7348 22 3.00002 22H7.24002C7.37994 22.0076 7.51991 21.9857 7.65084 21.9358C7.78176 21.8858 7.90073 21.8089 8.00002 21.71L18.87 10.78L21.71 8.00002C21.8013 7.9031 21.8757 7.79155 21.93 7.67002C21.9397 7.59031 21.9397 7.50973 21.93 7.43002C21.9347 7.38347 21.9347 7.33657 21.93 7.29002L22 7.24002ZM6.83002 20H4.00002V17.17L13.93 7.24002L16.76 10.07L6.83002 20ZM18.17 8.66002L15.34 5.83002L16.76 4.42002L19.58 7.24002L18.17 8.66002Z"
                    fill="black" />
                </svg>
              </button>
              <button class="transactions-item__info-delete">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.4099 12.0002L19.7099 5.71019C19.8982 5.52188 20.004 5.26649 20.004 5.00019C20.004 4.73388 19.8982 4.47849 19.7099 4.29019C19.5216 4.10188 19.2662 3.99609 18.9999 3.99609C18.7336 3.99609 18.4782 4.10188 18.2899 4.29019L11.9999 10.5902L5.70994 4.29019C5.52164 4.10188 5.26624 3.99609 4.99994 3.99609C4.73364 3.99609 4.47824 4.10188 4.28994 4.29019C4.10164 4.47849 3.99585 4.73388 3.99585 5.00019C3.99585 5.26649 4.10164 5.52188 4.28994 5.71019L10.5899 12.0002L4.28994 18.2902C4.19621 18.3831 4.12182 18.4937 4.07105 18.6156C4.02028 18.7375 3.99414 18.8682 3.99414 19.0002C3.99414 19.1322 4.02028 19.2629 4.07105 19.3848C4.12182 19.5066 4.19621 19.6172 4.28994 19.7102C4.3829 19.8039 4.4935 19.8783 4.61536 19.9291C4.73722 19.9798 4.86793 20.006 4.99994 20.006C5.13195 20.006 5.26266 19.9798 5.38452 19.9291C5.50638 19.8783 5.61698 19.8039 5.70994 19.7102L11.9999 13.4102L18.2899 19.7102C18.3829 19.8039 18.4935 19.8783 18.6154 19.9291C18.7372 19.9798 18.8679 20.006 18.9999 20.006C19.132 20.006 19.2627 19.9798 19.3845 19.9291C19.5064 19.8783 19.617 19.8039 19.7099 19.7102C19.8037 19.6172 19.8781 19.5066 19.9288 19.3848C19.9796 19.2629 20.0057 19.1322 20.0057 19.0002C20.0057 18.8682 19.9796 18.7375 19.9288 18.6156C19.8781 18.4937 19.8037 18.3831 19.7099 18.2902L13.4099 12.0002Z" fill="black" />
                </svg>
              </button>
            </div>
          </h3>
          <p class="expenses-item__info-category transactions-item__info-category">
            ${type}
          </p>
        </div>
        <div class="expenses__item-price transactions__item-price">${formattedAmount}</div>
      </div>
    `;
  }
}
