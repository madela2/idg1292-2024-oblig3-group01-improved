document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Draggable);

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".scene__one",
      pin: true,
      start: "top top",
      end: "+=" + (window.innerHeight * 4),
      scrub: 1,
      snap: {
        snapTo: "labels",
        duration: { min: 0.2, max: 3 },
        ease: "power1.in"
      },
      onComplete: () => {
        tl.reverse(false);
      }
    }
  });

  gsap.set("#gas-forest", { opacity: 0 });

  tl.addLabel("intro")
    .add([
      gsap.from(".intro__headline", { autoAlpha: 0 }),
      gsap.from(".forest-intro__patch-two--right", { xPercent: 60 }),
      gsap.from(".forest-intro__patch-two--left", { xPercent: -60 })
    ], "sidePatch")
    .to(".intro__headline", { duration: 0.2, opacity: 0 })
    .from("#deer", { xPercent: -100 * 10, duration: 3 })
    .add([
      gsap.to("#gas-forest", { opacity: 1 }),
      gsap.from(".scene__fact-box--one", { yPercent: 300, duration: 5 })
    ], "factForest")
    .to(".scene__fact-box--one", { yPercent: 300, duration: 5 })
    .to("#gas-forest", { opacity: 0 })
    .add(() => {
      document.querySelector("#forest-intro").classList.add('shake-element');
      document.querySelector(".forest-intro__trees").classList.add('shake-element');
    }, "forestShake")
    .to(".bulldozer", {
      keyframes: {
        xPercent: [-100, 300],
        ease: "power1.inOut"
      },
      duration: 4
    })
    .from(".scene__fact-box--two", { yPercent: 300, duration: 5 })
    .to(".scene__fact-box--two", { yPercent: 300, duration: 5 });
});

// Intersection Observer for pausing animations when not visible
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const animationState = entry.isIntersecting ? 'running' : 'paused';
    entry.target.querySelector('.leg-set1').style.animationPlayState = animationState;
    entry.target.querySelector('.leg-set2').style.animationPlayState = animationState;
    entry.target.querySelector('#scene__gas-forest').style.animationPlayState = animationState;
  });
});

const sceneOneElement = document.querySelector('.scene__one');
observer.observe(sceneOneElement);
