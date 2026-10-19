"use client";

import React, { useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    id: 1,
    title: "Premium Accessories",
    subtitle: "Upgrade your tech lifestyle with our latest gear.",
    img: "/2.jpg",
    src: "/category/accessories",
    label: "Accessories Collection",
  },
  {
    id: 2,
    title: "Next-Gen Laptops",
    subtitle: "Power meets portability for professionals.",
    img: "/3.jpg",
    src: "/category/laptops",
    label: "Power Meets Performance",
  },
  {
    id: 3,
    title: "Smartphones 2026",
    subtitle: "The future is in your hands with 5G technology.",
    img: "/4.jpg",
    src: "/category/mobiles",
    label: "Explore Smart Devices",
  },
  {
    id: 4,
    title: "Tech Hub Essentials",
    subtitle: "Everything you need to stay connected.",
    img: "/1.jpg",
    src: "/category/laptops",
    label: "Discover More",
  },
];

const Hero = () => {
  const autoplay = useMemo(
    () =>
      Autoplay({
        delay: 4500,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    []
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
    },
    [autoplay]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    onSelect();

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  return (
    <section
      aria-label="Gadget Glide featured collections"
      className="relative overflow-hidden border-b border-gray-200 bg-[#0b1220] text-white"
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-600/20 blur-[100px]" />

      <div className="pointer-events-none absolute -bottom-48 right-0 h-96 w-96 rounded-full bg-indigo-600/20 blur-[100px]" />

      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="h-510 min-w-0 flex-[0_0_100%] md:h-135"
            >
              <div className="relative mx-auto flex h-full min-h-0 max-w-7xl flex-col px-5 pb-20  sm:px-8 md:flex-row md:items-center md:px-12 md:pb-0 md:pt-0">
                {/* Left: Hero Content */}
                <div className="relative z-10 -translate-y-3 flex w-full shrink-0 flex-col items-center text-center md:w-[52%] md:-translate-y-6 md:items-start md:pr-8 md:text-left">
                  {/* Eyebrow */}
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-500/10 px-4 py-2">
                    <span className="h-2 w-2 rounded-full bg-blue-400" />

                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-300 sm:text-xs">
                      {slide.label}
                    </span>
                  </div>

                  {/* Heading */}
                  <h1 className="max-w-xl text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl md:text-5xl lg:text-6xl">
                    {slide.title}
                    <span className="text-blue-400">.</span>
                  </h1>

                  {/* Subtitle */}
                  <p className="mt-5 max-w-md text-sm leading-7 text-gray-300 sm:text-base md:text-lg">
                    {slide.subtitle}
                  </p>

                  {/* CTA */}
                  <div className=" flex flex-wrap items-center justify-center gap-4 md:justify-start">
                    <Link
                      href={slide.src}
                      className="group inline-flex items-center gap-3 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-600/30 active:scale-95"
                    >
                      Shop Collection

                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </Link>

                    <Link
                      href="#featured-products"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3.5 text-sm font-semibold text-gray-200 transition-colors hover:border-white/40 hover:bg-white/5"
                    >
                      Explore Products
                    </Link>
                  </div>

                  {/* Small trust line */}
                  <p className="mt-6 text-xs font-medium tracking-wide text-gray-400">
                    Discover your next favourite gadget
                  </p>
                </div>

                {/* Right: Hero Image */}
                <div className="relative mt-3 flex min-h-0 flex-1 items-center justify-center md:mt-0 md:w-[48%]">
                  {/* Glow */}
                  <div className="pointer-events-none absolute h-48 w-48 rounded-full bg-blue-500/20 blur-[70px] sm:h-64 sm:w-64" />

                  {/* Decorative circle */}
                  <div className="pointer-events-none absolute h-55 w-55 rounded-full border border-white/[0.07] sm:h-75 sm:w-75 md:h-90 md:w-90" />

                  <div className="pointer-events-none absolute h-43.75 w-43.75 rounded-full border border-blue-400/10 sm:h-61.25 sm:w-61.25 md:h-72.5 md:w-72.5" />

                  {/* Image */}
                  <div className="relative h-58.75 w-[90%] max-w-105 sm:h-65 md:h-102.5 md:w-full">
                    <Image
                      src={slide.img}
                      alt={slide.title}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 767px) 90vw, 48vw"
                      className="object-contain drop-shadow-[0_24px_35px_rgba(0,0,0,0.35)] transition-transform duration-700 hover:scale-105"
                    />
                  </div>

                  {/* Floating accent */}
                  <div className="absolute bottom-5 right-1 rounded-2xl border border-white/10 bg-white/6 px-4 py-3 shadow-xl backdrop-blur-md sm:right-5 md:bottom-8 md:right-0">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                      Discover
                    </p>

                    <p className="mt-1 text-sm font-bold text-white">
                      Your Next Upgrade
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel Controls */}
      <div className="absolute bottom-12 left-1/2 z-20 flex -translate-x-1/2 items-center gap-4 md:bottom-10 md:left-12 md:translate-x-0">
        {/* Previous */}
        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          aria-label="Previous slide"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:border-blue-400 hover:bg-blue-600"
        >
          <span aria-hidden="true">←</span>
        </button>

        {/* Pagination Dots */}
        <div className="flex items-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => emblaApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={selectedIndex === index ? "true" : undefined}
              className={`h-2 rounded-full transition-all duration-300 ${
                selectedIndex === index
                  ? "w-7 bg-blue-400"
                  : "w-2 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        {/* Next */}
        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          aria-label="Next slide"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:border-blue-400 hover:bg-blue-600"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  );
};

export default Hero;