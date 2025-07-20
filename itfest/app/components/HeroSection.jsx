"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const leftContentVariants = {
    hidden: {
      opacity: 0,
      x: -80,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1.0,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const textVariants = {
    hidden: {
      opacity: 0,
      x: -60,
    },
    visible: (delay) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay,
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  };

  const buttonVariants = {
    hidden: {
      opacity: 0,
      x: -40,
      scale: 0.9,
    },
    visible: (delay) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        delay,
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 30,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.5,
      },
    },
  };

  const cardLeftVariants = {
    hidden: {
      opacity: 0,
      x: -100,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 1.2,
      },
    },
  };

  const cardRightVariants = {
    hidden: {
      opacity: 0,
      x: 100,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 1.4,
      },
    },
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <main className="container mx-auto px-4 md:px-8 pt-32 md:pt-40 pb-20 md:pb-32">
        <motion.div
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Left Content */}
          <motion.div
            variants={leftContentVariants}
            className="space-y-8"
          >
            <div className="space-y-6">
              <motion.h1
                custom={0.2}
                variants={textVariants}
                className="text-4xl md:text-5xl lg:text-6xl font-semibold text-green-600 leading-tight font-montserrat"
              >
                Take Control of Your
                <motion.span
                  custom={0.4}
                  variants={textVariants}
                  className="block text-gray-900"
                >
                  Financial Future
                </motion.span>
              </motion.h1>

              <motion.p
                custom={0.6}
                variants={textVariants}
                className="text-lg md:text-xl text-gray-600 leading-relaxed font-sans font-normal max-w-lg"
              >
                BudgetBuddy combines intelligent expense tracking, AI-powered insights, and goal-setting tools to help you build lasting financial habits and achieve your money goals.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
              transition={{
                delay: 0.8,
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div
                variants={buttonVariants}
                custom={0.9}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/menu"
                  className="block bg-green-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-green-700 transition-all duration-300 text-center font-sans shadow-lg hover:shadow-xl"
                >
                  Start Tracking Budget
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <div className="relative flex justify-center items-center">
            <motion.div
              variants={imageVariants}
              className="relative"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={isLoaded ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.8, rotate: -5 }}
                transition={{
                  duration: 1.2,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: 0.5,
                }}
              >
                <Image
                  src="/home/test.svg"
                  alt="Woman enjoying healthy meals"
                  width={900} // Increased width
                  height={1000} // Increased height
                  className="w-full h-auto max-w-xl"
                  priority
                />
              </motion.div>
              
              {/* Floating Cards */}
              {/* Top Left - Order Available */}
              <motion.div
                variants={cardLeftVariants}
                whileHover={{ 
                  scale: 1.1,
                  y: -5,
                  transition: { duration: 0.3 }
                }}
                className="absolute top-40 left-2 md:top-48 md:-left-8 bg-white px-2 py-2 md:px-4 md:py-3 rounded-xl md:rounded-2xl shadow-lg border border-gray-100"
              >
                <div className="flex items-center gap-2 md:gap-3">
                  <motion.div 
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isLoaded ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                    transition={{
                      delay: 1.4,
                      duration: 0.6,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="w-8 h-8 md:w-10 md:h-10 bg-orange-100 rounded-full flex items-center justify-center"
                  >
                    <span className="text-sm md:text-lg">🔔</span>
                  </motion.div>
                  <div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ delay: 1.6, duration: 0.5 }}
                      className="font-semibold text-gray-900 font-sans text-xs md:text-sm"
                    >
                      Order Available
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ delay: 1.8, duration: 0.5 }}
                      className="text-xs text-gray-600 font-sans hidden md:block"
                    >
                      Fresh meals ready
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Bottom Right - Fresh Available */}
              <motion.div
                variants={cardRightVariants}
                whileHover={{ 
                  scale: 1.1,
                  y: -5,
                  transition: { duration: 0.3 }
                }}
                className="absolute bottom-12 right-2 md:bottom-20 md:-right-4 bg-white px-2 py-2 md:px-4 md:py-3 rounded-xl md:rounded-2xl shadow-lg border border-gray-100"
              >
                <div className="flex items-center gap-2 md:gap-3">
                  <motion.div
                    initial={{ scale: 0, rotate: 180 }}
                    animate={isLoaded ? { scale: 1, rotate: 0 } : { scale: 0, rotate: 180 }}
                    transition={{
                      delay: 1.6,
                      duration: 0.6,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="w-8 h-8 md:w-10 md:h-10 bg-green-100 rounded-full flex items-center justify-center"
                  >
                    <span className="text-sm md:text-lg">🔔</span>
                  </motion.div>
                  <div>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                      transition={{ delay: 1.8, duration: 0.5 }}
                      className="font-semibold text-gray-900 font-sans text-xs md:text-sm"
                    >
                      Fresh Available
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                      transition={{ delay: 2.0, duration: 0.5 }}
                      className="text-xs text-gray-600 font-sans hidden md:block"
                    >
                      Healthy options
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}