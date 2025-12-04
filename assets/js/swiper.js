

let heroSwiper = new Swiper(".a-hero-swiper", {
  spaceBetween: 20,
  slidesPerView: 3,
  loop: true,
  centeredSlides: true,

  autoplay: {
    delay: 1,
    disableOnInteraction: false,
  },
  speed: 3000,
  on: {
    slideChange: updateImproveHeroStyle,
    transitionStart: updateImproveHeroStyle,
  },
  breakpoints: {
    320: { slidesPerView: 2.1, spaceBetween: 8 },
    400: { slidesPerView: 2.5, spaceBetween: 8 },
    500: { slidesPerView: 3 },
    600: { slidesPerView: 2.5 },
    700: { slidesPerView: 3 },
    800: { slidesPerView: 4 },
    1000: { slidesPerView: 5, spaceBetween: 12 },
    1399: { slidesPerView: 5.3, spaceBetween: 12 },
  },
});

function updateImproveHeroStyle() {
  const allItemsImprove = document.querySelectorAll(".a-improve-hero-card");

  allItemsImprove.forEach((item) => {
    const lowQuality = item.getAttribute("data-low");
    const highQuality = item.getAttribute("data-high");
    const cardName = item.querySelector(".a-improve-card-name p");

    const slide = item.closest(".a-hero-swiper .swiper-slide");
    if (slide.classList.contains("swiper-slide-active")) {
      item.classList.add("active");

      // setTimeout(() => {
      //     cardName.textContent = "Результат";
      // }, 300);

      // Обновляем фон плавно
      // setTimeout(() => {
      //     if (highQuality) {
      //         item.style.backgroundImage = `url('${highQuality}')`;
      //
      //     }
      // }, 300);
    } else {
      // cardName.textContent = "Оригинал";
      item.classList.remove("active");
      //
      // if (lowQuality) {
      //     item.style.backgroundImage = `url('${lowQuality}')`;
      //
      // }
    }
  });
}

updateImproveHeroStyle();



let swiperWhy = null

function initSwipers() {
    const width = window.innerWidth

    if (width <= 1024 && !swiperWhy) {
        swiperWhy = new Swiper('.b-why__swiper', {
            slidesPerView: 'auto',
            spaceBetween: 20,
            pagination: {
                el: '.b-why__pagination',
                clickable: true,
            },
        })
    } else if (width > 1024 && swiperWhy) {
        swiperWhy.destroy(true, true)
        swiperWhy = null
    }

}

initSwipers()

window.addEventListener('resize', () => {
    initSwipers()
})







const sliderSettings = {
  "b-reviews-swiper": {
    desktopSlides: 2.7,
    mobileSlides: 1
  },
  "a-reviews-swiper": {
    desktopSlides: 3,
    mobileSlides: 1
  },
    "b-reviews-swiper": {
    desktopSlides: 3,
    mobileSlides: 1
  },

  
  "c-reviews-swiper": {
    desktopSlides: 2.8,
    mobileSlides: 1
  },
 "d-reviews-swiper": {
    desktopSlides: 3,
    mobileSlides: 1
  },
 "f-reviews-swiper": {
    desktopSlides: 3,
    mobileSlides: 1
  },
   "g-reviews-swiper": {
    desktopSlides: 2.9,
    mobileSlides: 1
  },
    "h-reviews-swiper": {
    desktopSlides: 2.8,
    mobileSlides: 1
  },
  "i-reviews-swiper": {
    desktopSlides: 3,
    mobileSlides: 1
  },
  "k-reviews-swiper": {
    desktopSlides: 2.8,
    mobileSlides: 1
  },
   "l-reviews-swiper": {
    desktopSlides: 2.8,
    mobileSlides: 1
  },
    "m-reviews-swiper": {
    desktopSlides: 2.8,
    mobileSlides: 1
  },
      "n-reviews-swiper": {
    desktopSlides: 2.8,
    mobileSlides: 1
  },
};

