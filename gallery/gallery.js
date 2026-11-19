(function () {
  'use strict';
  var frames = Array.prototype.slice.call(document.querySelectorAll('.frame'));
  var chips = Array.prototype.slice.call(document.querySelectorAll('.chip'));
  var shown = document.getElementById('shown');
  var viewer = document.getElementById('viewer');
  var vImg = document.getElementById('v-img');
  var vN = document.getElementById('v-n');
  var vTitle = document.getElementById('v-title');
  var vPos = document.getElementById('v-pos');
  var list = frames.slice();
  var cur = 0;
  var lastFocus = null;

  function applyFilter(name) {
    list = [];
    frames.forEach(function (f) {
      var ok = name === 'All' || f.getAttribute('data-theme') === name;
      f.hidden = !ok;
      if (ok) list.push(f);
    });
    chips.forEach(function (c) {
      c.classList.toggle('is-on', c.getAttribute('data-filter') === name);
    });
    if (shown) shown.textContent = list.length;
  }

  function show(i) {
    if (!list.length) return;
    cur = (i + list.length) % list.length;
    var f = list[cur];
    vImg.src = f.getAttribute('data-full');
    vImg.alt = f.getAttribute('data-title');
    vN.textContent = 'Frame ' + f.getAttribute('data-n');
    vTitle.textContent = f.getAttribute('data-title');
    vPos.textContent = (cur + 1) + ' / ' + list.length;
  }
  function open(f) {
    var i = list.indexOf(f);
    if (i < 0) return;
    lastFocus = f;
    show(i);
    viewer.classList.add('open');
    viewer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    viewer.classList.remove('open');
    viewer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    vImg.removeAttribute('src');
    if (lastFocus) lastFocus.focus();
  }

  frames.forEach(function (f) {
    f.addEventListener('click', function () { open(f); });
    f.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(f); }
    });
  });
  chips.forEach(function (c) {
    c.addEventListener('click', function () { applyFilter(c.getAttribute('data-filter')); });
  });
  viewer.querySelector('.v-close').addEventListener('click', close);
  viewer.querySelector('.v-prev').addEventListener('click', function () { show(cur - 1); });
  viewer.querySelector('.v-next').addEventListener('click', function () { show(cur + 1); });
  viewer.addEventListener('click', function (e) { if (e.target === viewer) close(); });
  document.addEventListener('keydown', function (e) {
    if (!viewer.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(cur - 1);
    else if (e.key === 'ArrowRight') show(cur + 1);
  });

  var tx = null;
  viewer.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; }, { passive: true });
  viewer.addEventListener('touchend', function (e) {
    if (tx === null) return;
    var dx = e.changedTouches[0].clientX - tx; tx = null;
    if (Math.abs(dx) > 50) show(cur + (dx < 0 ? 1 : -1));
  }, { passive: true });
})();
