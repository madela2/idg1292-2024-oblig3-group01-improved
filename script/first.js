document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger,ScrollToPlugin,Draggable);

let tl = gsap.timeline({
  scrollTrigger: {
      trigger: ".scene__one",
      pin: true,
      start: "top top",
      end: "+=" + (window.innerHeight * 8),
      scrub: 1,
      snap: {
          snapTo: "labels",
          duration: { min: 0.2, max: 3 },
          ease: "power1.in"
      }
      /*onUpdate: self => {
        if (self.direction === 1 && self.progress > tween.progress()) {
          tween.progress(self.progress);
        }
      } */
  }
});

const gasForest = document.querySelector('#gas_forest');
gsap.set(gasForest, {opacity: 0}); // set the gas to 0 opacity, making it hidden

const bulldozerTest = document.querySelector(".bulldozer").classList.add("bulldozer--active"); 

tl.addLabel("introStart")
.add([
  gsap.from(".intro__headline", { autoAlpha: 0 }),
  gsap.from("#patch2-right", { xPercent: 60 }),
  gsap.from("#patch2-left", { xPercent: -60 })
], "sidePatch")
.add("headline")
.to(".intro__headline", { duration: 0.2, opacity: 0 })
.add([
  gsap.from("#gas-forest-left", { xPercent: -100, opacity: 0.5, repeat: 2, yoyo: true, duration: 2  }),
  gsap.from("#gas-forest-right", { xPercent: 100, opacity: 0.5, repeat: 2, yoyo: true,  duration: 2 }) ], "gasForest")
.add("textBoxAppear")
.from(".scene__fact-box--forest", { yPercent: 250 }, "<25%") // appear 25% into the earlier label
.add("textBoxDisappear")
.to(".scene__fact-box--forest", { yPercent: 250 })
.add("deer")
.from("#deer", { xPercent: -100*10, duration: 3})
.add("bulldozer")
.add(() => {
  // Add bulldozer--active class after the #deer tween
  document.querySelector(".bulldozer").classList.add("bulldozer--active");
})
/* .to(".bulldozer", {
  keyframes: {
    xPercent: [-100, 300],
    ease: "power1.inOut"
  },
  duration: 4
}) */
/* .set(bulldozerTest, ">") */
});

/* ScrollTrigger.clearScrollMemory();
window.history.scrollRestoration = "manual"; */

// to reset the ScrollTrigger on page reload
window.addEventListener("beforeunload", function(e) {
  ScrollTrigger.getAll().forEach(trigger => {
      trigger.scroll(progress => progress(0));
  });
});