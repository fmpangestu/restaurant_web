import 'regenerator-runtime';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'lazysizes';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
// eslint-disable-next-line import/no-extraneous-dependencies
import filterContacts from 'lodash.filter';
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
// eslint-disable-next-line import/no-extraneous-dependencies
import('lodash.filter')
  .then((module) => module.default)
  .then(filterContacts)
// eslint-disable-next-line no-alert
  .catch((error) => alert(error));
window.addEventListener('load', async () => {
  app.renderPage();
  await swRegister();
});
