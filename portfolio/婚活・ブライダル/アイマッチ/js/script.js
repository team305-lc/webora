document.addEventListener('DOMContentLoaded', function () {
  // ヘッダーのスクロール時の見た目切り替え
  var header = document.getElementById('header');
  var toggleHeaderState = function () {
    if (window.scrollY > 10) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };
  toggleHeaderState();
  window.addEventListener('scroll', toggleHeaderState);

  // モバイルメニューの開閉
  var toggleBtn = document.getElementById('headerToggle');
  var nav = document.getElementById('headerNav');

  var closeNav = function () {
    nav.classList.remove('is-open');
    toggleBtn.classList.remove('is-active');
    toggleBtn.setAttribute('aria-expanded', 'false');
  };

  toggleBtn.addEventListener('click', function () {
    var isOpen = nav.classList.toggle('is-open');
    toggleBtn.classList.toggle('is-active', isOpen);
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeNav);
  });

  // カード画像の回転登場アニメーション(画面に入るたびに再生)
  var spinCards = document.querySelectorAll('.highlight__card, .couples__card');
  if (spinCards.length) {
    var cardObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var card = entry.target;
        if (entry.isIntersecting) {
          card.classList.remove('is-inview');
          void card.offsetWidth;
          card.classList.add('is-inview');
        } else {
          card.classList.remove('is-inview');
        }
      });
    }, { threshold: 0.3 });

    spinCards.forEach(function (card) {
      cardObserver.observe(card);
    });
  }

  // 体験談カルーセル(数秒ごとに1枚ずつ進む・ループ)
  // ループ境界用の複製スライドはJSで動的に作らず、HTMLに最初から静的に配置している
  // (先頭の前に#06の複製、末尾の後に#01の複製)。そのため画像はページ読み込み時に
  // 他のスライドと同じように一度だけ読み込まれ、以後DOMを一切移動させないので
  // 再読み込みや再描画によるちらつきが原理的に発生しない。複製に到達したら見た目が
  // 同一の本物のスライド位置へ、アニメーションなしで瞬時に切り替える。
  var voiceTrack = document.getElementById('voiceTrack');
  if (voiceTrack) {
    var voiceSlides = Array.prototype.slice.call(voiceTrack.querySelectorAll('.voice-carousel__slide'));
    var voiceLastPos = voiceSlides.length - 1; // 末尾の複製(#01)のDOM位置
    var voiceDots = document.querySelectorAll('#voiceDots button');
    var voicePrev = document.getElementById('voicePrev');
    var voiceNext = document.getElementById('voiceNext');
    var voiceCurrentPos = 1; // 本物の#01スライドのDOM位置(0番目は複製の#06)
    var voiceAutoTimer = null;
    var voiceIsScrolling = false;

    var voiceUpdateDots = function () {
      var logicalIndex = parseInt(voiceSlides[voiceCurrentPos].getAttribute('data-index'), 10);
      voiceDots.forEach(function (dot, i) {
        dot.classList.toggle('is-active', i === logicalIndex);
      });
    };

    var voiceScrollToPos = function (pos, smooth) {
      var slide = voiceSlides[pos];
      var trackRect = voiceTrack.getBoundingClientRect();
      var slideRect = slide.getBoundingClientRect();
      var delta = (slideRect.left + slideRect.width / 2) - (trackRect.left + trackRect.width / 2);
      if (smooth) {
        voiceTrack.scrollBy({ left: delta, behavior: 'smooth' });
      } else {
        voiceTrack.scrollLeft += delta;
      }
    };

    // 初期位置を本物の先頭スライド(#01)に合わせる
    voiceScrollToPos(voiceCurrentPos, false);
    voiceUpdateDots();

    // scrollLeftの実際の値が数フレーム連続で変化しなくなった時点を「完全に止まった」とみなす。
    // タイマーの決め打ちに頼らないため、環境差(描画の遅延など)があっても取りこぼしなく確実に検知できる。
    var voiceWaitForSettle = function (callback) {
      var lastLeft = voiceTrack.scrollLeft;
      var stableFrames = 0;
      var maxFrames = 300; // 万一止まったと判定できない場合の保険(約5秒)
      var frameCount = 0;

      var check = function () {
        frameCount++;
        var current = voiceTrack.scrollLeft;
        if (Math.abs(current - lastLeft) < 0.5) {
          stableFrames++;
        } else {
          stableFrames = 0;
          lastLeft = current;
        }

        if (stableFrames >= 4 || frameCount >= maxFrames) {
          callback();
        } else {
          requestAnimationFrame(check);
        }
      };

      requestAnimationFrame(check);
    };

    var voiceStepBy = function (direction) {
      if (voiceIsScrolling) return;
      voiceIsScrolling = true;

      var targetPos = voiceCurrentPos + direction;
      voiceScrollToPos(targetPos, true);

      voiceWaitForSettle(function () {
        if (targetPos === 0) {
          // 先頭の複製(#06)に到達 → 見た目が同一の本物の#06位置へ瞬時に切り替え
          voiceCurrentPos = voiceLastPos - 1;
          voiceScrollToPos(voiceCurrentPos, false);
        } else if (targetPos === voiceLastPos) {
          // 末尾の複製(#01)に到達 → 見た目が同一の本物の#01位置へ瞬時に切り替え
          voiceCurrentPos = 1;
          voiceScrollToPos(voiceCurrentPos, false);
        } else {
          voiceCurrentPos = targetPos;
        }
        voiceUpdateDots();
        voiceIsScrolling = false;
      });
    };

    var voiceGoNext = function () {
      voiceStepBy(1);
    };

    var voiceGoPrev = function () {
      voiceStepBy(-1);
    };

    var voiceGoToDot = function (index) {
      if (voiceIsScrolling) return;
      voiceIsScrolling = true;
      voiceCurrentPos = index + 1; // 本物のスライドはDOM位置1から始まる
      voiceScrollToPos(voiceCurrentPos, true);
      voiceWaitForSettle(function () {
        voiceUpdateDots();
        voiceIsScrolling = false;
      });
    };

    var voiceStopAuto = function () {
      if (voiceAutoTimer) {
        window.clearInterval(voiceAutoTimer);
        voiceAutoTimer = null;
      }
    };

    var voiceStartAuto = function () {
      voiceStopAuto();
      voiceAutoTimer = window.setInterval(voiceGoNext, 4500);
    };

    voicePrev.addEventListener('click', function () {
      voiceGoPrev();
      voiceStartAuto();
    });

    voiceNext.addEventListener('click', function () {
      voiceGoNext();
      voiceStartAuto();
    });

    voiceDots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        voiceGoToDot(i);
        voiceStartAuto();
      });
    });

    // 矢印/ドットのクリックはvoiceStepBy側でループ境界の複製→本物への切り替えを行うが、
    // 指でのスワイプ(ネイティブスクロール)はそれを経由しないため、ここで別途検知して
    // 複製スライドに着地した場合に見た目が同一の本物の位置へ切り替える。
    var voiceGetNearestPos = function () {
      var trackRect = voiceTrack.getBoundingClientRect();
      var trackCenter = trackRect.left + trackRect.width / 2;
      var nearestPos = voiceCurrentPos;
      var nearestDist = Infinity;
      voiceSlides.forEach(function (slide, i) {
        var r = slide.getBoundingClientRect();
        var dist = Math.abs((r.left + r.width / 2) - trackCenter);
        if (dist < nearestDist) {
          nearestDist = dist;
          nearestPos = i;
        }
      });
      return nearestPos;
    };

    var voiceScrollSettleTimer = null;
    voiceTrack.addEventListener(
      'scroll',
      function () {
        if (voiceIsScrolling) return;
        if (voiceScrollSettleTimer) window.clearTimeout(voiceScrollSettleTimer);
        voiceScrollSettleTimer = window.setTimeout(function () {
          if (voiceIsScrolling) return;
          var pos = voiceGetNearestPos();
          if (pos === 0) {
            voiceCurrentPos = voiceLastPos - 1;
            voiceScrollToPos(voiceCurrentPos, false);
          } else if (pos === voiceLastPos) {
            voiceCurrentPos = 1;
            voiceScrollToPos(voiceCurrentPos, false);
          } else {
            voiceCurrentPos = pos;
          }
          voiceUpdateDots();
        }, 120);
      },
      { passive: true }
    );

    voiceTrack.addEventListener('pointerdown', voiceStopAuto);

    // 画面内にあるときだけ自動再生する(意図しないページスクロールを避ける)
    var voiceSectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          voiceStartAuto();
        } else {
          voiceStopAuto();
        }
      });
    }, { threshold: 0.2 });
    voiceSectionObserver.observe(voiceTrack.closest('.voice'));

    window.addEventListener('resize', function () {
      voiceScrollToPos(voiceCurrentPos, false);
    });
  }

  // FAQアコーディオン
  document.querySelectorAll('.faq__question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq__item');
      var answer = item.querySelector('.faq__answer');
      var isOpen = btn.getAttribute('aria-expanded') === 'true';

      if (isOpen) {
        btn.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = null;
      } else {
        btn.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
});
