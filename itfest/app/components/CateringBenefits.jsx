"use client";
import { TrendingUp, Brain, Target } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function CateringBenefits() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.5 });

  const features = [
    {
      title: "Smart Budget Tracking",
      desc: "Automatically categorize expenses and track your spending patterns with intelligent insights.",
      icon: <TrendingUp className="w-8 h-8 text-white" />,
    },
    {
      title: "AI Financial Assistant",
      desc: "Get personalized recommendations and smart suggestions to optimize your financial decisions.",
      icon: <Brain className="w-8 h-8 text-white" />,
    },
    {
      title: "Goal-Based Saving",
      desc: "Set and track your financial goals with automated saving plans and progress monitoring.",
      icon: <Target className="w-8 h-8 text-white" />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
        delayChildren: 0.8,
      },
    },
  };

  const headerVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.9,
    },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: index * 0.4,
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  };

  return (
    <motion.section 
      ref={ref}
      id="features"
      className="py-16 md:py-20 mt-8 md:mt-16 bg-green-600 text-center"
    >
      <div className="container mx-auto px-4 md:px-8 py-8 md:py-12">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={headerVariants}
          className="max-w-5xl mx-auto mb-12 md:mb-16"
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-semibold text-white leading-tight font-montserrat mb-6"
          >
            Everything You Need to<br />Master Your Money
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg text-green-100 leading-relaxed font-sans max-w-2xl mx-auto"
          >
            Powerful features designed to simplify your financial life and help you make smarter money decisions.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-6 md:gap-8 lg:gap-12 max-w-7xl mx-auto"
        >
          {features.map((item, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              whileHover={{ 
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="bg-white p-8 md:p-10 lg:p-12 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 text-center h-full flex flex-col min-h-[320px] md:min-h-[360px] lg:min-h-[400px]"
            >
              <div 
                className="flex items-center justify-center w-18 h-18 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-orange-400 mb-8 mx-auto"
              >
                {item.icon}
              </div>
              
              <h3 
                className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 mb-6 font-montserrat"
              >
                {item.title}
              </h3>
              
              <p 
                className="text-gray-600 leading-relaxed font-sans text-base md:text-lg flex-grow"
              >
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}