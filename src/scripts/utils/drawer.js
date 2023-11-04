const Drawer = {
  init({ burger, navbar, content }) {
    const toggleDrawer = (event) => {
      event.stopPropagation();
      navbar.classList.toggle('nav-active');
      burger.classList.toggle('toggle-burger');
      if (navbar.classList.contains('nav-active')) {
        burger.setAttribute('aria-label', 'Tutup Navigasi');
        navbar.setAttribute('aria-expanded', 'true');
      } else {
        burger.setAttribute('aria-label', 'Buka Navigasi');
        navbar.setAttribute('aria-expanded', 'false');
      }
    };

    burger.setAttribute('tabindex', '0');
    burger.addEventListener('click', toggleDrawer);

    if (Array.isArray(content)) {
      content.forEach((link) => {
        link.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            link.click();
          }
        });
      });
    }

    burger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleDrawer(e);
      }
    });
  },
};

export default Drawer;