let swipers = []; 

function initAllReviewSwipers() {
  const isDesktop = window.innerWidth >= 992;

  swipers.forEach(obj => obj.instance.destroy(true, true));
  swipers = [];

  document.querySelectorAll(".reviews-swiper").forEach(sliderEl => {
    
    const className = [...sliderEl.classList].find(c => c.endsWith("-reviews-swiper"));

    const config = sliderSettings[className] || {
      desktopSlides: 3,
      mobileSlides: 1
    };

    const swiperInstance = new Swiper(sliderEl, {
      direction: isDesktop ? "vertical" : "horizontal",
      slidesPerView: isDesktop ? config.desktopSlides : config.mobileSlides,
      spaceBetween: 10,
      autoHeight:true,

      freeMode: {
        enabled: isDesktop,
        momentum: false,
      },

      pagination: {
        el: sliderEl.querySelector(".reviews-pagination"),
        clickable: true,
      },

      loop: true,
      allowTouchMove: !isDesktop,
    });

    const data = {
      el: sliderEl,
      instance: swiperInstance,
      translate: 0,
      scrolling: true
    };

    swipers.push(data);

    if (isDesktop) startInfiniteScroll(data);
  });
}

function startInfiniteScroll(swiperObj) {
  function animate() {
    if (!swiperObj.scrolling) return requestAnimationFrame(animate);

    const speed = 0.35;
    swiperObj.translate -= speed;

    const maxTranslate =
      swiperObj.el.querySelector(".swiper-wrapper").scrollHeight / 2;

    if (Math.abs(swiperObj.translate) >= maxTranslate) {
      swiperObj.translate = 0;
    }

    swiperObj.el.querySelector(".swiper-wrapper").style.transform =
      `translate3d(0, ${swiperObj.translate}px, 0)`;

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);

  swiperObj.el.addEventListener("mouseenter", () => {
    swiperObj.scrolling = false;
  });

  swiperObj.el.addEventListener("mouseleave", () => {
    swiperObj.scrolling = true;
  });
}

window.addEventListener("load", initAllReviewSwipers);

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(initAllReviewSwipers, 200);
});





let reviewsSwiper;
let currentDirection;
let featuresSwiper;

function initSwiper() {
  const isMobile = window.innerWidth <= 992;
  const isFeaturesMobile = window.innerWidth <= 768;
  const direction = isMobile ? "horizontal" : "vertical";

  if (isFeaturesMobile) {
    if (!featuresSwiper) {
      featuresSwiper = new Swiper(".g-features__swiper", {
        spaceBetween: 20,
        slidesPerView: 2,
        pagination: {
          el: ".g-features-pagination",
          clickable: true,
        },
        breakpoints: {
          300: { slidesPerView: 1, spaceBetween: 8 },
          400: { slidesPerView: 1, spaceBetween: 8 },
          500: { slidesPerView: 1.5, spaceBetween: 8 },
          600: { slidesPerView: 2 },
        },
      });
    }
  } else {
    if (featuresSwiper) {
      featuresSwiper.destroy(true, true);
      featuresSwiper = null;
    }
  }

}

window.addEventListener("load", initSwiper);
window.addEventListener("resize", () => {
  clearTimeout(window._resizeTimer);
  window._resizeTimer = setTimeout(initSwiper, 250);
});



const swiper = new Swiper(".h-how-work-swiper", {
  spaceBetween: 10,
  slidesPerView:3,
  pagination: {
    el: ".h-work-swiper-pagination",
    clickable: true,
  },

  breakpoints: {
    320: { slidesPerView: 1 },
    490: { slidesPerView: 1.2 },
    620: { slidesPerView: 1.5 , },
    810: { slidesPerView: 2 },
    992: { slidesPerView: 2.5 },
    1263: { slidesPerView: 2.6 },
    1300: { slidesPerView: 3 },
  },
});



