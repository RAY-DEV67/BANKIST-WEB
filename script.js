'use strict';

///////////////////////////////////////
// Modal window
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
  $(".mobilemenu").fadeOut();
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(function (btn) {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// *************** NAV HOVER ANIMATION ******************

const nav = document.querySelector('.nav');

function handleHover(e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(function (el) {
      if (el !== link) el.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
}

nav.addEventListener('mouseover', function (e) {
  handleHover(e, 0.5);
});

nav.addEventListener('mouseout', function (e) {
  handleHover(e, 1);
});

// **************** STICKY NAV INTERSECTION OBSERVER API*********************
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

function stickyNav(entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) {
      nav.classList.add('sticky');
    } else {
      nav.classList.remove('sticky');
    }
  });
}
const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const observer = new IntersectionObserver(stickyNav, obsOptions);
observer.observe(header);

// ****************** Scroll *****************

btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

// document.querySelectorAll(".nav__link").forEach(function(el){
//   el.addEventListener("click", function(e){
//     e.preventDefault()
//     const id = this.getAttribute("href")
//     console.log(id);
//     document.querySelector(id).scrollIntoView({behavior:"smooth"})
// })

// ********************* OR ******************

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// *************** SCROLL REVEAL SECTIONS ******************
const allSections = document.querySelectorAll('.section');
// const navHeight = nav.getBoundingClientRect().height;

function reavealSection(entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');

  observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(reavealSection, {
  root: null,
  threshold: 0.15,
  // rootMargin: `-${navHeight}px`,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});
// ********************* LAZY LOADING IMAGES ***********************
const imgTargets = document.querySelectorAll('img[data-src]');

function loadImg(entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;

  // *********** REPLACE SRC WITH DATA SRC*************
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(function (img) {
  imgObserver.observe(img);
});

// **************** SLIDER *******************
const slides = document.querySelectorAll('.slide');
const btnRight = document.querySelector('.slider__btn--right');
let curSlide = 0;
const btnLeft = document.querySelector('.slider__btn--left');
const maxSlide = slides.length;

slides.forEach(function (s, i) {
  s.style.transform = `translateX(${100 * i}%)`;
});

function nextslide() {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  slides.forEach(function (s, i) {
    s.style.transform = `translateX(${100 * (i - curSlide)}%)`;
  });
  activatedot(curSlide);
}

function prevslide() {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  slides.forEach(function (s, i) {
    s.style.transform = `translateX(${100 * (i - curSlide)}%)`;
  });
  activatedot(curSlide);
}
btnRight.addEventListener('click', nextslide);
btnLeft.addEventListener('click', prevslide);

// ************* USING KEYBOARD TO CONTROL SLIDER**************
document.addEventListener('keydown', function (e) {
  console.log(e);
  if (e.key === 'ArrowLeft') {
    prevslide();
  }
  if (e.key === 'ArrowRight') {
    nextslide();
  }
});

// ******************* creating the bottom dots ****************
const dotsContainer = document.querySelector('.dots');
function createDots() {
  slides.forEach(function (s, i) {
    dotsContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
}
createDots();

dotsContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    slides.forEach(function (s, i) {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
      activatedot(slide);
    });
  }
});
function activatedot(slide) {
  document.querySelectorAll('.dots__dot').forEach(function (dot) {
    dot.classList.remove('dots__dot--active');
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  });
}
activatedot(0);
// ****************** TAB COMPONENT *********************

const tabs = document.querySelectorAll('.operations__tab');
const tabscontainer = document.querySelector('.operations__tab-container');
const tabscontent = document.querySelectorAll('.operations__content');

tabscontainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);
  if (!clicked) return;

  // ACTIVE TAB
  tabs.forEach(function (t) {
    t.classList.remove('operations__tab--active');
  });

  clicked.classList.add('operations__tab--active');

  // ACTIVATE CONTENT AREA
  tabscontent.forEach(function (c) {
    c.classList.remove('operations__content--active');
  });
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// MOBILE MENU/////////////////////////
function handleOpenNav() {
  $(".mobilemenu").fadeIn();
  overlay.classList.remove('hidden');
  // $("body").css("overflow-y", "hidden")
  // $(".ham").hide()
  // $(".close").show()
}

function handleCloseNav() {
  $(".mobilemenu").fadeOut();  
  overlay.classList.add('hidden');
  // $("body").css("overflow-y", "scroll")
  // $(".ham").show()
  // $(".close").hide()
}

document.querySelector(".ham").addEventListener("click", function (e) {
  handleOpenNav();
});

document.querySelector(".close").addEventListener("click", function (e) {
  handleCloseNav();
});
