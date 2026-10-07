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

  /* ---------- video lightbox (click-to-load facade, ivory panel) ---------- */
  var box = document.getElementById("videoBox");
  var facade = document.getElementById("videoFacade");
  var facadeImg = facade.querySelector("img");
  var facadeDefaultSrc = facadeImg.getAttribute("src");
  var titleEl = document.getElementById("lightboxTitle");
  var panel = box.querySelector(".lightbox-panel");
  var FEATURED_ID = "WuWBiNvv050";
  var FEATURED_TITLE = "Welcome To Every Way Woman";
  var currentId = FEATURED_ID;
  var currentTitle = FEATURED_TITLE;
  function openVideo(id, title, thumbSrc){
    currentId = id;
    currentTitle = title || FEATURED_TITLE;
    titleEl.textContent = currentTitle;
    facadeImg.setAttribute("src", thumbSrc || facadeDefaultSrc);
    facadeImg.setAttribute("alt", currentTitle);
    box.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeVideo(){
    box.hidden = true;
    document.body.style.overflow = "";
    // unload player, restore facade
    var iframe = panel.querySelector("iframe");
    if (iframe) { iframe.remove(); facade.style.display = ""; }
  }
  function closeMobileMenuIfOpen(){
    if (mobileNav.classList.contains("open")) setMenu(false);
  }
  document.querySelectorAll("[data-open-video]").forEach(function(b){
    b.addEventListener("click", function(){
      closeMobileMenuIfOpen();
      openVideo(FEATURED_ID, FEATURED_TITLE, facadeDefaultSrc);
    });
  });
  document.querySelectorAll(".ep-thumb").forEach(function(btn){
    btn.addEventListener("click", function(){
      closeMobileMenuIfOpen();
      var card = btn.closest(".ep-card");
      var t = card ? card.querySelector("h3").textContent : FEATURED_TITLE;
      var img = btn.querySelector("img");
      openVideo(btn.getAttribute("data-video"), t, img ? img.getAttribute("src") : null);
    });
  });
  facade.addEventListener("click", function(){
    var iframe = document.createElement("iframe");
    iframe.src = "https://www.youtube.com/embed/" + currentId + "?autoplay=1&rel=0";
    iframe.title = currentTitle;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    facade.style.display = "none";
    panel.appendChild(iframe);
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

  /* ---------- footer year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
