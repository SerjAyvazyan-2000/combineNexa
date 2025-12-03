jQuery.event.special.touchstart = {
  setup: function (_, ns, handle) {
    this.addEventListener("touchstart", handle, { passive: false });
  },
};

jQuery.event.special.touchmove = {
  setup: function (_, ns, handle) {
    this.addEventListener("touchmove", handle, { passive: false });
  },
};

(function () {
  $(window).on("load", function () {
    if (!$(".a-twentytwenty-picture").length) {
      console.warn("TwentyTwenty: элемент не найден — пропускаем.");
      return;
    }

    if (typeof $.fn.twentytwenty !== "function") {
      console.warn("TwentyTwenty: плагин не подключён.");
      return;
    }

    $(".a-twentytwenty-picture").twentytwenty({
      orientation: "horizontal",
    });
  });
})();

$(function () {
  let Accordion = function (el, multiple) {
    this.el = el || {};
    this.multiple = multiple || false;
    let links = this.el.find(".link");
    links.on("click", { el: this.el, multiple: this.multiple }, this.dropdown);
  };

  Accordion.prototype.dropdown = function (e) {
    let $el = e.data.el;
    let $this = $(this),
      $next = $this.next();

    $next.slideToggle();

    if (!e.data.multiple) {
      $el.find(".submenu").not($next).slideUp();
    }

    if (!$this.hasClass("open")) {
      $(".link").removeClass("open");
      $this.addClass("open");
    } else {
      $this.removeClass("open");
    }
  };

  let accordion = new Accordion($("#accordion"), false);

  let firstLink = $("#accordion .link").first();
  let firstSub = firstLink.next(".submenu");

  firstLink.addClass("open");
  firstSub.show();
});

const burger = document.querySelector(".burger");
const menu = document.querySelector(".menu");
const menuBg = document.querySelector(".menu-bg");
if (burger && menu) {
  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    menu.classList.toggle("active");
    menuBg.classList.toggle("active");
    document.body.style.overflow = "hidden";
    if (!burger.classList.contains("active")) {
      document.body.style.overflow = "unset";
    }
  });

  menuBg.addEventListener("click", () => {
    burger.classList.remove("active");
    menu.classList.remove("active");
    menuBg.classList.remove("active");
    document.body.style.overflow = "unset";
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      burger.classList.remove("active");
      menu.classList.remove("active");
      menuBg.classList.remove("active");
      document.body.style.overflow = "unset";
    });
  });

  document.addEventListener("click", (e) => {
    const isClickInsideMenu = menu.contains(e.target);
    const isClickBurger = burger.contains(e.target);

    if (!isClickInsideMenu && !isClickBurger) {
      burger.classList.remove("active");
      menu.classList.remove("active");
      menuBg.classList.remove("active");
      document.body.style.overflow = "unset";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const animatedItems = document.querySelectorAll(
    ".fade-left, .fade-right, .fade-top, .fade-bottom"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  animatedItems.forEach((item) => observer.observe(item));
});

document.querySelectorAll(".menu-list-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const headerHeight = document.querySelector("header").offsetHeight;
      const extraOffset = 20;

      const targetPosition =
        targetElement.getBoundingClientRect().top +
        window.scrollY -
        (headerHeight + extraOffset);

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

(function () {
  const animItem = document.querySelector(".d-anmiation-item--one");
  const imageWrap = document.querySelector(".d-anmiation-small-img");
  const imgLow = document.querySelector(".d-anmiation-small-img .low-quality");
  const imgHigh = document.querySelector(
    ".d-anmiation-small-img .high-quality"
  );
  const mouse = document.querySelector(".d-anmiation-mouse");

  if (!animItem || !imageWrap || !imgLow || !imgHigh || !mouse) {
    console.warn("Animation elements not found — script skipped.");
    return;
  }

  let direction = 1;
  let x = 0;

  function mouseClick() {
    mouse.classList.remove("reset");
    mouse.classList.add("click");

    setTimeout(() => {
      animate();
    }, 450);
  }

  function animate() {
    const itemRect = animItem.getBoundingClientRect();
    const imgRect = imageWrap.getBoundingClientRect();
    const screenWidth = window.innerWidth;
    const limitOffset = screenWidth <= 576 ? 30 : 170;
    const centerLine = itemRect.left + itemRect.width / 2;
    const imageCenter = imgRect.left + imgRect.width / 2;

    if (imageCenter > centerLine) {
      imgLow.style.display = "none";
      imgHigh.style.display = "block";
      animItem.classList.add("active");
    } else {
      imgLow.style.display = "block";
      imgHigh.style.display = "none";
      animItem.classList.remove("active");
    }

    x += 2 * direction;
    imageWrap.style.transform = `translateX(${x}px)`;

    if (x >= itemRect.width - imgRect.width - limitOffset) {
      direction = -1;
    }

    if (x <= 0) {
      direction = 1;
      imageWrap.style.transform = `translateX(${x}px)`;

      mouse.classList.remove("click");
      mouse.classList.add("reset");

      setTimeout(mouseClick, 700);
      return;
    }

    requestAnimationFrame(animate);
  }

  mouseClick();
})();

(function () {
  const anmiationBlock = document.querySelector(".d-anmiation-item--two");

  if (!anmiationBlock) {
    console.warn("d-anmiation-item--two not available — animation skipped.");
    return;
  }

  function animateCompare() {
    anmiationBlock.classList.add("active");

    setTimeout(() => {
      anmiationBlock.classList.remove("active");
    }, 2500);
  }

  animateCompare();
  setInterval(animateCompare, 5000);
})();

(function () {
  const blockTree = document.querySelector(".d-anmiation-item--tree");

  if (!blockTree) {
    console.warn("d-anmiation-item--tree not found — animation skipped.");
    return;
  }

  function animateMouseZoom() {
    blockTree.classList.add("active");

    setTimeout(() => {
      blockTree.classList.remove("active");
    }, 3000);
  }

  animateMouseZoom();
  setInterval(animateMouseZoom, 5000);
})();

document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".hero-clues");
  const marquee = document.querySelector(".marquee");

  if (!container || !marquee) return;

  const wrapper = document.createElement("div");
  wrapper.classList.add("marquee-container");

  wrapper.appendChild(marquee);

  const clone = marquee.cloneNode(true);
  wrapper.appendChild(clone);

  container.appendChild(wrapper);

  let speed = 0.5;
  let position = 0;

  function animate() {
    position -= speed;
    if (Math.abs(position) >= marquee.clientWidth) {
      position = 0;
    }
    wrapper.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(animate);
  }

  animate();
});

document.addEventListener("DOMContentLoaded", () => {
  const animatedItems = document.querySelectorAll(".animation");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  animatedItems.forEach((item) => observer.observe(item));
});

const track = document.querySelector(".m-trust-track");
if(track){
const items = gsap.utils.toArray(".m-trust-track > *");
if (track && items) {
  items.forEach((item) => {
    const clone = item.cloneNode(true);
    track.appendChild(clone);
  });

  const totalWidth = track.scrollWidth / 2;

  gsap.to(track, {
    x: -totalWidth,
    duration: 50,
    ease: "none",
    repeat: -1,
    modifiers: {
      x: gsap.utils.unitize((x) => parseFloat(x) % -totalWidth),
    },
  });
}
}

