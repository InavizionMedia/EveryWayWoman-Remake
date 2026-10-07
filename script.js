/* Every Way Woman v1 interactions */
(function(){
  "use strict";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- header scroll state ---------- */
  var header = document.querySelector(".site-header");
  var backToTop = document.getElementById("backToTop");
  function onScroll(){
    var y = window.scrollY || window.pageYOffset;
    header.classList.toggle("scrolled", y > 24);
    backToTop.classList.toggle("show", y > 600);
    if (heroEl) document.body.classList.toggle("past-hero", y > heroEl.offsetHeight - 140);
  }
  window.addEventListener("scroll", onScroll, {passive:true});
  onScroll();

  backToTop.addEventListener("click", function(){
    if (reduceMotion) { window.scrollTo(0,0); }
    else { window.scrollTo({top:0, behavior:"smooth"}); }
  });

  /* ---------- hero carousel ---------- */
  var heroEl = document.querySelector(".hero");
  var slides = Array.prototype.slice.call(document.querySelectorAll(".hero-slide"));
  var dots = Array.prototype.slice.call(document.querySelectorAll(".hero-dot"));
  var heroTitle = document.getElementById("heroTitle");
  var heroSub = document.getElementById("heroSub");
  var heroCopy = document.querySelector(".hero-copy");
  var slideCopy = [
    {t: "Real talk.<br><em>Every way.</em>", s: "Daytime talk for women — news, real stories, and great conversations."},
    {t: "Pull up<br><em>a chair.</em>", s: "Behind every episode: real cameras, real questions, real women."},
    {t: "Take<br><em>your seat.</em>", s: "Two chairs, one honest conversation — new episodes every week."}
  ];
  var cur = 0, timer = null;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function go(n){
    cur = ((n % slides.length) + slides.length) % slides.length;
    slides.forEach(function(s,i){ s.classList.toggle("is-active", i === cur); });
    dots.forEach(function(d,i){
      d.classList.toggle("is-active", i === cur);
      d.setAttribute("aria-selected", i === cur ? "true" : "false");
    });
    function swap(){
      heroTitle.innerHTML = slideCopy[cur].t;
      heroSub.textContent = slideCopy[cur].s;
      heroCopy.classList.remove("swap");
    }
    if (reduceMotion) { swap(); return; }
    heroCopy.classList.add("swap");
    setTimeout(swap, 260);
  }
  function start(){ if (!reduceMotion){ stop(); timer = setInterval(function(){ go(cur + 1); }, 7000); } }
  function stop(){ if (timer) { clearInterval(timer); timer = null; } }
  dots.forEach(function(d){
    d.addEventListener("click", function(){ go(parseInt(d.getAttribute("data-slide"), 10)); start(); });
  });
  var prevBtn = document.querySelector(".hero-prev");
  var nextBtn = document.querySelector(".hero-next");
  if (prevBtn) prevBtn.addEventListener("click", function(){ go(cur - 1); start(); });
  if (nextBtn) nextBtn.addEventListener("click", function(){ go(cur + 1); start(); });
  heroEl.addEventListener("mouseenter", stop);
  heroEl.addEventListener("mouseleave", start);
  var touchX = null;
  heroEl.addEventListener("touchstart", function(e){ touchX = e.touches[0].clientX; stop(); }, {passive:true});
  heroEl.addEventListener("touchend", function(e){
    if (touchX === null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) go(cur + (dx < 0 ? 1 : -1));
    touchX = null;
    start();
  }, {passive:true});
  start();

  /* ---------- mobile menu ---------- */
  var toggle = document.getElementById("menuToggle");
  var mobileNav = document.getElementById("mobileNav");
  var epToggle = document.getElementById("epToggle");
  var epGroup = document.getElementById("epGroup");
  function setMenu(open){
    toggle.classList.toggle("open", open);
    mobileNav.classList.toggle("open", open);
    document.body.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) {
      epToggle.setAttribute("aria-expanded", "false");
      epGroup.classList.remove("expanded");
    }
  }
  toggle.addEventListener("click", function(){
    setMenu(!mobileNav.classList.contains("open"));
  });
  epToggle.addEventListener("click", function(e){
    e.stopPropagation();
    var exp = epToggle.getAttribute("aria-expanded") === "true";
    epToggle.setAttribute("aria-expanded", exp ? "false" : "true");
    epGroup.classList.toggle("expanded", !exp);
  });
  mobileNav.querySelectorAll("a").forEach(function(a){
    a.addEventListener("click", function(){ setMenu(false); });
  });
  /* submenu taps: close the menu, then land on the section title (native anchors misbehave while body overflow is locked) */
  document.querySelectorAll('.mobile-sub a[href^="#"]').forEach(function(a){
    a.addEventListener("click", function(e){
      e.preventDefault();
      var target = document.querySelector(a.getAttribute("href"));
      setMenu(false);
      if (!target) return;
      setTimeout(function(){
        function headY(){
          var head = target.querySelector(".ep-section-head") || target;
          return head.getBoundingClientRect().top + window.pageYOffset - 100;
        }
        var y = headY();
        if (reduceMotion) { window.scrollTo(0, y); }
        else { window.scrollTo({top: y, behavior: "smooth"}); }
        /* first-tap correction: webfonts can shift the layout after the first
           measurement, landing the title under the header. Re-aim after the
           smooth scroll lands and fonts settle. */
        var lastY = y, tries = 0;
        function correct(){
          if (tries++ > 8) return;
          if (Math.abs(window.pageYOffset - lastY) > 8) { setTimeout(correct, 500); return; }
          var nowY = headY();
          if (Math.abs(nowY - lastY) < 2) return;
          lastY = nowY;
          window.scrollTo(0, nowY);
          setTimeout(correct, 500);
        }
        setTimeout(correct, 1000);
        if (document.fonts && document.fonts.ready) {
          document.fonts.ready.then(function(){ setTimeout(correct, 300); });
        }
      }, 80);
    });
  });

  /* action-bar anchors: deterministic JS scroll. Native in-page anchors land
     inconsistently on iOS (same class of issue as the mobile submenu) — measure
     the target at click time and re-aim after the scroll settles. */
  document.querySelectorAll('.action-bar a[href^="#"]').forEach(function(a){
    a.addEventListener("click", function(e){
      e.preventDefault();
      var target = document.querySelector(a.getAttribute("href"));
      if (!target) return;
      function targetY(){
        return Math.max(0, target.getBoundingClientRect().top + window.pageYOffset - 100);
      }
      var y = targetY();
      if (reduceMotion) { window.scrollTo(0, y); }
      else { window.scrollTo({top: y, behavior: "smooth"}); }
      var lastY = y, tries = 0;
      function correct(){
        if (tries++ > 10) return;
        if (Math.abs(window.pageYOffset - lastY) > 8) { setTimeout(correct, 600); return; }
        var nowY = targetY();
        if (Math.abs(nowY - lastY) < 2) return;
        lastY = nowY;
        window.scrollTo(0, nowY);
        setTimeout(correct, 600);
      }
      setTimeout(correct, 1200);
      if (document.fonts && document.fonts.ready) { document.fonts.ready.then(function(){ setTimeout(correct, 300); }); }
    });
  });

  /* ---------- espresso dark theme toggle (v6 experiment) ---------- */
  var themeBtn = document.getElementById("themeToggle");
  function setTheme(t){
    document.documentElement.setAttribute("data-theme", t);
    if (themeBtn) {
      themeBtn.setAttribute("aria-pressed", t === "dark" ? "true" : "false");
      themeBtn.setAttribute("aria-label", t === "dark" ? "Switch to light theme" : "Switch to dark theme");
    }
    try { localStorage.setItem("eww-theme", t); } catch(e){}
  }
  if (themeBtn) {
    try {
      var savedTheme = localStorage.getItem("eww-theme");
      if (savedTheme === "dark" || savedTheme === "light") setTheme(savedTheme);
    } catch(e){}
    themeBtn.addEventListener("click", function(){
      setTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark");
    });
  }

  /* ---------- featured card accordion (mobile) ---------- */
  var fToggle = document.getElementById("featuredToggle");
  if (fToggle) {
    var fCard = fToggle.closest(".featured-card");
    var mqMobile = window.matchMedia("(max-width:759px)");
    fToggle.addEventListener("click", function(){
      if (!mqMobile.matches) return;
      var open = fCard.classList.toggle("expanded");
      fToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* ---------- scroll-spy ---------- */
  var spyLinks = document.querySelectorAll("[data-spy]");
  var EP_SECTIONS = ["full-shows", "open-dialogue", "relationships"];
  var sections = ["home","story","full-shows","open-dialogue","relationships","about"].map(function(id){
    return document.getElementById(id);
  }).filter(Boolean);
  function spy(){
    var pos = (window.scrollY || window.pageYOffset) + 160;
    var current = "home";
    sections.forEach(function(s){ if (s.offsetTop <= pos) current = s.id; });
    spyLinks.forEach(function(a){
      var key = a.getAttribute("data-spy");
      var on = key === current || (key === "episodes" && EP_SECTIONS.indexOf(current) !== -1);
      a.classList.toggle("active", on);
    });
  }
  window.addEventListener("scroll", spy, {passive:true});
  spy();

  /* ---------- video lightbox (YT API player, branded end card) ---------- */
  var box = document.getElementById("videoBox");
  var titleEl = document.getElementById("lightboxTitle");
  var panel = box.querySelector(".lightbox-panel");
  var videoWrap = document.getElementById("videoWrap");
  var endcard = document.getElementById("videoEndcard");
  var replayBtn = document.getElementById("endcardReplay");
  var FEATURED_ID = "WuWBiNvv050";
  var FEATURED_TITLE = "Welcome To Every Way Woman";
  var currentTitle = FEATURED_TITLE;
  var player = null;
  var ytReady = false;
  var ytQueue = [];
  // YouTube IFrame API — lets us detect ENDED and show our own end card
  window.onYouTubeIframeAPIReady = function(){
    ytReady = true;
    ytQueue.forEach(function(fn){ fn(); });
    ytQueue = [];
  };
  (function(){
    var s = document.createElement("script");
    s.src = "https://www.youtube.com/iframe_api";
    s.async = true;
    document.head.appendChild(s);
  })();
  function onPlayerState(e){
    if (window.YT && e.data === YT.PlayerState.ENDED) endcard.hidden = false;
  }
  function onPlayerReady(e){
    // belt-and-suspenders: guarantee the fullscreen button works everywhere
    try { e.target.getIframe().setAttribute("allowfullscreen", ""); } catch(err){}
  }
  function buildPlayer(id){
    var slot = document.createElement("div");
    videoWrap.insertBefore(slot, endcard);
    player = new YT.Player(slot, {
      videoId: id,
      playerVars: {autoplay:1, rel:0, modestbranding:1, iv_load_policy:3, playsinline:1, cc_load_policy:0},
      events: {onReady: onPlayerReady, onStateChange: onPlayerState}
    });
  }
  function teardownPlayer(){
    if (player) { try { player.destroy(); } catch(err){} player = null; }
    Array.prototype.slice.call(videoWrap.children).forEach(function(ch){
      if (ch !== endcard) videoWrap.removeChild(ch);
    });
    endcard.hidden = true;
  }
  function openVideo(id, title){
    teardownPlayer();
    currentTitle = title || FEATURED_TITLE;
    titleEl.textContent = currentTitle;
    box.hidden = false;
    document.body.style.overflow = "hidden";
    // player loads immediately on open — no intermediate step
    if (ytReady && window.YT) buildPlayer(id);
    else ytQueue.push(function(){ if (!box.hidden && window.YT) buildPlayer(id); });
  }
  function closeVideo(){
    box.hidden = true;
    document.body.style.overflow = "";
    teardownPlayer();
  }
  replayBtn.addEventListener("click", function(){
    endcard.hidden = true;
    if (player) { player.seekTo(0); player.playVideo(); }
  });
  function closeMobileMenuIfOpen(){
    if (mobileNav.classList.contains("open")) setMenu(false);
  }
  document.querySelectorAll("[data-open-video]").forEach(function(b){
    b.addEventListener("click", function(){
      closeMobileMenuIfOpen();
      openVideo(FEATURED_ID, FEATURED_TITLE);
    });
  });
  document.querySelectorAll(".ep-thumb").forEach(function(btn){
    btn.addEventListener("click", function(){
      closeMobileMenuIfOpen();
      var card = btn.closest(".ep-card");
      var t = card ? card.querySelector("h3").textContent : FEATURED_TITLE;
      openVideo(btn.getAttribute("data-video"), t);
    });
  });
  box.querySelectorAll("[data-close-video]").forEach(function(b){
    b.addEventListener("click", closeVideo);
  });
  document.addEventListener("keydown", function(e){
    if (e.key === "Escape" && !box.hidden) closeVideo();
  });

  /* ---------- reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function(el){ el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, {threshold:.12});
    revealEls.forEach(function(el){ io.observe(el); });
  }

  /* ---------- newsletter (no backend — friendly confirm) ---------- */
  var nlForm = document.getElementById("nlForm");
  var nlDone = document.getElementById("nlDone");
  nlForm.addEventListener("submit", function(e){
    e.preventDefault();
    nlForm.style.display = "none";
    nlDone.hidden = false;
  });

  /* ---------- topic filtering ---------- */
  var tChips = Array.prototype.slice.call(document.querySelectorAll(".tchip"));
  var epCards = Array.prototype.slice.call(document.querySelectorAll(".ep-card"));
  var epSections = Array.prototype.slice.call(document.querySelectorAll(".ep-section"));
  var countLine = document.querySelector(".episodes .count-line");
  var countDefault = countLine ? countLine.textContent : "";
  var topicNames = {all:"every topic", "self-worth":"Self-Worth", relationships:"Relationships", career:"Career", family:"Family"};
  function applyTopic(topic){
    var shown = 0;
    epCards.forEach(function(card){
      var match = topic === "all" || card.getAttribute("data-topic") === topic;
      card.hidden = !match;
      if (match) shown++;
    });
    epSections.forEach(function(sec){
      var anyVisible = Array.prototype.some.call(sec.querySelectorAll(".ep-card"), function(c){ return !c.hidden; });
      sec.hidden = !anyVisible;
      sec.classList.toggle("filtering", topic !== "all");
      if (topic === "all") {
        sec.classList.remove("expanded");
        var smBtn = sec.querySelector(".show-more");
        if (smBtn) {
          smBtn.setAttribute("aria-expanded", "false");
          var smLabel = smBtn.querySelector(".sm-label");
          if (smLabel) smLabel.textContent = "Show " + sec.querySelectorAll(".ep-card.is-extra").length + " more";
        }
      }
    });
    tChips.forEach(function(ch){
      var on = ch.getAttribute("data-topic") === topic;
      ch.classList.toggle("is-active", on);
      ch.setAttribute("aria-pressed", on ? "true" : "false");
    });
    if (countLine) countLine.textContent = topic === "all" ? countDefault : ("Showing " + shown + " on " + topicNames[topic] + ".");
  }
  tChips.forEach(function(ch){
    ch.addEventListener("click", function(){ applyTopic(ch.getAttribute("data-topic")); });
  });
  Array.prototype.forEach.call(document.querySelectorAll("[data-goto-topic]"), function(el){
    el.addEventListener("click", function(){
      applyTopic(el.getAttribute("data-goto-topic"));
      var lib = document.getElementById("episodes");
      if (lib) lib.scrollIntoView({behavior: reduceMotion ? "auto" : "smooth", block: "start"});
      var fCard = document.querySelector(".featured-card.expanded");
      if (fCard && fToggle) { fCard.classList.remove("expanded"); fToggle.setAttribute("aria-expanded", "false"); }
    });
  });

  /* ---------- per-section show more (past 6 cards) ---------- */
  var PAGE_SIZE = 6;
  epSections.forEach(function(sec){
    var cards = Array.prototype.slice.call(sec.querySelectorAll(".ep-card"));
    if (cards.length <= PAGE_SIZE) return;
    sec.classList.add("has-more");
    var extras = cards.slice(PAGE_SIZE);
    extras.forEach(function(c){ c.classList.add("is-extra"); });
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "show-more";
    btn.innerHTML = '<span class="sm-label">Show ' + extras.length + ' more</span><svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-label", "Show more episodes in this section");
    btn.addEventListener("click", function(){
      var open = sec.classList.toggle("expanded");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.querySelector(".sm-label").textContent = open ? "Show less" : "Show " + extras.length + " more";
    });
    sec.appendChild(btn);
  });

  /* ---------- footer year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
