document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger,Observer,ScrollToPlugin,Draggable,MotionPathPlugin,TextPlugin);

  let tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".scene",
        pin: true,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        snap: {
            snapTo: "labels",
            duration: { min: 0.2, max: 3 }
        }
    }
  });

  tl.addLabel("start")
  .add([
    gsap.from("#patch2-right", {xPercent:30}),
    gsap.from("#patch2-left", {xPercent:-30})
  ], "patch");
 });
