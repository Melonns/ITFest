"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BenefitSectionCard from "../../components/heropage/BenefitSectionCard";

export default function BenefitSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef(null);
  
  const cardVariants = ["default", "finance", "growth"];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.offsetWidth;
      const currentIndex = Math.round(scrollLeft / cardWidth);
      setActiveIndex(currentIndex);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToCard = (index) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = container.offsetWidth;
    const gap = 16; // 16px gap (gap-4)
    container.scrollTo({
      left: index * (cardWidth + gap),
      behavior: 'smooth'
    });
  };

  const goToPrevious = () => {
    if (activeIndex > 0) {
      scrollToCard(activeIndex - 1);
    }
  };

  const goToNext = () => {
    if (activeIndex < cardVariants.length - 1) {
      scrollToCard(activeIndex + 1);
    }
  };

  return (
    <section id="benefits" className="bg-white text-black p-8 md:p-16 mb-8 md:mb-16">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Left Card Section with Carousel Controls */}
        <div className="lg:w-1/2 relative flex flex-col items-center px-8 md:px-0">
          {/* Carousel Container */}
          <div className="relative w-full flex justify-center">
            {/* Left Arrow */}
            {activeIndex > 0 && (
              <button
                onClick={goToPrevious}
                className="absolute -left-4 md:left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1.5 md:p-2 shadow-md border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="w-3 h-3 md:w-6 md:h-6 text-green-600" />
              </button>
            )}

            {/* Right Arrow */}
            {activeIndex < cardVariants.length - 1 && (
              <button
                onClick={goToNext}
                className="absolute -right-4 md:right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1.5 md:p-2 shadow-md border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <ChevronRight className="w-3 h-3 md:w-6 md:h-6 text-green-600" />
              </button>
            )}

            {/* Scrollable Cards Container */}
            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory w-80 md:w-[420px] gap-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {cardVariants.map((variant, index) => (
                <div key={index} className="flex-shrink-0 w-full snap-center">
                  <BenefitSectionCard variant={variant} />
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-4 md:mt-6">
            {cardVariants.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToCard(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex ? 'bg-green-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right Content */}
        <div className="lg:w-1/2">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Get Started in <span className="text-green-600">Three Simple Steps</span>
          </h2>
          <p className="text-lg text-gray-600">
            From setup to success - BudgetBuddy makes financial management effortless and intuitive.
          </p>
        </div>
      </div>
    </section>
  );
}