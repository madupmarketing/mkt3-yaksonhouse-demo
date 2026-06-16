/* ============================================================
   약손명가 헬스케어 Dashboard — 공유 사이드바 주입
   각 페이지: <aside class="sidebar" id="sidebar"></aside> + 이 스크립트 로드
   - nav-label(섹션명, 강조) 아래 nav-item 상시 노출
   - 페이지 타이틀(.page-title)을 active 항목명으로 통일
   ============================================================ */
(function () {
  var NAV = [
    { section: '분석 도구', items: [
      { icon: '📈', label: '광고 성과', key: 'yakson-performance', href: '../yakson-performance/index.html' },
      { icon: '📦', label: '제품 분석', key: 'yakson-review', href: '../yakson-review/index.html' }
    ]},
    { section: '인사이트', items: [
      { icon: '🎤', label: 'VOC 종합', key: 'yakson-voc', href: '../yakson-voc/index.html' },
      { icon: '🔎', label: '경쟁사 광고 모니터링', key: 'yakson-keywords', href: '../yakson-keywords/index.html' }
    ]},
    { section: '리포트', items: [
      { icon: '⚠️', label: '소재 부정 댓글 관리', key: 'yakson-alert', href: '../yakson-alert/index.html' }
    ]}
  ];

  var path = location.pathname;
  // '/{key}/' 정확 매칭만 — 한 key가 다른 key의 접두어일 때 오매칭 방지
  function isActive(key) { return path.indexOf('/' + key + '/') !== -1; }

  var html = ''
    + '<div class="brand">'
    + '  <div class="brand-logo"><img src="../_assets/logo-symbol.png" alt="Yakson"></div>'
    + '  <div><div class="brand-name">약손명가 헬스케어</div></div>'
    + '</div>';

  // nav-label 구분 없이 전체 nav-item 평면 나열 (active 항목 수가 적어 그룹 구분 불필요)
  html += '<div class="nav-section">';
  NAV.forEach(function (sec) {
    sec.items.forEach(function (it) {
      html += '<a class="nav-item' + (isActive(it.key) ? ' active' : '') + '" href="' + it.href + '">'
        + '<span class="nav-item-icon">' + it.icon + '</span>' + it.label + '</a>';
    });
  });
  html += '</div>';

  html += ''
    + '<div class="sidebar-footer">'
    + '  <div class="footer-logo"><img src="../_assets/logo-symbol.png" alt="Yakson"></div>'
    + '  <div class="footer-text">Powered by <strong>MADUP</strong></div>'
    + '  <div class="footer-logout">↪ 로그아웃</div>'
    + '</div>';

  var el = document.getElementById('sidebar');
  if (el) el.innerHTML = html;

  // 페이지 타이틀을 active 항목명으로 통일
  var activeItem = null;
  NAV.forEach(function (sec) {
    sec.items.forEach(function (it) { if (isActive(it.key)) activeItem = it; });
  });
  if (activeItem) {
    var pt = document.querySelector('.page-title');
    if (pt) pt.textContent = activeItem.label;
  }
})();
