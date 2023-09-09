

<!-- 🚨GLOBAL LENIS SMOOTH SCROLL ✅ -->
<script src="https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.19/bundled/lenis.min.js"></script> 

<script>
/* LENIS SMOOTH SCROLL */
const lenis = new Lenis({
  duration: 1.35,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),  
  smoothWheel: true, 
  mouseMultiplier: .5, 
  autoResize: true
})
function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)
</script>


<!-- 🚨 CODE FOR PAGE TRANSITION AND LIQUID NAV  🚨 -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.2/gsap.min.js"></script>
<script>
// MENU LINK ANIMATION
let duration = 400;
let menuShape = $(".menu_shape");
let menuShapeBG = $(".menu_shape-bg");
let menuLink = $(".menu_link");
let currentLink = $(".menu_link.w--current");

// On page load
moveShape(currentLink);
$(".menu_link-bg").css("opacity", "0");
menuShape.css("opacity", "1");
menuLink.css("pointer-events", "auto");

// On click
menuLink.on("click", function (e) {
  // Page url

  // menuShapeBG Stretch
  if ($(this).index() > currentLink.index()) {
    menuShape.css("justify-content", "flex-end");
  }
  if (currentLink.index() !== $(this).index()) {
    menuShapeBG.css("transition", `width ${duration / 2}ms`);
    menuShapeBG.css("width", "140%");
    setTimeout(() => {
      menuShapeBG.css("width", "100%");
    }, duration / 2);
  }
  // menuShape move
  menuShape.css("transition", `all ${duration}ms`);
  moveShape($(this));
});

// Snap
function moveShape(target) {
  let linkWidth = target.innerWidth();
  let linkOffset = target.offset().left;
  let menuOffset = $(".menu").offset().left;
  let leftPosition = linkOffset - menuOffset;
  menuShape.css("left", leftPosition);
  menuShape.css("width", linkWidth);
}

// Resize
window.addEventListener("resize", function () {
  moveShape(currentLink);
});

// Back button safari
window.onpageshow = function (event) {
  if (event.persisted) {
    window.location.reload();
  }
};
</script>

<script>
// Page Transition Code

// On page load
let nextPageLink;
$(".content-wrapper").addClass("first");

// On link click
$(".menu_link:not(.w--current)").on("click", function (e) {
  e.preventDefault();
  nextPageLink = $(this).attr("href");
  $.ajax({
    url: nextPageLink,
    success: function (response) {
      let element = $(response).find(".content-wrapper").addClass("second");
      $(".main-wrapper").append(element);
    },
    complete: function () {
      pageTransition();
    }
  });
});

function pageTransition() {
  $("html").addClass("animating");
  let tl = gsap.timeline({
    paused: false,
    onComplete: updatePage
  });
  tl.from(".content-wrapper.second", {
    y: "110vh",
    delay: 0.2,
    duration: 0.8,
    ease: "power2.out"
  });
  tl.to(
    ".overlay",
    {
      opacity: 1,
      duration: 0.3,
      ease: "power1.out"
    },
    0
  );
  tl.to(
    ".content-wrapper.first",
    {
      scale: 0.95,
      duration: 0.3,
      ease: "power1.out"
    },
    0
  );
}
function updatePage() {
  window.location = nextPageLink;
}
</script>


