/* ==========================================================================
   SABRIN HAUTE COUTURE • PARIS 
   Storefront Logic & E-Commerce Interaction Engine
   ========================================================================== */

// Product Database
const PRODUCTS = [
  {
    id: 'prod-1',
    title: 'Mulberry Silk Corset',
    category: 'Silk Corsets',
    price: 890,
    rating: 5.0,
    reviews: 24,
    image: 'images/product_silk_corset.jpg',
    isNew: true,
    colors: ['#FCE4EC', '#FAF8F5', '#3E302D'],
    description: 'Handcrafted in Paris from 100% 19mm mulberry silk satin. Features vintage Chantilly lace embroidery, structural boning, and delicate ribbon lacing.'
  },
  {
    id: 'prod-2',
    title: 'Layered Tulle Ballet Skirt',
    category: 'Ballet Skirts',
    price: 650,
    rating: 4.9,
    reviews: 31,
    image: 'images/product_ballet_skirt.jpg',
    isNew: true,
    colors: ['#FADADD', '#FFFFFF', '#D8CECC'],
    description: 'Multi-layered ethereal tulle ballet skirt with silk satin waistband ribbon tie. Tailored in Paris for an understated haute couture silhouette.'
  },
  {
    id: 'prod-3',
    title: 'Ankle Ribbon Satin Heels',
    category: 'Footwear',
    price: 780,
    rating: 4.8,
    reviews: 18,
    image: 'images/product_silk_corset.jpg',
    isNew: false,
    colors: ['#C5A059', '#FADADD', '#2C2220'],
    description: 'Pointed kitten heel pumps lined in Italian kidskin with long silk satin ankle ribbons and 18K rose gold hardware detailing.'
  },
  {
    id: 'prod-4',
    title: 'Freshwater Pearl Hair Pins',
    category: 'Fine Accessories',
    price: 320,
    rating: 5.0,
    reviews: 42,
    image: 'images/product_ballet_skirt.jpg',
    isNew: true,
    colors: ['#FFFFFF', '#C5A059'],
    description: 'Set of three freshwater pearl hair pins tied with hand-sewn blush velvet ribbons. Rose gold metallic pin setting.'
  },
  {
    id: 'prod-5',
    title: 'Rose Gold Bow & Heart Pendant',
    category: 'Fine Accessories',
    price: 1150,
    rating: 5.0,
    reviews: 15,
    image: 'images/product_silk_corset.jpg',
    isNew: false,
    colors: ['#C5A059'],
    description: '18K Rose Gold chain featuring a sculpted bow and crystal heart charm. Hand-polished finish with engraved Sabrin atelier mark.'
  },
  {
    id: 'prod-6',
    title: 'Cashmere Cropped Knit',
    category: 'Silk Corsets',
    price: 720,
    rating: 4.9,
    reviews: 29,
    image: 'images/hero_balletcore.jpg',
    isNew: true,
    colors: ['#FFF0F4', '#4A3E3D'],
    description: 'Ultra-soft 100% Mongolian cashmere cropped cardigan detailed with mother-of-pearl bow buttons.'
  }
];

// Shopping Cart State
let shoppingBag = [
  { product: PRODUCTS[0], quantity: 1, size: 'S' }
];

document.addEventListener('DOMContentLoaded', () => {
  initViewSwitcher();
  initGridOverlayToggle();
  renderProductsGrid(PRODUCTS);
  initCategoryFilters();
  initShoppingBag();
  initQuickViewModal();
  initColorSwatchCopy();
  initWishlistToggles();
  updateCartBadge();
});

/* --------------------------------------------------------------------------
   View Switcher ("Storefront" vs "Brand Identity CI Case Study")
   -------------------------------------------------------------------------- */
