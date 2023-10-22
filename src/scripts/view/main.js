// import UrlParser from '../routes/url-parser';
// import routes from '../routes/routes';
import '../components/rest-item';
import DataSource from '../data/datasource';

const main = () => {
  const burGer = document.querySelector('.hamburger');
  const navBar = document.querySelector('nav');
  const navLinks = navBar.querySelectorAll('a');

  burGer.setAttribute('tabindex', '0');
  burGer.addEventListener('click', () => {
    navBar.classList.toggle('nav-active');
    burGer.classList.toggle('toggle-burger');
    if (navBar.classList.contains('nav-active')) {
      burGer.setAttribute('aria-label', 'Tutup Navigasi');
      navBar.setAttribute('aria-expanded', 'true');
    } else {
      burGer.setAttribute('aria-label', 'Buka Navigasi');
      navBar.setAttribute('aria-expanded', 'false');
    }
  });
  navLinks.forEach((link) => {
    link.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        link.click();
      }
    });
  });
  burGer.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      burGer.click();
    }
  });
  navLinks.forEach((link) => {
    link.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        link.click();
      }
    });
  });
  const restaurantList = document.getElementById('restaurantList');

  DataSource.getAllRestaurants()
    .then((restaurants) => {
      restaurants.forEach((restaurant) => {
        const restItem = document.createElement('rest-item');
        restItem.rest = restaurant;
        restaurantList.appendChild(restItem);
      });
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error('Error', error);
    });

  // async renderPage() {
  //   const url = UrlParser.parseActiveUrlWithCombiner();
  //   const page = routes[url];
  //   // this._content.innerHTML = await page.render();
  //   await page.afterRender();
  // }
};

export default main;
