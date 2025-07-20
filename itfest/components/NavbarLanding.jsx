"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function NavbarLanding() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState(null);
  
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "Subscription", href: "/subscription" },
    { name: "Contact Us", href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    // Set loaded state after component mounts with small delay for smoother effect
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    async function checkLogin() {
      try {
        const res = await fetch('/api/auth/me');
        if (!res.ok) throw new Error('unauthorized');

        const data = await res.json();
        setUser(data.user); // contoh: { id: ..., name: ..., role: 'admin' }
      } catch (err) {
        setUser(null);
      }
    }

    checkLogin();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navbarVariants = {
    hidden: {
      y: -120,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 20,
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      y: -30,
      scale: 0.92,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 25,
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    exit: {
      opacity: 0,
      y: -30,
      scale: 0.92,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.6, 1],
      },
    },
  };

  const menuItemVariants = {
    hidden: {
      opacity: 0,
      x: -30,
    },
    visible: (index) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: index * 0.15,
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  };

  return (
    <motion.header
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
      variants={navbarVariants}
      className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm' 
          : 'bg-transparent border-b-0'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            delay: 0.4, 
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1]
          }}
        >
          <Link 
            href="/"
            className="text-2xl md:text-3xl font-bold text-gray-800 font-montserrat hover:text-green-600 transition-colors duration-300 ease-out"
          >
            SEA Catering
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.nav 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 0.6, 
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          className="hidden md:flex gap-6 text-base font-sans"
        >
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.8 + index * 0.15, 
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1]
              }}
            >
              <Link
                href={item.href}
                className={`${
                  (pathname === item.href || (item.href === "/" && pathname === "/")) ? "text-green-600 font-semibold" : "text-gray-600 hover:text-green-600"
                } transition-colors duration-300 ease-out font-sans`}
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </motion.nav>

        {/* Desktop Auth Buttons */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            delay: 1.0, 
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          className="hidden md:flex items-center gap-4"
        >
          {user ? (
            <Link
              href={user.role === 'admin' ? '/dashboard/admin' : '/dashboard/user'}
              className="bg-green-600 text-white px-4 py-2 rounded-lg text-base hover:bg-green-700 transition-all duration-300 ease-out font-sans transform hover:scale-105"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/auth/login" className="text-gray-600 hover:text-green-600 text-base transition-colors duration-300 ease-out font-sans">
                Login
              </Link>
              <Link
                href="/auth/register"
                className="bg-green-600 text-white px-4 py-2 rounded-lg text-base hover:bg-green-700 transition-all duration-300 ease-out font-sans transform hover:scale-105"
              >
                Get Started
              </Link>
            </>
          )}
        </motion.div>

        {/* Mobile Hamburger Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ 
            delay: 0.6, 
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          onClick={toggleMenu}
          className="md:hidden p-2 text-gray-600 hover:text-green-600 transition-colors duration-300 ease-out"
        >
          <motion.div
            animate={{ rotate: isMenuOpen ? 180 : 0 }}
            transition={{ 
              duration: 0.5,
              ease: [0.25, 0.1, 0.25, 1]
            }}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.div>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            className="md:hidden bg-white/70 backdrop-blur-lg border-t border-white/20"
          >
            <div className="container mx-auto px-4 py-6 space-y-6">
              {/* Mobile Navigation */}
              <nav className="space-y-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={menuItemVariants}
                  >
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className={`block py-3 px-4 rounded-lg transition-all duration-300 ease-out font-sans ${
                        (pathname === item.href || (item.href === "/" && pathname === "/")) 
                          ? "text-green-600 font-semibold bg-white/30 transform scale-105" 
                          : "text-gray-700 hover:text-green-600 hover:bg-white/20 hover:transform hover:scale-105"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile Auth Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.6, 
                  duration: 0.6,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                className="pt-6 border-t border-white/30 space-y-4"
              >
                {user ? (
                  <Link
                    href={user.role === 'admin' ? '/dashboard/admin' : '/dashboard/user'}
                    onClick={closeMenu}
                    className="block bg-green-600/90 text-white px-4 py-3 rounded-lg text-center hover:bg-green-700/90 transition-all duration-300 ease-out font-sans backdrop-blur-sm transform hover:scale-105"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <>
                    <Link 
                      href="/auth/login" 
                      onClick={closeMenu}
                      className="block py-3 px-4 text-gray-700 hover:text-green-600 hover:bg-white/20 rounded-lg transition-all duration-300 ease-out font-sans hover:transform hover:scale-105"
                    >
                      Login
                    </Link>
                    <Link
                      href="/auth/register"
                      onClick={closeMenu}
                      className="block bg-green-600/90 text-white px-4 py-3 rounded-lg text-center hover:bg-green-700/90 transition-all duration-300 ease-out font-sans backdrop-blur-sm transform hover:scale-105"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}