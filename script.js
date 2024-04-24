document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger,Observer,ScrollToPlugin,Draggable,MotionPathPlugin,TextPlugin);
  let tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".scene--1",
        pin: true,
        start: "top top",
        end: "+=" + (window.innerHeight * 5),
        scrub: 1,
        snap: {
            snapTo: "labels",
            duration: { min: 0.2, max: 3 }
        }
    }
  });

  tl.addLabel("start")
  .add([
    gsap.from(".intro__headline", { autoAlpha: 0 }),
    gsap.from("#patch2-right", {xPercent:50}),
    gsap.from("#patch2-left", {xPercent:-50})
  ], "patch")
  .add("headline")
  .to(".intro__headline", { duration: 0.2, opacity: 0 })
  .add("deer")
  .from("#deer", {xPercent: -100*10})
 });

