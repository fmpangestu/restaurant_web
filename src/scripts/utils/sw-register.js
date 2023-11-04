// eslint-disable-next-line import/no-extraneous-dependencies
import { Workbox } from 'workbox-window';

const swRegister = async () => {
  if (!('serviceWorker' in navigator)) {
    // eslint-disable-next-line no-console
    console.log('Service Worker not supported in the browser');
    return;
  }

  const wb = new Workbox('./sw.bundle.js');

  try {
    await wb.register();
    // eslint-disable-next-line no-console
    console.log('Service worker registered');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Failed to register service worker', error);
  }
};

export default swRegister;
