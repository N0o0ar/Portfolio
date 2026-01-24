// Détection du chemin pour le logo selon la page
const basePath = window.location.pathname.includes('/projets/') 
  ? '../Images/logo/' 
  : 'Images/logo/';

// Liste des logos
const images = [
  basePath + 'NOAR1.png',
  basePath + 'NOAR2.png',
  basePath + 'NOAR3.png'
];

// Sélection d'une image aléatoire pour le logo
function selectRandomImage() {
  const lastImage = localStorage.getItem('lastImage');
  let selectedImage;
  do {
    selectedImage = images[Math.floor(Math.random() * images.length)];
  } while (selectedImage === lastImage);

  const logoImg = document.getElementById('random-image');
  if (logoImg) {
    logoImg.src = selectedImage;
    localStorage.setItem('lastImage', selectedImage);
  }
}

// Scroll en douceur vers le haut
function smoothScrollToTop() {
  const scrollStep = -window.scrollY / (300 / 15);
  function scroll() {
    if (window.scrollY > 0) {
      window.scrollBy(0, scrollStep);
      requestAnimationFrame(scroll);
    }
  }
  requestAnimationFrame(scroll);
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
  // Logo aléatoire
  selectRandomImage();

  // Scroll top
  const scrollBtn = document.getElementById('scroll-to-top');
  if (scrollBtn) {
    scrollBtn.addEventListener('click', (e) => {
      e.preventDefault();
      smoothScrollToTop();
    });
  }

  // NOTE : Les GIFs hover sont maintenant gérés directement dans le HTML via class="hover-gif"
});
