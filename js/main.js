'use strict';

{
  // ヘッダー
  const background = document.querySelector('.background');
  const open = document.getElementById('open');
  const overlay = document.querySelector('.overlay');
  const closeJump = document.querySelectorAll('a');
  const close = document.getElementById('close');

  // ページ内遷移
  const smoothScrollTrigger = document.querySelectorAll('a[href^="#jump"]');
  for (let i = 0; i < smoothScrollTrigger.length; i++) {
    smoothScrollTrigger[i].addEventListener('click', (e) => {
      e.preventDefault();
      let href = smoothScrollTrigger[i].getAttribute('href');
      let targetElement = document.getElementById(href.replace('#', ''));
      const rect = targetElement.getBoundingClientRect().top;
      const offset = window.pageYOffset;
      const gap = 100;
      const target = rect + offset - gap;
      window.scrollTo({
        top: target,
        behavior: 'smooth',
      });
    });
  }

  // Intersection Observer APIの定義

  // 要素が30％交差した時に表示させる
  const inViewObserver = new IntersectionObserver(inViewCallback, {
    threshold: 0.3,
  });

  document.querySelectorAll('.animate').forEach(el => {
    inViewObserver.observe(el);
  });

  function inViewCallback(entries) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      }
      
      entry.target.classList.add('appear');
    });
  }

  // ハンバーガーメニュー押下時、サブメニューを表示
  open.addEventListener('click', () => {
    background.classList.add('display');
    overlay.classList.add('show');
    open.classList.add('hide');
  });

  // サブメニューの✕押下時、サブメニューを非表示
  close.addEventListener('click', () => {
    background.classList.remove('display');
    overlay.classList.remove('show');
    open.classList.remove('hide');
  });

  // サブメニューからのページ遷移時
  for (let i = 0; i < closeJump.length; i++) {
    closeJump[i].addEventListener('click', () => {
      background.classList.remove('display');
      overlay.classList.remove('show');
      open.classList.remove('hide');
    });
  }

  // リロードされた時のトップ画像
  function firstPlay() {

    setTimeout(() => {
      topBackground.classList.add('wad');
    }, 1000);

    setTimeout(() => {
      images[0].classList.add('current');
    }, 1500);

    setTimeout(() => {
      topBackground.parentNode.removeChild(topBackground);
    }, 3500);
  }

  // トップ画像
  function play() {

    setTimeout(() => {
      images[currentIndex].classList.remove('current');
      currentIndex++;

      // 最後の画像までいくと最初の画像に戻す
      if (currentIndex > images.length - 1) {
        currentIndex = 0;
      }

      images[currentIndex].classList.add('current');

      // play()の繰り返し
      play();
    }, 5000);
  }

  const topBackground = document.getElementById('move');
  const images = document.querySelectorAll('.top-picture');

  // 何番目の画像を表示するかを変数で保持
  let currentIndex = 0;

  let perfEntries = performance.getEntriesByType("navigation");
  let type;

  perfEntries.forEach(perfEntrie => {
    type = perfEntrie.type;
  });

  // ページにアクセス・リロードされた場合、firstPlay()を呼び出す
  switch (type) {
    case 'navigate':
    case 'reload':
    case 'back_forward':
      firstPlay();
      break;
  }

  play();
}
