const carousels = document.querySelectorAll(".header h1, .header h2");

const fadeInTimeline = gsap.timeline();

fadeInTimeline
  .set(carousels, { opacity: 0 })
  .to(carousels, { opacity: 1, delay: 1, stagger: 1, duration: 3 });

carousels.forEach((carousel) => {
  const span = carousel.querySelector("span");
  const spanWidth = span.clientWidth;

  for (let index = 0; index < 20; index = index + 1) {
    carousel.appendChild(span.cloneNode(true));
  }

  const movementTimeline = gsap.timeline({
    repeat: -1,
  });

  movementTimeline
    .set(carousel, { x: 0 })
    .to(carousel, { x: spanWidth * -1, duration: 6, ease: "linear" });
});
