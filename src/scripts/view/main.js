// import UrlParser from '../routes/url-parser';
// import routes from '../routes/routes';
// import '../components/rest-item';
// import DataSource from '../data/datasource';
import Drawer from '../utils/drawer';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor({ burger, navbar, content }) {
    this.burger = burger;
    this.navbar = navbar;
    this.content = content;

    this.initialAppShell();
  }

  initialAppShell() {
    Drawer.init({
      burger: this.burger,
      navbar: this.navbar,
      content: this.content,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this.content.innerHTML = await page.render();
    await page.afterRender();

    const skipLink = document.querySelector('.skip-link');
    const mainContent = document.querySelector('#mainContent');

    skipLink.addEventListener('click', (event) => {
      event.preventDefault();
      mainContent.focus();
    });
  }
}

export default App;
