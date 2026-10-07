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
  var sections = ["home","open-dialogue","episodes","about"].map(function(id){
    return document.getElementById(id);
  }).filter(Boolean);
  function spy(){
    var pos = (window.scrollY || window.pageYOffset) + 160;
    var current = "home";
    sections.forEach(function(s){ if (s.offsetTop <= pos) current = s.id; });
    spyLinks.forEach(function(a){
      a.classList.toggle("active", a.getAttribute("data-spy") === current);
    });
  }
  window.addEventListener("scroll", spy, {passive:true});
  spy();

  /* ---------- video lightbox (click-to-load facade) ---------- */
  var box = document.getElementById("videoBox");
  var facade = document.getElementById("videoFacade");
  var panel = box.querySelector(".lightbox-panel");
  var YT_ID = "WuWBiNvv050";
  function openVideo(){
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
  document.querySelectorAll("[data-open-video]").forEach(function(b){
    b.addEventListener("click", function(){
      if (mobileNav.classList.contains("open")) setMenu(false);
      openVideo();
    });
  });
  facade.addEventListener("click", function(){
    var iframe = document.createElement("iframe");
    iframe.src = "https://www.youtube.com/embed/" + YT_ID + "?autoplay=1&rel=0";
    iframe.title = "Welcome To Every Way Woman";
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

  /* ---------- episode filters ---------- */
  var filters = document.querySelectorAll(".filter");
  var cards = document.querySelectorAll(".ep-card");
  var epCount = document.getElementById("epCount");
  function applyFilter(topic){
    var n = 0;
    cards.forEach(function(c){
      var show = topic === "all" || c.getAttribute("data-topic") === topic;
      c.classList.toggle("hide", !show);
      if (show) n++;
    });
    epCount.textContent = n;
  }
  filters.forEach(function(f){
    f.addEventListener("click", function(){
      filters.forEach(function(x){
        x.classList.remove("active");
        x.setAttribute("aria-selected","false");
      });
      f.classList.add("active");
      f.setAttribute("aria-selected","true");
      applyFilter(f.getAttribute("data-filter"));
    });
  });
  // deep-link from the action bar "Topics" button
  document.querySelectorAll("[data-topic-jump]").forEach(function(a){
    a.addEventListener("click", function(){
      var t = a.getAttribute("data-topic-jump");
      var btn = document.querySelector('.filter[data-filter="'+t+'"]');
      if (btn) btn.click();
    });
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
