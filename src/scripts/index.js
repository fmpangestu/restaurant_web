import 'regenerator-runtime';
// eslint-disable-next-line no-unused-vars
import css from '../styles/style.scss';
import swRegister from './utils/sw-register';
import App from './view/main';

// document.addEventListener('DOMContentLoaded', App);
const app = new App({
  burger: document.querySelector('#hamburger'),
  navbar: document.querySelector('#navigationDrawer'),
  content: document.querySelector('#mainContent'),
});
window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', async () => {
  app.renderPage();
  await swRegister();
});
