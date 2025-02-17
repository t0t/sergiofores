//  GSAP
import { gsap } from "gsap";

// Anim HAMBUTTON
let hamanim = gsap.fromTo(
  "#hambutton line", {
    transformOrigin: "center center",
  },
  {
    paused: true,
    rotate: 90,
    ease: "back",
    scale: 1.5,
    stagger: 0.5,
  }
);

const hambutton = document.querySelector("#hambutton");
hambutton.addEventListener("mouseover", () => hamanim.play());
hambutton.addEventListener("mouseout", () => hamanim.reverse());
