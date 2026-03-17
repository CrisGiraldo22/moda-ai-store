import { useEffect, useState } from "react";
import heroImage from "../assets/hero.png";

const slides = [
  {
    image: heroImage,
    title: "New Season Collection",
    subtitle: "Discover modern styles for every day.",
  },
  {
    image: heroImage,
    title: "Comfort and Style",
    subtitle: "Find premium basics and oversized fits.",
  },
  {
    image: heroImage,
    title: "Fashion Powered by AI",
    subtitle: "A smart clothing store experience.",
  },
];

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const currentSlide = slides[currentIndex];

  return (
    <div className="carousel">
      <img src={currentSlide.image} alt={currentSlide.title} className="carousel-image" />
      <div className="carousel-overlay">
        <h2>{currentSlide.title}</h2>
        <p>{currentSlide.subtitle}</p>
      </div>

      <div className="carousel-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={index === currentIndex ? "carousel-dot active" : "carousel-dot"}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;