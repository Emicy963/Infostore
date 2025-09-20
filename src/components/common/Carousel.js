import React, { useState, useEffect } from "react";

const Carousel = ({ slides }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === slides.length -1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative overflow-hidden rounded-lg shadow-2xl hover-lift glow">
            <div div className="carousel-track flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100})%` }}>
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
        </div>
    )
}
