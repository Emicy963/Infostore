import React, { useState, useEffect, useCallback } from "react";

const Carousel = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="relative overflow-hidden rounded-lg shadow-2xl hover-lift glow">
      <div className="carousel-track flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((slide, index) => (
          <div key={index} className="carousel-slide w-full flex-shrink-0">
            <img src={slide.image} alt={slide.title} className="w-full h-80 object-cover" />
          </div>
        ))}
      </div>
      
      {/* Navigation Arrows */}
      <button onClick={prevSlide} className="carousel-prev absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all hover:scale-110">
        <i className="fas fa-chevron-left"></i>
      </button>
      <button onClick={nextSlide} className="carousel-next absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all hover:scale-110">
        <i className="fas fa-chevron-right"></i>
      </button>
      
      {/* Dots Indicators */}
      <div className="carousel-dots flex justify-center mt-4 space-x-2">
        {slides.map((_, index) => (
          <button 
            key={index} 
            onClick={() => setCurrentSlide(index)}
            className={`dot w-3 h-3 rounded-full ${currentSlide === index ? 'bg-opacity-100' : 'bg-opacity-50'} bg-white hover:bg-opacity-100 transition-all hover:scale-125`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;