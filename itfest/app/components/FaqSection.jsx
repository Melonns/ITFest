"use client";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

const faqData = [
    {
        question: "Is my financial data secure with BudgetBuddy?",
        answer:
            "Absolutely. We use bank-level encryption and security protocols to protect your data. Your information is encrypted end-to-end, and we never store your bank login credentials.",
    },
    {
        question: "How does the AI budgeting assistant work?",
        answer:
            "Our AI analyzes your spending patterns, income, and financial goals to provide personalized recommendations. It learns from your habits to suggest better budgeting strategies and identify potential savings opportunities.",
    },
    {
        question: "Can I connect multiple bank accounts?",
        answer:
            "Yes, you can connect unlimited bank accounts, credit cards, and financial institutions. BudgetBuddy automatically syncs and categorizes transactions from all your connected accounts.",
    },
    {
        question: "Is there a free version available?",
        answer:
            "Yes, we offer a free plan with basic budgeting features. Premium plans unlock advanced AI insights, goal tracking, and detailed financial reports.",
    },
    {
        question: "How often does BudgetBuddy sync my transactions?",
        answer:
            "Your transactions are synced in real-time throughout the day. You will always have the most up-to-date view of your finances whenever you open the app.",
    },
];

export default function FaqSection() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleIndex = (index) => {
        setOpenIndex(index === openIndex ? null : index);
    };

    return (
        <section id="faq" className="pt-12 pb-20 md:pt-16 md:pb-24 bg-white text-center">
            <div className="container mx-auto px-4 md:px-8">
                <div className="max-w-5xl mx-auto mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-semibold text-green-600 leading-tight font-montserrat mb-6">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed font-sans max-w-2xl mx-auto">
                        Find answers to common questions about our budgeting app and financial services
                    </p>
                </div>

                <div className="mt-10 space-y-4 max-w-4xl mx-auto">
                    {faqData.map((item, index) => (
                        <div
                            key={index}
                            className={`border rounded-xl transition shadow-sm ${
                                openIndex === index ? "bg-gray-50 border-green-500" : "bg-white"
                            }`}
                        >
                            <button
                                onClick={() => toggleIndex(index)}
                                className="w-full flex items-center justify-between px-6 md:px-8 py-6 text-left"
                            >
                                <span
                                    className={`font-semibold text-base md:text-lg font-montserrat ${
                                        openIndex === index ? "text-green-600" : "text-gray-800"
                                    }`}
                                >
                                    {item.question}
                                </span>
                                {openIndex === index ? (
                                    <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-green-600 flex-shrink-0 ml-4" />
                                ) : (
                                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-500 flex-shrink-0 ml-4" />
                                )}
                            </button>
                            {openIndex === index && (
                                <div className="px-6 md:px-8 pb-6 text-base md:text-lg text-gray-600 font-sans leading-relaxed">
                                    {item.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}