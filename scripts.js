const basePath = window.location.pathname.includes('/projets/') 
  ? '../Images/logo/' 
  : 'Images/logo/';

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
    const randomIndex = Math.floor(Math.random() * images.length);
    selectedImage = images[randomIndex];
  } while (selectedImage === lastImage);

  document.getElementById('random-image').src = selectedImage;
  localStorage.setItem('lastImage', selectedImage);
}

// Scroll en douceur vers le haut
function smoothScrollToTop() {
  const scrollDuration = 300;
  const scrollStep = -window.scrollY / (scrollDuration / 15);

  function scroll() {
    if (window.scrollY > 0) {
      window.scrollBy(0, scrollStep);
      requestAnimationFrame(scroll);
    }
  }
  requestAnimationFrame(scroll);
}

// Effet hover image → GIF relancé à chaque hover, avec préchargement
const hoverCache = {};

function attachHoverEffect(imgElement, hoverSrc) {
  const originalSrc = imgElement.src;

  // Préchargement du GIF
  if (!hoverCache[hoverSrc]) {
    const preload = new Image();
    preload.src = hoverSrc;
    hoverCache[hoverSrc] = preload;
  }

  imgElement.addEventListener("mouseenter", () => {
    // Crée une nouvelle instance pour relancer le GIF depuis le début
    const hoverImage = new Image();
    hoverImage.src = hoverSrc + "?t=" + new Date().getTime();
    imgElement.src = hoverImage.src;
  });

  imgElement.addEventListener("mouseleave", () => {
    imgElement.src = originalSrc;
  });
}

document.addEventListener("DOMContentLoaded", () => {
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

  // Images projets + GIFs
  const projectImages = [
    { selector: 'img[src="Images/loeil/loeil.jpg"]', hoverSrc: "Vidéos/loeil.gif" },
    { selector: 'img[src="Images/Falaise/falaise.jpg"]', hoverSrc: "Vidéos/falaise.gif" }, // si tu as un gif
    { selector: 'img[src="Images/Milieu/couv.jpg"]', hoverSrc: "Images/Milieu/2emecouv.jpg" },
    { selector: 'img[src="Images/Fantasmagorie/couv.jpg"]', hoverSrc: "Vidéos/couv.gif" },
    { selector: 'img[src="Images/Epuisement/front.jpg"]', hoverSrc: "Vidéos/front.gif" },
    { selector: 'img[src="Images/Eau/carte postale.jpg"]', hoverSrc: "Vidéos/eau.gif" },
    { selector: 'img[src="Images/Sample/couv.jpg"]', hoverSrc: "Vidéos/Anim-sample.gif" }
  ];

  projectImages.forEach(project => {
    const img = document.querySelector(project.selector);
    if (img) {
      attachHoverEffect(img, project.hoverSrc);
    }
  });
});
