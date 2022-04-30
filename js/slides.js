const slides = document.querySelectorAll(".showcase-pictures");

/**
 * returns a random function
 * @param {number} value
 */
function randomFunctionFactory(value) {
  return () => {
    return value * Math.random() - value / 2;
  };
}

slides.forEach((slide) => {
  let current = -1;
  let zIndex = 1000000000;
  let direction = "150%";

  const images = slide.querySelectorAll(".slide-image");
  images.forEach((image) => {
    image.style.zIndex = --zIndex;
  });

  gsap.set(images, { opacity: 0 });

  imagesLoaded(images, function () {
    const timeline = gsap.timeline();
    timeline
      .set(images, {
        x: randomFunctionFactory(500),
        y: "500%",
        rotation: randomFunctionFactory(90),
        opacity: 1,
      })
      .to(images, { x: 0, y: 0, z: 1, stagger: -0.25 })
      .to(images, {
        rotation: randomFunctionFactory(16),
      });
  });

  slide.addEventListener("click", () => {
    --zIndex;
    current = (current + 1) % images.length;

    let midAngle = 15;
    if (direction === "-150%") {
      midAngle = -15;
    }

    const currentImage = images[current];
    const flipTimeline = gsap.timeline();
    flipTimeline
      .set(currentImage, { x: 0 })
      .to(currentImage, {
        x: direction,
        rotation: midAngle,
        scale: 1.05,
      })
      .set(currentImage, { zIndex })
      .to(currentImage, {
        x: 0,
        rotation: randomFunctionFactory(16),
        scale: 1,
      });

    if (direction === "150%") {
      direction = "-150%";
    } else {
      direction = "150%";
    }
  });
});
