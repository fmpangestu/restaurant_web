// eslint-disable-next-line no-unused-vars
import css from '../styles/style.scss';
import 'regenerator-runtime';
import main from './view/main';
// import swRegister from './utils/sw-register';
// import WebsocketInitiator from './utils/websocket-initiator';
// import FooterToolsInitiator from './utils/footer-tools-initiator';
// import CONFIG from './globals/config';

document.addEventListener('DOMContentLoaded', main);

// window.addEventListener('hashchange', () => {
//     app.renderPage();
// });

// window.addEventListener('load', async () => {
//     app.renderPage();
//     // await swRegister();
//     // WebsocketInitiator.init(CONFIG.WEB_SOCKET_SERVER);
//
//     // FooterToolsInitiator.init({
//     //     subscribeButton: document.querySelector('#subscribePushNotification'),
//     //     unsubscribeButton: document.querySelector('#unsubscribePushNotification'),
//     // });
// });