function initViewSwitcher() {
  const pills = document.querySelectorAll('.view-pill');
  const sections = document.querySelectorAll('.view-section');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      const targetView = pill.getAttribute('data-view');

      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      sections.forEach(sec => {
        if (sec.id === targetView) {
          sec.classList.add('active');
        } else {
          sec.classList.remove('active');
        }
      });

      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

function toggleCiView() {
  const storefront = document.getElementById('storefrontView');
  const ciView = document.getElementById('ciCaseStudyView');
  if (!storefront || !ciView) return;

  if (storefront.classList.contains('active')) {
    storefront.classList.remove('active');
    ciView.classList.add('active');
    showToast('Brand Identity & Design System');
  } else {
    ciView.classList.remove('active');
    storefront.classList.add('active');
    showToast('Returned to Storefront');
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* --------------------------------------------------------------------------
   8-Point Grid Overlay Visualizer Toggle
   -------------------------------------------------------------------------- */
function initGridOverlayToggle() {
  const toggleBtn = document.getElementById('gridOverlayToggle');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('show-grid');
    const isShowing = document.body.classList.contains('show-grid');
    toggleBtn.classList.toggle('active', isShowing);
    showToast(isShowing ? 'Grid Blueprint Active' : 'Grid Blueprint Inactive');
  });
}

/* --------------------------------------------------------------------------
   Render Product Cards Grid
   -------------------------------------------------------------------------- */
function renderProductsGrid(items) {
  const gridContainer = document.getElementById('productGridContainer');
  if (!gridContainer) return;

  if (items.length === 0) {
    gridContainer.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 60px; color: var(--taupe-600);">No items found in this category.</div>`;
    return;
  }

  gridContainer.innerHTML = items.map(product => `
    <div class="product-card" data-id="${product.id}" data-category="${product.category}">
      <div class="card-img-wrapper">
        ${product.isNew ? `<span class="badge-new">New Arrival</span>` : ''}
        <button class="wishlist-btn" aria-label="Add to wishlist" onclick="toggleWishlist(this, event)">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        </button>
        <img src="${product.image}" alt="${product.title}" class="card-img" loading="lazy" />
        <button class="quick-view-btn" onclick="openQuickView('${product.id}')">Quick View</button>
      </div>
      <div class="card-details">
        <span class="card-category">${product.category}</span>
        <h3 class="card-title">${product.title}</h3>
        <div class="card-price-row">
          <span class="card-price">$${product.price} USD</span>
          <div class="card-swatches">
            ${product.colors.map(c => `<span class="swatch-circle" style="background-color: ${c};"></span>`).join('')}
          </div>
        </div>
        <button class="add-bag-btn" onclick="addToBagDirect('${product.id}')">Add To Shopping Bag</button>
      </div>
    </div>
  `).join('');
}

/* --------------------------------------------------------------------------
   Category Filters
   -------------------------------------------------------------------------- */
function initCategoryFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');
      if (filterVal === 'all') {
        renderProductsGrid(PRODUCTS);
      } else {
        const filtered = PRODUCTS.filter(p => p.category.toLowerCase() === filterVal.toLowerCase());
        renderProductsGrid(filtered);
      }
    });
  });
}

/* --------------------------------------------------------------------------
   Shopping Bag Slide-out Drawer
   -------------------------------------------------------------------------- */
function initShoppingBag() {
  const bagToggle = document.getElementById('cartDrawerBtn');
  const drawer = document.getElementById('shoppingBagDrawer');
  const overlay = document.getElementById('drawerOverlay');
  const closeBtn = document.getElementById('drawerCloseBtn');

  if (bagToggle && drawer && overlay) {
    bagToggle.addEventListener('click', () => openDrawer());
    closeBtn?.addEventListener('click', () => closeDrawer());
    overlay.addEventListener('click', () => closeDrawer());
  }

  renderBagItems();
}

function openDrawer() {
  document.getElementById('shoppingBagDrawer')?.classList.add('active');
  document.getElementById('drawerOverlay')?.classList.add('active');
}

function closeDrawer() {
  document.getElementById('shoppingBagDrawer')?.classList.remove('active');
  document.getElementById('drawerOverlay')?.classList.remove('active');
}

function addToBagDirect(id) {
  const prod = PRODUCTS.find(p => p.id === id);
  if (!prod) return;

  const existing = shoppingBag.find(item => item.product.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    shoppingBag.push({ product: prod, quantity: 1, size: 'S' });
  }

  renderBagItems();
  updateCartBadge();
  openDrawer();
  showToast(`Added ${prod.title} to bag`);
}

