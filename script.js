// CSS Perspective Pointer Tilt with Reduced-Motion Check
const viewport = document.getElementById('tilt-viewport');
const tiltContainer = document.getElementById('tilt-container');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (viewport && tiltContainer && !prefersReducedMotion.matches) {
  viewport.addEventListener('mousemove', (e) => {
    const rect = viewport.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -20;
    const rotateY = ((x / rect.width) - 0.5) * 20;
    tiltContainer.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  viewport.addEventListener('mouseleave', () => {
    tiltContainer.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });
}

// Fabric Inspection Smooth Scroll Trigger
const inspectBtn = document.getElementById('inspect-trigger');
const fabricSec = document.getElementById('fit');
if (inspectBtn && fabricSec) {
  inspectBtn.addEventListener('click', () => {
    fabricSec.scrollIntoView({ behavior: prefersReducedMotion.matches ? 'auto' : 'smooth' });
  });
}

// Material Swatch & Colorway Switcher
const matBtns = document.querySelectorAll('.mat-btn');
const focalImg = document.getElementById('focal-img');
const productTitle = document.getElementById('product-title');
const heroPriceDisplay = document.getElementById('hero-price-display');
const drawerTitle = document.getElementById('drawer-title');
const drawerMat = document.getElementById('drawer-mat');
const drawerPreview = document.getElementById('drawer-preview');
const drawerPrice = document.getElementById('drawer-price');

matBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    matBtns.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-checked', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-checked', 'true');

    const imgSrc = btn.getAttribute('data-img');
    const colorHex = btn.getAttribute('data-color');
    const name = btn.getAttribute('data-name');
    const price = btn.getAttribute('data-price');

    if (focalImg) focalImg.src = imgSrc;
    if (productTitle) productTitle.textContent = name;
    if (heroPriceDisplay) heroPriceDisplay.textContent = `${price} INR`;
    if (drawerTitle) drawerTitle.textContent = name;
    if (drawerMat) drawerMat.textContent = `${name} Edition`;
    if (drawerPreview) drawerPreview.style.backgroundColor = colorHex;
    if (drawerPrice) drawerPrice.textContent = `${price} INR`;
  });
});

// Cart Drawer Accessibility & Focus Lock
const cartBtn = document.getElementById('cart-btn');
const cartCount = document.getElementById('cart-count');
const heroBuyBtn = document.getElementById('hero-buy-btn');
const drawer = document.getElementById('drawer');
const drawerOverlay = document.getElementById('drawer-overlay');
const closeDrawer = document.getElementById('close-drawer');
const checkoutBtn = document.getElementById('checkout-btn');
let previousActiveElement = null;

function toggleDrawer(open) {
  if (!drawer || !drawerOverlay) return;
  if (open) {
    previousActiveElement = document.activeElement;
    drawer.classList.add('open');
    drawerOverlay.classList.add('active');
    drawer.setAttribute('aria-hidden', 'false');
    closeDrawer.focus();
  } else {
    drawer.classList.remove('open');
    drawerOverlay.classList.remove('active');
    drawer.setAttribute('aria-hidden', 'true');
    if (previousActiveElement) previousActiveElement.focus();
  }
}

if (cartBtn) cartBtn.addEventListener('click', () => toggleDrawer(true));
if (heroBuyBtn) heroBuyBtn.addEventListener('click', () => toggleDrawer(true));
if (closeDrawer) closeDrawer.addEventListener('click', () => toggleDrawer(false));
if (drawerOverlay) drawerOverlay.addEventListener('click', () => toggleDrawer(false));

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && drawer && drawer.classList.contains('open')) {
    toggleDrawer(false);
  }
});

// Size Selector
const sizeBtns = document.querySelectorAll('.size-btn');
sizeBtns.forEach(sb => {
  sb.addEventListener('click', () => {
    sizeBtns.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-checked', 'false');
    });
    sb.classList.add('active');
    sb.setAttribute('aria-checked', 'true');
  });
});

// Checkout Action
let cartItems = 0;
if (checkoutBtn) {
  checkoutBtn.addEventListener('click', () => {
    cartItems++;
    if (cartCount) cartCount.textContent = cartItems;
    checkoutBtn.textContent = 'Order Confirmed!';
    setTimeout(() => {
      checkoutBtn.textContent = 'Proceed to Express Checkout';
      toggleDrawer(false);
    }, 1200);
  });
}