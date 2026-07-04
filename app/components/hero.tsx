"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000 })]);

  const slides = [
    { 
      id: 1, 
      title: "Premium Accessories", 
      subtitle: "Upgrade your tech lifestyle with our latest gear.", 
      img: "/1.jpg" ,
      src:"/category/accessories"
    },
    { 
      id: 2, 
      title: "Next-Gen Laptops", 
      subtitle: "Power meets portability for professionals.", 
      img: "/2.jpg" ,
      src:"/category/laptops"

    },
    { 
      id: 3, 
      title: "Smartphones 2026", 
      subtitle: "The future is in your hands with 5G technology.", 
      img: "/3.jpg" ,
      src:"/category/mobiles"


    },
    { 
      id: 4, 
      title: "Tech Hub Essentials", 
      subtitle: "Everything you need to stay connected.", 
      img: "/4.jpg" ,
      src:"/category/laptops"
    },
  ];

  return (
    <div className="relative overflow-hidden bg-white border-b border-gray-100" ref={emblaRef}>
      <div className="flex">
        {slides.map((slide) => (
          <div key={slide.id} className="flex-[0_0_100%] min-w-0 h-112.5 md:h-137.5">
            <div className="flex flex-col md:flex-row h-full items-center max-w-7xl mx-auto">
              
              {/* Left Side: Content */}
              <div className="w-full md:w-1/2 px-10 md:px-20 text-center md:text-left py-10">
                <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4 block">
                  New Arrival
                </span>
                <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 text-gray-900 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl font-light mb-8 text-gray-600">
                  {slide.subtitle}
                </p>
                <Link href={slide.src}>
                <button className="bg-blue-600 hover:bg-black text-white px-10 py-4 rounded-full font-bold transition-all duration-300 shadow-xl active:scale-95">
                  Shop Now
                </button></Link>
              </div>

              {/* Right Side: Image Container */}
              <div className="w-full md:w-1/2 relative h-full flex justify-center items-center bg-gray-50/50">
                <div className="relative w-[80%] h-[80%]">
                  <Image
                    src={slide.img}
                    alt={slide.title}
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;