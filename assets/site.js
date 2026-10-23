
(function () {
  // 星を散らす(固定シードで毎回同じ配置)
  var seed = 7;
  function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
  document.querySelectorAll('[data-stars]').forEach(function (box) {
    var n = +box.dataset.stars, f = document.createDocumentFragment();
    for (var i = 0; i < n; i++) {
      var s = document.createElement('i'), size = 1 + rnd() * 2;
      s.style.cssText = 'left:' + (rnd() * 100).toFixed(1) + '%;top:' + (rnd() * 100).toFixed(1) + '%;width:' + size.toFixed(1) + 'px;height:' + size.toFixed(1) + 'px;--o:' + (0.25 + rnd() * 0.55).toFixed(2) + ';--d:' + (3 + rnd() * 5).toFixed(1) + 's;--l:-' + (rnd() * 6).toFixed(1) + 's';
      f.appendChild(s);
    }
    box.appendChild(f);
  });

  // 星座が灯るアニメ
  var stage = document.getElementById('stage'), capText = document.getElementById('capText');
  var cs = stage.querySelectorAll('.cstar'), cl = stage.querySelectorAll('.cline'), timers = [];
  function clear() { timers.forEach(clearTimeout); timers = []; cs.forEach(function (e) { e.classList.remove('on'); }); cl.forEach(function (e) { e.classList.remove('on'); }); capText.textContent = '育成中 0/7'; }
  function play() {
    clear();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { cs.forEach(function(e){e.classList.add("on");}); cl.forEach(function(e){e.classList.add("on");}); capText.textContent="完成 7/7"; return; }
    cs.forEach(function (el, i) {
      timers.push(setTimeout(function () {
        el.classList.add('on'); capText.textContent = i === 6 ? '完成 7/7' : '育成中 ' + (i + 1) + '/7';
        if (i === 3) cl[0].classList.add('on');
        if (i === 4) cl[1].classList.add('on');
        if (i === 6) cl[2].classList.add('on');
      }, 500 + i * 650));
    });
  }
  document.getElementById('replay').addEventListener('click', play);

  // スクロール出現
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); if (e.target.contains(stage)) play(); io.unobserve(e.target); } });
    }, { threshold: .08 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
    cs.forEach(function (e) { e.classList.add('on'); }); cl.forEach(function (e) { e.classList.add('on'); }); capText.textContent = '完成 7/7';
  }
})();
