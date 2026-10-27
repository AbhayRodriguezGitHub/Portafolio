
document.addEventListener('DOMContentLoaded', () => {

  // ==================== SUBTÍTULO ANIMADO ====================

  const subtitleEl = document.getElementById('subtitle');

  const phrases = [
    'Técnico en Programación',
    'Apasionado por la Tecnología',
    'Programador Junior',
    'Actualmente Cursando CIBERSEGURIDAD (Respaldo SPARKFOUND)'
  ];

  let index = 0;

  function showNextPhrase() {
    if (!subtitleEl) return;

    subtitleEl.style.opacity = 0;

    setTimeout(() => {
      subtitleEl.textContent = phrases[index];
      subtitleEl.style.opacity = 1;
      index = (index + 1) % phrases.length;
    }, 300);
  }

  if (subtitleEl) {
    showNextPhrase();
    setInterval(showNextPhrase, 3000);
  }


  // ==================== NAVEGACIÓN ====================

  const links = Array.from(document.querySelectorAll('.menu a'));

  const sections = ['top', 'about', 'portfolio', 'contact']
    .map(id => document.getElementById(id))
    .filter(Boolean);

  links.forEach(link => {
    link.addEventListener('click', event => {
      const href = link.getAttribute('href');
      const target = href ? document.querySelector(href) : null;

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });


  // ==================== MENÚ ACTIVO AL DESPLAZARSE ====================

  function setActiveByScroll() {
    const nav = document.querySelector('.barra-nav');
    const barH = nav ? nav.offsetHeight : 0;
    const y = window.scrollY + barH + 24;

    let currentId = 'top';

    for (const section of sections) {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;

      if (y >= top && y < bottom) {
        currentId = section.id;
        break;
      }
    }

    links.forEach(link => {
      const match = link.getAttribute('href') === `#${currentId}`;
      link.classList.toggle('active', match);
    });
  }

  setActiveByScroll();

  document.addEventListener('scroll', setActiveByScroll, {
    passive: true
  });

  window.addEventListener('resize', setActiveByScroll);


  // ==================== SOBRE MÍ <-> CURRÍCULUM ====================

  const aboutSection = document.getElementById('about');
  const aboutToggle = document.querySelector('.about-toggle');
  const aboutText = document.querySelector('.about-text');
  const aboutCv = document.querySelector('.about-cv');
  const cvCard = document.querySelector('.cv-card');

  if (aboutSection && aboutToggle && aboutText && aboutCv) {

    aboutToggle.addEventListener('click', () => {

      // Alternar entre los dos paneles
      const showingCv = aboutSection.classList.toggle('show-cv');

      // Actualizar accesibilidad y estado de la flecha
      aboutToggle.setAttribute(
        'aria-expanded',
        String(showingCv)
      );

      aboutToggle.setAttribute(
        'aria-label',
        showingCv ? 'Volver a Sobre mí' : 'Ver currículum'
      );

      aboutText.setAttribute(
        'aria-hidden',
        String(showingCv)
      );

      aboutCv.setAttribute(
        'aria-hidden',
        String(!showingCv)
      );

      // Evitar que el enlace oculto reciba el foco del teclado
      if (cvCard) {
        cvCard.setAttribute(
          'tabindex',
          showingCv ? '0' : '-1'
        );
      }
    });

  } else {
    console.warn(
      'No se encontraron todos los elementos de Sobre mí y Currículum. Revisá las clases del index.html.'
    );
  }

});