const iPossibilitiesSwiper = new Swiper(".i-possibilities-swiper", {
  spaceBetween: 10,
  slidesPerView:3,
  pagination: {
    el: ".i-possibilities-pagination",
    clickable: true,
  },

  breakpoints: {
    320: { slidesPerView: 1 },
    490: { slidesPerView: 1 },
    530: { slidesPerView: 1.3 , },
     570: { slidesPerView: 1.4 , },
    620: { slidesPerView: 1.5 , },
    810: { slidesPerView: 2 },
    992: { slidesPerView: 2.5 },
    1263: { slidesPerView: 2.6 },
    1300: { slidesPerView: 3 },
  },
});

const jHeroSwiper = new Swiper(".j-hero-swiper", {
  spaceBetween: 10,
  slidesPerView:1,
  pagination: {
    el: ".j-hero-pagination",
    clickable: true,
  },


});

const Kswiper = new Swiper(".k-possibilities-swiper", {
  spaceBetween: 10,
  slidesPerView:1,
  pagination: {
    el: ".k-possibilities-pagination",
    clickable: true,
  },


});

const swiperProcess = new Swiper(".l-process-swiper", {
  spaceBetween: 10,
  slidesPerView: 3,
  pagination: {
    el: ".l-process-pagination",
    clickable: true,
  },
  breakpoints: {
      300: {
      slidesPerView: 1,
    },
     540: {
      slidesPerView: 1.5,
    },
    640: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 2.5,
    },

    1100: {
      slidesPerView: 3,
    },
  },
});

const nHeroSwiper = new Swiper(".n-hero-swiper", {
  spaceBetween: 10,
  slidesPerView: 1,
  pagination: {
    el: ".n-hero-pagination",
    clickable: true,
  },
});


const howWorkSwiper = new Swiper(".o-how-work-swiper", {
  spaceBetween: 10,
  slidesPerView:3,
  pagination: {
    el: ".o-work-swiper-pagination",
    clickable: true,
  },

  breakpoints: {
    320: { slidesPerView: 1 },
    490: { slidesPerView: 1 },
    530: { slidesPerView: 1 },
    620: { slidesPerView: 1.5 , },
    810: { slidesPerView: 2 },
    992: { slidesPerView: 2.5 },
    1263: { slidesPerView: 2.6 },
    1300: { slidesPerView: 3 },
  },
});

const advantagesSwiper = new Swiper(".p-advantages-swiper", {
  slidesPerView: 1.2,
  spaceBetween: 10,
  autoHeight:true,

  pagination: {
    el: ".p-advantages-pagination",
    clickable: true,
  },
  loop: true,

     breakpoints: {
      320: { slidesPerView: 1 },
       450: { slidesPerView: 1.2 },

      576: { slidesPerView: 1.2 },

    },
});
const swiperAdvantages = new Swiper(".w-advantages__swiper", {
  spaceBetween: 10,
  slidesPerView: 2,
  pagination: {
    el: ".w-advantages__pagination",
    clickable: true,
  },
  breakpoints: {
    300: {
      slidesPerView: 1,
    },
     540: {
      slidesPerView: 1.5,
    },
  },
});

const tHowWorkSwiper = new Swiper(".t-possibilities-swiper", {
  spaceBetween: 10,
  slidesPerView:1,
  pagination: {
    el: ".t-possibilities-pagination",
    clickable: true,
  },


});

const UswiperProcess = new Swiper(".r-advantages-swiper", {
  spaceBetween: 10,
  slidesPerView: 3,
  pagination: {
    el: ".r-advantages-pagination",
    clickable: true,
  },
  breakpoints: {
      300: {
      slidesPerView: 1,
    },
     540: {
      slidesPerView: 1.5,
    },
    640: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 2.5,
    },

    1100: {
      slidesPerView: 3,
    },
  },
});

