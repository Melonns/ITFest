"use client";
import { useState } from "react";
import Image from "next/image";

export default function RegisterBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      title: "Bergabunglah dengan revolusi pengelolaan budget",
      author: "Sarah Wijaya",
      position: "Freelancer, Jakarta",
      image: "/auth/7.svg",
    },
    {
      title: "Mulai perjalanan finansial yang lebih baik",
      author: "Budi Santoso",
      position: "Karyawan Swasta, Surabaya",
      image: "/auth/8.svg",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="flex-1 relative bg-gradient-to-br from-green-800 to-green-900 text-white overflow-hidden lg:min-h-screen h-64 lg:h-auto">
      <div className="absolute inset-0 opacity-20">
        <Image
          src={testimonials[currentSlide].image}
          alt="BudgetBuddy Background"
          fill
          className="object-cover"
        />
      </div>

      <div className="relative z-10 flex flex-col justify-between h-full p-6 lg:p-12">
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-3 lg:mb-6 leading-tight mt-8 sm:mt-0">
            {testimonials[currentSlide].title}
          </h1>

          <div className="mt-4 lg:mt-8 hidden lg:block">
            <p className="text-lg lg:text-xl font-semibold">
              {testimonials[currentSlide].author}
            </p>
            <p className="text-green-200 mt-1">
              {testimonials[currentSlide].position}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <span className="text-sm lg:text-lg">{currentSlide + 1}</span>
            <span className="text-green-300 text-sm lg:text-base">of</span>
            <span className="text-sm lg:text-lg">{testimonials.length}</span>
          </div>

          <div className="flex space-x-2 lg:space-x-4">
            <button
              onClick={prevSlide}
              className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border border-green-300 flex items-center justify-center hover:bg-green-700 transition-colors"
            >
              <svg
                className="w-4 h-4 lg:w-5 lg:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border border-green-300 flex items-center justify-center hover:bg-green-700 transition-colors"
            >
              <svg
                className="w-4 h-4 lg:w-5 lg:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
