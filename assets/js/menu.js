const hamburger = document.querySelector('.hamburger button');
const close = document.querySelector('.close button');
const navItems = document.querySelector('.nav-container nav ul');

const toggleMenu = () => {
  navItems.classList.toggle('active');
}

hamburger.addEventListener('click', toggleMenu);
close.addEventListener('click', toggleMenu);