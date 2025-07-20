"use client"

import { useState } from "react"

export default function BenefitSectionCard({
  variant = "default"
}) {
  const [isHovered, setIsHovered] = useState(false)

  // Card content configurations
  const cardData = {
    default: {
      title: "Create Your Account",
      description: "Sign up in minutes and securely connect your bank accounts to start tracking your finances automatically.",
      image: "/home/image1.jpg"
    },
    finance: {
      title: "Set Up Your Budget",
      description: "Define your income, expenses, and financial goals. Our AI will help categorize and organize everything.",
      image: "/home/image2.jpg"
    },
    growth: {
      title: "Achieve Your Goals",
      description: "Monitor your progress, receive personalized insights, and watch as you reach your financial milestones.",
      image: "/home/image3.jpg"
    }
  }

  const currentCard = cardData[variant] || cardData.default

  return (
    <div
      className="bg-white rounded-3xl border-2 border-gray-200 w-80 md:w-[420px] h-[400px] md:h-[460px] cursor-pointer transition-all duration-300 overflow-hidden shadow-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image/Content Area */}
      <div className="bg-gradient-to-br from-gray-200 to-gray-300 h-48 md:h-64 overflow-hidden relative">
        {currentCard.image ? (
          <img
            src={currentCard.image}
            alt={currentCard.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <div className="text-gray-400 text-4xl font-light">
              {currentCard.title.charAt(0)}
            </div>
          </div>
        )}
      </div>

      {/* Text Content */}
      <div className="p-4 md:p-6 h-40 md:h-48 flex flex-col">
        <div>
          <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 md:mb-3 line-clamp-1">
            {currentCard.title}
          </h3>
          <p className="text-gray-700 text-xs md:text-sm leading-relaxed line-clamp-4 md:line-clamp-5">
            {currentCard.description}
          </p>
        </div>
      </div>
    </div>
  )
}