<!-- 🔵 ✅ CODE JS LINE ANIMATION GSAP 🔵 ✅  -->
<script src="https://unpkg.com/split-type"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/ScrollTrigger.min.js"></script>
<script>
window.addEventListener("DOMContentLoaded", (event) => {
  setTimeout(() => {
    $("[js-line-animation]").each(function (index) {
			gsap.set($(this), { autoAlpha: 1 });
      let textEl = $(this);
      let textContent = $(this).text();
      let tl;

      function splitText() {
        new SplitType(textEl, { types: "lines", tagName: "span" });
        textEl.find(".line").each(function (index) {
          let lineContent = $(this).html();
          $(this).html("");
          $(this).append(`<span class="line-inner" style="display: block;">${lineContent}</span>`);
        });
        tl = gsap.timeline({
          scrollTrigger: {
            trigger: textEl,
            start: "top bottom",
            end: "bottom bottom",
            toggleActions: "none play none reset"
          }
        });
        tl.fromTo(textEl.find(".line-inner"), { yPercent: 100 }, { yPercent: 0, duration: 0.6, stagger: { amount: 0.4, ease: "power1.out" } });
      }
      splitText();

      let windowWidth = window.innerWidth;
      window.addEventListener("resize", function () {
        if (windowWidth !== window.innerWidth) {
          windowWidth = window.innerWidth;
          tl.kill();
          textEl.text(textContent);
          splitText();
        }
      });
    });
  }, 700);
});
</script>


<!-- 😛 STAGGER MENU TEXT CODE 😛-->

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js"></script>
<script src="https://unpkg.com/split-type"></script>
<script>
let splitType = new SplitType("[hoverstagger='text']", {
  types: "chars",
  tagName: "span"
});

$("[hoverstagger='link']").each(function (index) {
  let text1 = $(this).find("[hoverstagger='text']").eq(0);
  let text2 = $(this).find("[hoverstagger='text']").eq(1);

  let tl = gsap.timeline({ paused: true });
  tl.to(text1.find(".char"), { yPercent: -100, duration: 0.3, stagger: { amount: 0.2 } });
  tl.from(text2.find(".char"), { yPercent: 100, duration: 0.3, stagger: { amount: 0.2 } }, 0);

  $(this).on("mouseenter", function () {
    tl.restart();
  });
  // $(this).on("mouseleave", function () {
  //   tl.reverse();
  // });
});
</script>



<script src="https://unpkg.com/split-type"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
<script>
window.addEventListener("DOMContentLoaded", (event) => {
  // text splitting code
  let typeSplit;

  function runSplitType() {
    typeSplit = new SplitType("[split-text]", {
      types: "lines, words, chars",
      tagName: "span"
    });
  }

  runSplitType();

  // run the code when window width changes
  let windowWidth = window.innerWidth;
  window.addEventListener("resize", function () {
    if (windowWidth !== window.innerWidth) {
      windowWidth = window.innerWidth;
      typeSplit.revert();
      runSplitType();
    }
  });

  // page load animation
  let homeLoadTl = gsap.timeline();

  homeLoadTl
    .to(".loader_colums", {
      delay: 0.5,
      yPercent: -100,
      duration: 1.6,
      stagger: {
        each: 0.1
      },
      ease: "power4.inOut",
      onComplete: () => {
        $(".loader_component").css("display", "none");
      }
    })
    .from(
      ".hero_heading-wrapper .char",
      {
        yPercent: 100,
        duration: 0.8,
        stagger: {
          amount: 0.5
        },
        ease: "power3.out"
      },
      "-=1"
    )
    .from(
      ".hero_sub-text-wrap .word",
      {
        yPercent: 100,
        duration: 1,
        ease: "power2.out"
      },
      "<45%"
    )
    .from(
      ".hero_background-image-wrap",
      {
        scale: 1.5,
        ease: "power1.inOut",
        duration: 2.5
      },
      0
    );

  // declaring breakpoints for gsap animtion
  let mm = gsap.matchMedia();

  // for animations that should on tablet and above (desktopAnimation)
  mm.add("(min-width: 769px)", () => {
    desktopAnimation();
  });

  // for the animtions that should run of landscape and mobile
  mm.add("(max-width: 768px)", () => {
    mobileAnimation();
  });
});
</script>


