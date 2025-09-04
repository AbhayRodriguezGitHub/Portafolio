document.addEventListener('DOMContentLoaded', () => {
  // Subtítulo rotativo
  const subtitleEl = document.getElementById('subtitle');
  const phrases = [
    'Futuro Técnico en Programación',
    'Apasionado por la Tecnología',
    'Programador de Videojuegos'
  ];
  let index = 0;
  function showNextPhrase() {
    subtitleEl.style.opacity = 0;
    setTimeout(() => {
      subtitleEl.textContent = phrases[index];
      subtitleEl.style.opacity = 1;
      index = (index + 1) % phrases.length;
    }, 300);
  }
  showNextPhrase();
  setInterval(showNextPhrase, 3000);

  // Menú activo por scroll + scroll suave
  const links = Array.from(document.querySelectorAll('.menu a'));
  const sections = ['top','about','portfolio','contact'].map(id => document.getElementById(id)).filter(Boolean);
  links.forEach(a=>{
    a.addEventListener('click', e=>{
      const target = document.querySelector(a.getAttribute('href'));
      if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth', block:'start'}); }
    });
  });
  function setActiveByScroll() {
    const barH = document.querySelector('.barra-nav').offsetHeight || 0;
    const y = window.scrollY + barH + 24;
    let currentId = 'top';
    for (const sec of sections) {
      const top = sec.offsetTop;
      const bottom = top + sec.offsetHeight;
      if (y >= top && y < bottom) { currentId = sec.id; break; }
    }
    links.forEach(a=>{
      const match = a.getAttribute('href') === `#${currentId}`;
      a.classList.toggle('active', match);
    });
  }
  setActiveByScroll();
  document.addEventListener('scroll', setActiveByScroll, {passive:true});
  window.addEventListener('resize', setActiveByScroll);

  // Toggle "Sobre mí" <-> "Curriculum"
  const aboutSection = document.getElementById('about');
  const aboutToggle = document.querySelector('.about-toggle');
  if (aboutToggle && aboutSection) {
    aboutToggle.addEventListener('click', () => {
      aboutSection.classList.toggle('show-cv');
    });
  }
});
