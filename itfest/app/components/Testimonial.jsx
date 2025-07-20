// File: /app/components/Testimonial.jsx
'use client';
import { useState, useRef, useEffect } from 'react';
import TestimonialCard from '../../components/heropage/TestimonialCard';

const Testimonial = () => {
  // Static dummy testimonial data
  const [testimonials] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Pengguna Terverifikasi",
      message: "BudgetBuddy telah mengubah cara saya mengelola keuangan. Fitur tracking expense-nya sangat membantu saya mengontrol pengeluaran dan mencapai target tabungan!",
      rating: 5
    },
    {
      id: 2,
      name: "Ahmad Rahman",
      position: "Pengguna Terverifikasi", 
      message: "Aplikasi yang sangat user-friendly! Dashboard-nya informatif dan reminder pembayaran tagihan sangat membantu. Sudah 6 bulan pakai dan keuangan jadi lebih teratur.",
      rating: 5
    },
    {
      id: 3,
      name: "Maria Santoso",
      position: "Pengguna Terverifikasi",
      message: "Sebagai ibu rumah tangga, BudgetBuddy sangat membantu mengatur budget belanja dan keuangan keluarga. Fitur kategori pengeluaran sangat detail dan mudah dipahami.",
      rating: 4
    },
    {
      id: 4,
      name: "David Wijaya",
      position: "Pengguna Terverifikasi",
      message: "Fitur goal setting dari BudgetBuddy sangat cocok untuk lifestyle saya yang ingin menabung untuk investasi. Progress tracking-nya memotivasi banget!",
      rating: 5
    },
    {
      id: 5,
      name: "Lisa Chen",
      position: "Pengguna Terverifikasi",
      message: "Laporan keuangan bulanannya sangat detail dan mudah dipahami. Tim support juga very responsive ketika ada pertanyaan tentang fitur-fitur baru.",
      rating: 4
    },
    {
      id: 6,
      name: "Budi Setiawan",
      position: "Pengguna Terverifikasi",
      message: "Sudah mencoba berbagai aplikasi budget tracking, tapi BudgetBuddy yang paling lengkap fiturnya dan interface-nya paling intuitif. Highly recommended!",
      rating: 5
    }
  ]);
  
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const sliderRef = useRef(null);
  const animationRef = useRef(null);
  const momentumRef = useRef(null);
  const [lastMoveTime, setLastMoveTime] = useState(0);
  const [lastMoveX, setLastMoveX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const infiniteTestimonials = testimonials.length > 0 ? [...testimonials, ...testimonials, ...testimonials] : [];
  const cardWidth = 320;
  const totalWidth = testimonials.length * cardWidth;

  useEffect(() => {
    if (totalWidth > 0) {
      setTranslateX(-totalWidth);
    }
  }, [totalWidth]);

  useEffect(() => {
    const animate = () => {
      if (!isDragging && Math.abs(velocity) < 0.05 && totalWidth > 0) {
        setTranslateX(prev => {
          let newTranslateX = prev - 0.12;
          if (newTranslateX <= -totalWidth * 2) {
            newTranslateX = -totalWidth + (newTranslateX + totalWidth * 2);
          } else if (newTranslateX >= 0) {
            newTranslateX = -totalWidth + newTranslateX;
          }
          return newTranslateX;
        });
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    if (totalWidth > 0) {
        animationRef.current = requestAnimationFrame(animate);
    }
    return () => {
        if(animationRef.current) cancelAnimationFrame(animationRef.current)
    };
  }, [isDragging, velocity, totalWidth]);
  
  const handleMouseDown = (e) => {
    if (testimonials.length === 0) return;
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentX(translateX);
    setVelocity(0);
    setDragOffset(0);
    setLastMoveTime(Date.now());
    setLastMoveX(e.clientX);
    if (momentumRef.current) cancelAnimationFrame(momentumRef.current);
  };
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const now = Date.now();
    const timeDiff = now - lastMoveTime;
    const moveDiff = e.clientX - lastMoveX;
    if (timeDiff > 0 && timeDiff < 50) {
      const currentVelocity = (moveDiff / timeDiff) * 16;
      setVelocity(prev => prev * 0.8 + currentVelocity * 0.2);
    }
    const rawDiff = e.clientX - startX;
    const smoothedDiff = dragOffset + (rawDiff - dragOffset) * 0.4;
    setDragOffset(smoothedDiff);
    let newTranslateX = currentX + smoothedDiff * 0.6;
    if (newTranslateX >= 0) {
      newTranslateX -= totalWidth;
      setCurrentX(currentX - totalWidth);
    } else if (newTranslateX <= -totalWidth * 2) {
      newTranslateX += totalWidth;
      setCurrentX(currentX + totalWidth);
    }
    setTranslateX(newTranslateX);
    setLastMoveTime(now);
    setLastMoveX(e.clientX);
  };
  const handleMouseUp = () => setIsDragging(false);
  const handleTouchStart = (e) => {
    if (testimonials.length === 0) return;
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setCurrentX(translateX);
    setVelocity(0);
    setDragOffset(0);
    setLastMoveTime(Date.now());
    setLastMoveX(e.touches[0].clientX);
    if (momentumRef.current) cancelAnimationFrame(momentumRef.current);
  };
  const handleTouchMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const now = Date.now();
    const timeDiff = now - lastMoveTime;
    const moveDiff = e.touches[0].clientX - lastMoveX;
    if (timeDiff > 0 && timeDiff < 50) {
      const currentVelocity = (moveDiff / timeDiff) * 16;
      setVelocity(prev => prev * 0.8 + currentVelocity * 0.2);
    }
    const rawDiff = e.touches[0].clientX - startX;
    const smoothedDiff = dragOffset + (rawDiff - dragOffset) * 0.4;
    setDragOffset(smoothedDiff);
    let newTranslateX = currentX + smoothedDiff * 0.6;
    if (newTranslateX >= 0) {
      newTranslateX -= totalWidth;
      setCurrentX(currentX - totalWidth);
    } else if (newTranslateX <= -totalWidth * 2) {
      newTranslateX += totalWidth;
      setCurrentX(currentX + totalWidth);
    }
    setTranslateX(newTranslateX);
    setLastMoveTime(now);
    setLastMoveX(e.touches[0].clientX);
  };
  const handleTouchEnd = () => handleMouseUp();
  useEffect(() => {
    const handleGlobalMouseUp = () => { if (isDragging) setIsDragging(false) };
    document.addEventListener('mouseup', handleGlobalMouseUp);
    document.addEventListener('mouseleave', handleGlobalMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('mouseleave', handleGlobalMouseUp);
    };
  }, [isDragging]);


  return (
    <section id="testimonials" className="pt-16 pb-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-left mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-green-600 leading-tight font-montserrat mb-4">
            User Testimonials
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed font-sans">
            Dengar cerita sukses dari pengguna BudgetBuddy yang telah{' '}
            <span className="block">merasakan manfaat mengelola keuangan dengan smart</span>
          </p>
        </div>
        <div className="relative mb-12 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
          <div 
            ref={sliderRef}
            className="cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ touchAction: 'pan-y' }}
          >
            <div 
              className="flex gap-6"
              style={{ 
                transform: `translateX(${translateX}px)`,
                width: `${infiniteTestimonials.length * cardWidth}px`,
                willChange: 'transform'
              }}
            >
              {infiniteTestimonials.map((testimonial, index) => (
                <div key={`${testimonial.id}-${Math.floor(index / testimonials.length)}`} className="flex-shrink-0" style={{ width: `${cardWidth}px` }}>
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