<!-- 🔵 ✅ CODE SLIDER 🔵 ✅  -->
<script src="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js"></script>
<script>
$(".slider-main_component").each(function (index) {
  let loopMode = false;
  if ($(this).attr("loop-mode") === "true") {
    loopMode = true;
  }
  let sliderDuration = 6000;
  if ($(this).attr("slider-duration") !== undefined) {
    sliderDuration = +$(this).attr("slider-duration");
  }
  const swiper = new Swiper($(this).find(".swiper")[0], {
    speed: sliderDuration,
    loop: loopMode,
    autoHeight: true,
    centeredSlides: loopMode,
		speed: 1500,
    loop: true,
    //autoplay: {
  //    delay: 6000,
   //   disableOnInteraction: false,
 //   },
    followFinger: true,
    freeMode: true,
    slideToClickedSlide: false,
    slidesPerView: 4,
    spaceBetween: "4%",
    rewind: false,
    mousewheel: {
      forceToAxis: true
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true
    },
    breakpoints: {
      // mobile landscape
      480: {
        slidesPerView: 1,
        spaceBetween: "4%"
      },
      // tablet
      768: {
        slidesPerView: 2,
        spaceBetween: "4%"
      },
      // desktop
      992: {
        slidesPerView: 3,
        spaceBetween: "2%"
      }
    },
    pagination: {
      el: $(this).find(".swiper-bullet-wrapper")[0],
      bulletActiveClass: "is-active",
      bulletClass: "swiper-bullet",
      bulletElement: "button",
      clickable: true
    },
    navigation: {
      nextEl: $(this).find(".swiper-next")[0],
      prevEl: $(this).find(".swiper-prev")[0],
      disabledClass: "is-disabled"
    },
    scrollbar: {
      el: $(this).find(".swiper-drag-wrapper")[0],
      draggable: true,
      dragClass: "swiper-drag",
      snapOnRelease: true
    },
    slideActiveClass: "is-active",
    slideDuplicateActiveClass: "is-active"
  });
});
</script>



<!-- CODE CURSOR HOVER VIEW OVER PROJECTS -->

<script src="https://cdn.jsdelivr.net/npm/locomotive-scroll@4.1.4/dist/locomotive-scroll.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.4/gsap.min.js"></script>
<script src="https://unpkg.com/mouse-follower@1/dist/mouse-follower.min.js"></script>

<script>
const cursor = new MouseFollower({
	 speed: 0.8,
    skewing: 1,
    skewingText: 3
});
const el = document.querySelectorAll('.solection');
    el.forEach(function (element) {
      
      element.addEventListener('mouseenter', () => {
        cursor.setText('DRAG');
    	});

    	element.addEventListener('mouseleave', () => {
        cursor.removeText();
    	});
});
</script>





<!-- 🔵 ✅ CODE PRELOADER 🔵 ✅  -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.4/CustomEase.min.js"></script>
<script>
// Pre-loader
// Variables
// Custom ease
let customEase = "M0,0,C0,0,0.13,0.34,0.238,0.442,0.305,0.506,0.322,0.514,0.396,0.54,0.478,0.568,0.468,0.56,0.522,0.584,0.572,0.606,0.61,0.719,0.714,0.826,0.798,0.912,1,1,1,1";
// Counter start
let counter = {
  value: 0
};
// Duration
let loaderDuration = 4;

// Duration, and counter start - if not a first time visit in this tab
if (sessionStorage.getItem("visited") !== null) {
loaderDuration = 2.5;
counter = {
   value: 80
 };
}
 sessionStorage.setItem("visited", "true");

function updateLoaderText() {
  let progress = Math.round(counter.value);
  $(".page-loader_text").text(progress);
}
function endLoaderAnimation() {
  $(".page-loader_trigger").click();
}

let tl = gsap.timeline({
  onComplete: endLoaderAnimation
});
tl.to(counter, {
  value: 100,
  onUpdate: updateLoaderText,
  duration: loaderDuration,
  ease: CustomEase.create("custom", customEase)
});
tl.to(".page-loader_text-fill", {
    height: "100%",
    duration: loaderDuration,
    ease: CustomEase.create("custom", customEase)
}, 0);

</script>
