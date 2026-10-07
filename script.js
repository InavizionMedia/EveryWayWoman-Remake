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

  /* ---------- mobile menu ---------- */
  var toggle = document.getElementById("menuToggle");
  var mobileNav = document.getElementById("mobileNav");
  function setMenu(open){
    toggle.classList.toggle("open", open);
    mobileNav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.style.overflow = open ? "hidden" : "";
  }
  toggle.addEventListener("click", function(){
    setMenu(!mobileNav.classList.contains("open"));
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