function renderBagItems() {
  const container = document.getElementById('bagItemsContainer');
  const subtotalEl = document.getElementById('bagSubtotal');
  if (!container || !subtotalEl) return;

  if (shoppingBag.length === 0) {
    container.innerHTML = `<div style="text-align: center; padding: 40px 0; color: var(--taupe-600);">Your shopping bag is empty.</div>`;
    subtotalEl.textContent = '$0 USD';
    return;
  }

  let subtotal = 0;

  container.innerHTML = shoppingBag.map((item, index) => {
    subtotal += item.product.price * item.quantity;
    return `
      <div class="cart-item">
        <img src="${item.product.image}" class="cart-item-img" alt="${item.product.title}" />
        <div class="cart-item-info">
          <div class="cart-item-title">${item.product.title}</div>
          <div style="font-size: 0.75rem; color: var(--taupe-600);">Size: ${item.size}</div>
          <div class="cart-item-price">$${item.product.price} USD</div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="changeQty(${index}, -1)">-</button>
            <span style="font-size: 0.85rem; font-weight: 600;">${item.quantity}</span>
            <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
            <button style="background:none; border:none; color: var(--taupe-400); margin-left: auto; cursor: pointer; font-size: 0.75rem;" onclick="removeCartItem(${index})">Remove</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  subtotalEl.textContent = `$${subtotal.toLocaleString()} USD`;
}

function changeQty(index, delta) {
  if (shoppingBag[index]) {
    shoppingBag[index].quantity += delta;
    if (shoppingBag[index].quantity <= 0) {
      shoppingBag.splice(index, 1);
    }
  }
  renderBagItems();
  updateCartBadge();
}

function removeCartItem(index) {
  shoppingBag.splice(index, 1);
  renderBagItems();
  updateCartBadge();
}

function updateCartBadge() {
  const count = shoppingBag.reduce((acc, curr) => acc + curr.quantity, 0);
  const badges = document.querySelectorAll('.cart-count-badge');
  badges.forEach(b => b.textContent = count);
}

/* --------------------------------------------------------------------------
   Quick View Product Modal
   -------------------------------------------------------------------------- */
function initQuickViewModal() {
  const modalOverlay = document.getElementById('quickViewModal');
  const closeBtn = document.getElementById('modalCloseBtn');

  if (closeBtn && modalOverlay) {
    closeBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) modalOverlay.classList.remove('active');
    });
  }
}

function openQuickView(id) {
  const prod = PRODUCTS.find(p => p.id === id);
  if (!prod) return;

  const modalOverlay = document.getElementById('quickViewModal');
  const modalBody = document.getElementById('modalBodyContent');

  modalBody.innerHTML = `
    <div class="modal-img-col">
      <img src="${prod.image}" alt="${prod.title}" />
    </div>
    <div class="modal-info-col">
      <span style="font-size: 0.7rem; letter-spacing: 2px; text-transform: uppercase; color: var(--rose-gold-primary); font-weight: 600;">${prod.category}</span>
      <h2 style="font-family: var(--font-serif); font-size: 2rem; margin: 6px 0 var(--space-2); color: var(--taupe-900);">${prod.title}</h2>
      <div style="font-size: 1.3rem; font-weight: 600; color: var(--taupe-800); margin-bottom: var(--space-3);">$${prod.price} USD</div>
      <p style="font-size: 0.9rem; color: var(--taupe-600); margin-bottom: var(--space-4); line-height: 1.6;">${prod.description}</p>
      
      <div style="margin-bottom: var(--space-3);">
        <label style="font-size: 0.75rem; letter-spacing: 1px; text-transform: uppercase; font-weight: 600; display: block; margin-bottom: 8px;">Select Size</label>
        <div style="display: flex; gap: 8px;">
          <button style="border: 1px solid var(--rose-gold-primary); background: var(--blush-100); padding: 8px 16px; border-radius: var(--radius-sm); font-size: 0.8rem; font-weight: 600; cursor: pointer;">FR 34 (XS)</button>
          <button style="border: 1px solid var(--blush-200); background: #FFF; padding: 8px 16px; border-radius: var(--radius-sm); font-size: 0.8rem; cursor: pointer;">FR 36 (S)</button>
          <button style="border: 1px solid var(--blush-200); background: #FFF; padding: 8px 16px; border-radius: var(--radius-sm); font-size: 0.8rem; cursor: pointer;">FR 38 (M)</button>
          <button style="border: 1px solid var(--blush-200); background: #FFF; padding: 8px 16px; border-radius: var(--radius-sm); font-size: 0.8rem; cursor: pointer;">FR 40 (L)</button>
        </div>
      </div>

      <button class="btn-primary" style="width: 100%; justify-content: center; margin-top: var(--space-3);" onclick="addToBagDirect('${prod.id}'); document.getElementById('quickViewModal').classList.remove('active');">
        Add To Shopping Bag
      </button>
    </div>
  `;

  modalOverlay.classList.add('active');
}

/* --------------------------------------------------------------------------
   Color Swatch Hex Copy & Toast
   -------------------------------------------------------------------------- */
function initColorSwatchCopy() {
  const swatchCards = document.querySelectorAll('.swatch-card');
  swatchCards.forEach(card => {
    card.addEventListener('click', () => {
      const hex = card.getAttribute('data-hex');
      if (hex) {
        navigator.clipboard.writeText(hex);
        showToast(`Copied ${hex} to clipboard`);
      }
    });
  });
}

function showToast(msg) {
  const toast = document.getElementById('toastNotification');
  if (!toast) return;

  toast.innerHTML = `<span>${msg}</span>`;
  toast.classList.add('active');
  setTimeout(() => {
    toast.classList.remove('active');
  }, 2500);
}

function toggleWishlist(btn, event) {
  event.stopPropagation();
  btn.classList.toggle('active');
  const isLiked = btn.classList.contains('active');
  showToast(isLiked ? 'Added to Wishlist' : 'Removed from Wishlist');
}
