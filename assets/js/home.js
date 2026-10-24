(() => {
  const navigation = [...document.querySelectorAll('.site-nav a')];
  const sections = [...document.querySelectorAll('main > section[id]')];

  const updateNavigation = () => {
    const offset = document.querySelector('.site-header').getBoundingClientRect().height + 40;
    let current = sections[0];
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= offset) current = section;
    }
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 5) {
      current = sections[sections.length - 1];
    }
    navigation.forEach(link => {
      if (new URL(link.href).hash === `#${current.id}`) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  let scheduled = false;
  window.addEventListener('scroll', () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      updateNavigation();
      scheduled = false;
    });
  }, { passive: true });
  window.addEventListener('resize', updateNavigation);
  updateNavigation();

  const dialog = document.querySelector('.figure-dialog');
  const image = dialog.querySelector('.figure-dialog-image');
  const title = dialog.querySelector('#figure-title');

  document.querySelectorAll('[data-figure]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      image.src = trigger.dataset.figure;
      image.alt = trigger.querySelector('img').alt;
      title.textContent = trigger.dataset.title;
      dialog.showModal();
    });
  });

  dialog.querySelector('[data-close-figure]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
})();
