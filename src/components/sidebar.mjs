export class SidebarComponent {
  sidebarLayout = `
    <h3 class="sidebar__title">Бюджет</h3>
    <nav>
      <ul class="sidebar__navigation">
      </ul>
    </nav>
  `;

  constructor(selector, routes) {
    this.element = document.querySelector(selector);

    this.init(routes);
  }

  init(routes) {
    this.element.innerHTML = this.sidebarLayout;
    this.fillRoutes(routes);

    this.routes = this.element.querySelectorAll('.sidebar__navigation-item');
    this.setActiveRoute();
  }

  fillRoutes(routes) {
    const menu = this.element.querySelector('.sidebar__navigation');

    routes.forEach(({ title, route, icon }) =>
      menu.insertAdjacentHTML(
        'beforeend',
        `<li>
          <a href="${route}" class="sidebar__navigation-item">
            ${icon}
            ${title}
          </a>
        </li>`,
      ),
    );
  }

  setActiveRoute() {
    const activeRoute = window.location.href.split('/').at(-1);

    this.routes.forEach((route) => {
      if (route.href.includes(activeRoute)) route.classList.add('active');
    });
  }
}
