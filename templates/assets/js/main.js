// Dear for Halo — 主题切换与导航高亮
// Thymeleaf 3.1 不再提供 #request，当前页面路径只能在前端比对
(function () {
  'use strict';

  var root = document.documentElement;
  var STORAGE_KEY = 'dear-color-scheme';

  function applyDark(dark) {
    root.classList.toggle('dark', dark);
    try {
      localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light');
    } catch (e) {
      /* 隐私模式下写入失败时忽略，本次切换仍然生效 */
    }
  }

  var toggle = document.getElementById('dear-theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      applyDark(!root.classList.contains('dark'));
    });
  }

  var normalize = function (path) {
    var value = (path || '/').replace(/\/+$/, '');
    return value === '' ? '/' : value;
  };

  var current = normalize(window.location.pathname);
  var links = document.querySelectorAll('header nav a');
  for (var i = 0; i < links.length; i++) {
    var href = links[i].getAttribute('href') || '';
    if (href.charAt(0) !== '/') {
      continue;
    }
    if (normalize(href) === current) {
      links[i].classList.add('current');
    }
  }
})();
