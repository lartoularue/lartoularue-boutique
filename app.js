(() => {
  'use strict';

  const products = window.PRODUCTS || [];
  const config = window.STORE_CONFIG || {};
  const team = window.TEAM || [];
  const voices = window.VOICES || [];
  const state = { cart: JSON.parse(localStorage.getItem('lar-cart') || '[]'), filter: 'all', modal: { product: null, quantity: 1, selections: {}, view: 'front' } };
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const money = (value) => `${new Intl.NumberFormat('fr-FR').format(value)} ${config.currency || 'FCFA'}`;
  const productById = (id) => products.find((product) => product.id === id);
  const persistCart = () => localStorage.setItem('lar-cart', JSON.stringify(state.cart));
  const totalItems = () => state.cart.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = () => state.cart.reduce((sum, line) => sum + (line.price * line.quantity), 0);
  const toast = (message) => { const node = $('[data-toast]'); node.textContent = message; node.classList.add('is-visible'); clearTimeout(toast.timer); toast.timer = setTimeout(() => node.classList.remove('is-visible'), 3300); };
  const setStatus = (selector, message) => { const node = $(selector); if (node) node.textContent = message; };

  function productArt(product, className = '') {
    const visual = product.image ? `<img class="product-image" src="${product.image}" alt="Visuel ${product.name}" />` : '<span class="product-object"></span>';
    return `<div class="product-art ${product.art} ${className}" data-open-product="${product.id}" role="button" tabindex="0" aria-label="Voir ${product.name}">${visual}<span class="product-art__index">${String(products.indexOf(product) + 1).padStart(2, '0')}</span><span class="product-art__label">${product.badge}</span></div>`;
  }

  function renderProducts() {
    const grid = $('[data-product-grid]');
    const visible = state.filter === 'all' ? products : products.filter((product) => product.type === state.filter);
    grid.innerHTML = visible.map((product) => `<article class="product-card" data-product-card="${product.id}">${productArt(product)}<div class="product-info"><h3>${product.name}</h3><p>${product.category}</p><strong class="product-price">${money(product.price)}</strong><div class="product-actions"><div class="quantity-control" data-card-quantity="${product.id}"><button type="button" data-card-minus="${product.id}" aria-label="Diminuer">−</button><span>1</span><button type="button" data-card-plus="${product.id}" aria-label="Augmenter">+</button></div><button class="quick-add" type="button" data-quick-add="${product.id}">Précommander</button></div></div></article>`).join('');
    bindProductEvents();
  }

  function bindProductEvents() {
    $$('[data-open-product]').forEach((node) => { node.addEventListener('click', () => openModal(node.dataset.openProduct)); node.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openModal(node.dataset.openProduct); } }); });
    $$('[data-quick-add]').forEach((button) => button.addEventListener('click', () => { const quantity = Number($(`[data-card-quantity="${button.dataset.quickAdd}"] span`).textContent); addToCart(button.dataset.quickAdd, quantity); }));
    $$('[data-card-minus]').forEach((button) => button.addEventListener('click', (event) => { event.stopPropagation(); changeCardQuantity(button.dataset.cardMinus, -1); }));
    $$('[data-card-plus]').forEach((button) => button.addEventListener('click', (event) => { event.stopPropagation(); changeCardQuantity(button.dataset.cardPlus, 1); }));
  }

  function changeCardQuantity(id, delta) { const span = $(`[data-card-quantity="${id}"] span`); span.textContent = Math.max(1, Number(span.textContent) + delta); }

  function addToCart(id, quantity = 1, selections = {}) {
    const product = productById(id); if (!product) return;
    const normalized = { model: selections.model || product.models?.[0] || '', color: selections.color || product.colors?.[0] || '', size: selections.size || product.sizes?.[1] || '' };
    const key = [id, normalized.model, normalized.color, normalized.size].join('|');
    const existing = state.cart.find((line) => line.key === key);
    if (existing) existing.quantity += quantity; else state.cart.push({ key, id, price: product.price, quantity, ...normalized });
    persistCart(); renderCart(); updateCount(); toast(`${quantity > 1 ? `${quantity} articles ajoutés` : 'Article ajouté'} à votre précommande.`); openCart();
  }

  function updateCount() { $('[data-cart-count]').textContent = totalItems(); }
  function renderCart() {
    const items = $('[data-cart-items]'); const empty = $('[data-cart-empty]'); const footer = $('[data-cart-footer]');
    empty.hidden = state.cart.length > 0; footer.hidden = state.cart.length === 0;
    items.innerHTML = state.cart.map((line) => { const product = productById(line.id); if (!product) return ''; const details = [line.model, line.color, line.size].filter(Boolean).join(' · '); const visual = product.image ? `<img class="product-image" src="${product.image}" alt="" />` : '<span class="product-object"></span>'; return `<div class="cart-line"><div class="cart-line-art ${product.art}">${visual}</div><div class="cart-line-copy"><strong>${product.name}</strong><span>${details}</span><div class="cart-line-actions"><div class="quantity-control"><button type="button" data-cart-minus="${line.key}" aria-label="Diminuer">−</button><span>${line.quantity}</span><button type="button" data-cart-plus="${line.key}" aria-label="Augmenter">+</button></div><button class="cart-remove" type="button" data-cart-remove="${line.key}">Retirer</button></div></div><strong class="cart-line-price">${money(line.price * line.quantity)}</strong></div>`; }).join('');
    $('[data-cart-subtotal]').textContent = money(subtotal());
    $('[data-delivery-note]').textContent = 'Retrait à Cotonou ou livraison dans le quartier, selon votre choix.';
    $$('[data-cart-minus]').forEach((button) => button.addEventListener('click', () => adjustLine(button.dataset.cartMinus, -1)));
    $$('[data-cart-plus]').forEach((button) => button.addEventListener('click', () => adjustLine(button.dataset.cartPlus, 1)));
    $$('[data-cart-remove]').forEach((button) => button.addEventListener('click', () => removeLine(button.dataset.cartRemove)));
  }
  function adjustLine(key, delta) { const line = state.cart.find((item) => item.key === key); if (!line) return; line.quantity += delta; if (line.quantity <= 0) state.cart = state.cart.filter((item) => item.key !== key); persistCart(); renderCart(); updateCount(); }
  function removeLine(key) { state.cart = state.cart.filter((item) => item.key !== key); persistCart(); renderCart(); updateCount(); }

  function fillOption(container, values, group, selected) { container.innerHTML = (values || []).map((value) => `<button type="button" class="option-button ${value === selected ? 'is-selected' : ''}" data-option-value="${value}" data-option-group="${group}">${value}</button>`).join(''); }
  function openModal(id) {
    const product = productById(id); if (!product) return; const modal = $('[data-product-modal]');
    state.modal = { product, quantity: 1, view: 'front', selections: { model: product.models?.[0] || '', color: product.colors?.[0] || '', size: product.sizes?.[1] || '' } };
    $('[data-modal-category]').textContent = product.category; $('[data-modal-title]').textContent = product.name; $('[data-modal-price]').textContent = money(product.price); $('[data-modal-description]').textContent = product.description;
    fillOption($('[data-modal-models]'), product.models, 'model', state.modal.selections.model); fillOption($('[data-modal-colors]'), product.colors, 'color', state.modal.selections.color); fillOption($('[data-modal-sizes]'), product.sizes, 'size', state.modal.selections.size);
    $('[data-option-model]').hidden = !product.models?.length; $('[data-option-color]').hidden = !product.colors?.length; $('[data-option-size]').hidden = !product.sizes?.length;
    $('[data-modal-quantity]').textContent = '1'; $('[data-modal-art]').className = `modal-product-art ${product.art}`; $('[data-modal-art]').innerHTML = product.image ? `<img class="product-image" src="${product.image}" alt="Visuel ${product.name}" />` : '<span class="product-object"></span>';
    $('[data-modal-backdrop]').hidden = false; modal.hidden = false; document.body.classList.add('is-locked'); requestAnimationFrame(() => $('[data-modal-backdrop]').classList.add('is-visible'));
  }
  function closeModal() { $('[data-product-modal]').hidden = true; $('[data-modal-backdrop]').hidden = true; if (!$('[data-cart-drawer]').classList.contains('is-open')) document.body.classList.remove('is-locked'); }

  function openCart() { $('[data-cart-drawer]').classList.add('is-open'); $('[data-cart-drawer]').setAttribute('aria-hidden', 'false'); $('[data-drawer-scrim]').hidden = false; document.body.classList.add('is-locked'); }
  function closeCart() { $('[data-cart-drawer]').classList.remove('is-open'); $('[data-cart-drawer]').setAttribute('aria-hidden', 'true'); $('[data-drawer-scrim]').hidden = true; if ($('[data-product-modal]').hidden) document.body.classList.remove('is-locked'); }

  function getOrderPayload() {
    const form = $('[data-order-form]'); const data = new FormData(form); return { type: 'preorder', createdAt: new Date().toISOString(), customer: { name: data.get('name'), whatsapp: data.get('whatsapp'), delivery: data.get('delivery') }, amount: subtotal(), items: state.cart.map((line) => ({ ...line, product: productById(line.id)?.name })) };
  }
  async function sendTracking(payload) { if (!config.googleAppsScriptUrl) return; try { await fetch(config.googleAppsScriptUrl, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(payload) }); } catch (error) { console.warn('Suivi Google Sheets indisponible', error); } }
  function paymentUrl(amount) { const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent); const template = config.mobileMoney?.mtnUssdTemplate || config.mobileMoney?.moovUssdTemplate; if (isMobile && template) return template.replace('{amount}', amount); return config.fedapayUrl || ''; }
  function handlePayment(payload) { sendTracking(payload); const url = paymentUrl(payload.amount); if (url) { window.location.href = url; return; } setStatus('[data-order-status]', 'Paiement non configuré : renseignez FedaPay ou un template USSD dans data/products.js.'); toast('Le paiement doit encore être configuré par l’équipe.'); }
  function orderMessage(payload) { const lines = payload.items.map((line) => `• ${line.quantity} × ${line.product}${[line.model, line.color, line.size].filter(Boolean).length ? ` (${[line.model, line.color, line.size].filter(Boolean).join(', ')})` : ''}`).join('\n'); return `Bonjour, je souhaite précommander le merch L’ART OU LA RUE.\n\n${lines}\n\nTotal : ${money(payload.amount)}\nNom : ${payload.customer.name}\nWhatsApp : ${payload.customer.whatsapp}\nRéception : ${payload.customer.delivery}`; }

  function renderPeople(target, people) { $(target).innerHTML = people.map(([name, role, gender, image]) => `<article class="person-card"><div class="avatar ${gender === 'female' ? 'avatar--female' : ''} ${image ? 'avatar--photo' : ''}" aria-hidden="true">${image ? `<img src="${image}" alt="Portrait de ${name}" />` : ''}</div><strong>${name}</strong><span>${role}</span></article>`).join(''); }

  $$('[data-filter]').forEach((button) => button.addEventListener('click', () => { state.filter = button.dataset.filter; $$('[data-filter]').forEach((item) => item.classList.toggle('is-active', item === button)); renderProducts(); }));
  $('[data-open-cart]').addEventListener('click', openCart); $$('[data-close-cart]').forEach((button) => button.addEventListener('click', closeCart)); $('[data-drawer-scrim]').addEventListener('click', closeCart); $('[data-close-modal]').addEventListener('click', closeModal); $('[data-modal-backdrop]').addEventListener('click', closeModal);
  $('[data-modal-minus]').addEventListener('click', () => { state.modal.quantity = Math.max(1, state.modal.quantity - 1); $('[data-modal-quantity]').textContent = state.modal.quantity; }); $('[data-modal-plus]').addEventListener('click', () => { state.modal.quantity += 1; $('[data-modal-quantity]').textContent = state.modal.quantity; });
  $$('[data-view]').forEach((button) => button.addEventListener('click', () => { state.modal.view = button.dataset.view; $$('[data-view]').forEach((item) => item.classList.toggle('is-active', item === button)); $('[data-modal-art]').classList.toggle('is-back', state.modal.view === 'back'); }));
  $$('[data-modal-models], [data-modal-colors], [data-modal-sizes]').forEach((group) => group.addEventListener('click', (event) => { const button = event.target.closest('[data-option-value]'); if (!button) return; const option = button.dataset.optionGroup; state.modal.selections[option] = button.dataset.optionValue; $$(`[data-option-group="${option}"]`).forEach((item) => item.classList.toggle('is-selected', item === button)); }));
  $('[data-modal-add]').addEventListener('click', () => { addToCart(state.modal.product.id, state.modal.quantity, state.modal.selections); closeModal(); });
  $('[data-whatsapp]').addEventListener('click', () => { const form = $('[data-order-form]'); if (!form.reportValidity()) return; const payload = getOrderPayload(); sendTracking(payload); const url = `https://wa.me/${config.whatsappNumber || ''}?text=${encodeURIComponent(orderMessage(payload))}`; window.open(url, '_blank', 'noopener'); setStatus('[data-order-status]', 'Votre message WhatsApp est prêt.'); });
  $('[data-pay]').addEventListener('click', () => { const form = $('[data-order-form]'); if (!form.reportValidity()) return; handlePayment(getOrderPayload()); });
  $$('[data-support-amount]').forEach((button) => button.addEventListener('click', () => { $('[data-support-form] [name="amount"]').value = button.dataset.supportAmount; $$('[data-support-amount]').forEach((item) => item.classList.toggle('is-active', item === button)); }));
  $('[data-support-form]').addEventListener('submit', (event) => { event.preventDefault(); const data = new FormData(event.currentTarget); const payload = { type: 'support', createdAt: new Date().toISOString(), amount: Number(data.get('amount')), name: data.get('name') || 'Anonyme' }; sendTracking(payload); const url = paymentUrl(payload.amount); if (url) window.location.href = url; else setStatus('[data-support-status]', 'Merci pour votre soutien. Configurez le lien FedaPay ou l’USSD dans data/products.js pour activer le paiement.'); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') { closeModal(); closeCart(); } });

  renderProducts(); renderCart(); updateCount(); renderPeople('[data-team-grid]', team); renderPeople('[data-voices-grid]', voices);
})();
