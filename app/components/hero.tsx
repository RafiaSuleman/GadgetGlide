"use client";

import { useEffect, useMemo, useState } from "react";
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

export default function Hero() {
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

    const updateIndex = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    updateIndex();

    emblaApi.on("select", updateIndex);
    emblaApi.on("reInit", updateIndex);

    return () => {
      emblaApi.off("select", updateIndex);
      emblaApi.off("reInit", updateIndex);
    };
  }, [emblaApi]);

  return (
    <section
      aria-label="Gadget Glide featured collections"
      className="relative isolate overflow-hidden border-b border-gray-200 bg-[#0b1220] text-white"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full bg-blue-600/20 blur-[90px] sm:h-96 sm:w-96" />

      <div className="pointer-events-none absolute -bottom-32 -right-24 h-72 w-72 rounded-full bg-indigo-600/20 blur-[90px] sm:h-96 sm:w-96" />

      {/* Carousel */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="h-[calc(100svh-80px)] min-h-120 max-h-180 min-w-0 flex-[0_0_100%] md:h-130 md:min-h-0 md:max-h-none"
            >
              <div className="relative mx-auto flex h-full w-full max-w-7xl flex-col px-4 pb-14 pt-3 sm:px-6 md:flex-row md:items-center md:px-10 md:pb-0 md:pt-0 lg:px-12">

                {/* Text section */}
                <div className="relative z-10 flex w-full shrink-0 flex-col items-center text-center md:w-[52%] md:items-start md:pr-6 md:text-left lg:pr-10">

                  {/* Category label */}
                  <div className="mb-3 inline-flex max-w-full items-center gap-2 rounded-full border border-blue-400/25 bg-blue-500/10 px-3 py-1.5 sm:mb-4 sm:px-4 sm:py-2">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-blue-400" />

                    <span className="truncate text-[9px] font-bold uppercase tracking-[0.16em] text-blue-300 sm:text-xs sm:tracking-[0.2em]">
                      {slide.label}
                    </span>
                  </div>

                  {/* Heading */}
                  <h1 className="max-w-xl text-3xl font-black leading-[1.08] tracking-tight text-white min-[400px]:text-4xl sm:text-5xl md:text-5xl lg:text-6xl">
                    {slide.title}
                    <span className="text-blue-400">.</span>
                  </h1>

                  {/* Description */}
                  <p className="mt-3 max-w-md text-xs leading-5 text-gray-300 sm:mt-4 sm:text-sm sm:leading-6 md:text-base">
                    {slide.subtitle}
                  </p>

                  {/* Buttons */}
                  <div className="mt-4 flex w-full max-w-87.5 items-center gap-2 sm:mt-5 md:w-auto md:max-w-none md:gap-3">

                    <Link
                      href={slide.src}
                      className="group inline-flex min-h-11 min-w-0 flex-1 items-center justify-center gap-1 whitespace-nowrap rounded-xl bg-blue-600 px-2 py-3 text-[10px] font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:bg-blue-500 active:scale-95 sm:flex-none sm:gap-2 sm:px-5 sm:text-sm"
                    >
                      Shop Collection
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </Link>

                    <Link
                      href="#featured-products"
                      className="inline-flex min-h-11 min-w-0 flex-1 items-center justify-center whitespace-nowrap rounded-xl border border-white/15 px-2 py-3 text-[10px] font-semibold text-gray-200 transition-colors hover:border-white/40 hover:bg-white/5 sm:flex-none sm:px-5 sm:text-sm"
                    >
                      Explore Products
                    </Link>

                  </div>

                  {/* Trust line */}
                  <p className="mt-3 text-[10px] font-medium tracking-wide text-gray-400 sm:mt-4 sm:text-xs">
                    Discover your next favourite gadget
                  </p>
                </div>

                {/* Product image section */}
                <div className="relative mt-1 flex min-h-0 w-full flex-1 items-center justify-center md:mt-0 md:w-[48%]">

                  {/* Image glow */}
                  <div className="pointer-events-none absolute h-36 w-36 rounded-full bg-blue-500/20 blur-[60px] sm:h-52 sm:w-52 md:h-64 md:w-64" />

                  {/* Decorative circles */}
                  <div className="pointer-events-none absolute h-40 w-40 rounded-full border border-white/[0.07] min-[400px]:h-44 min-[400px]:w-44 sm:h-56 sm:w-56 md:h-82.5 md:w-82.5" />

                  <div className="pointer-events-none absolute h-32 w-32 rounded-full border border-blue-400/10 min-[400px]:h-36 min-[400px]:w-36 sm:h-44 sm:w-44 md:h-65 md:w-65" />

                  {/* Product image */}
                  <div className="relative h-full max-h-55 w-full max-w-75 min-h-37.5 sm:max-h-60 md:h-87.5 md:min-h-0 md:max-h-none md:max-w-none lg:h-95">
                    <Image
                      src={slide.img}
                      alt={slide.title}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 399px) 90vw, (max-width: 767px) 85vw, 48vw"
                      className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.3)] transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  {/* Desktop accent */}
                  <div className="absolute bottom-4 right-0 hidden rounded-2xl border border-white/10 bg-white/6 px-4 py-3 shadow-xl backdrop-blur-md md:block lg:right-1">
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

      {/* Carousel controls */}
      <div className="absolute bottom-2 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/10 bg-[#0b1220]/90 px-3 py-1.5 backdrop-blur-md md:bottom-5 md:left-10 md:translate-x-0 md:gap-4 md:py-2">

        {/* Previous */}
        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          aria-label="Previous slide"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:border-blue-400 hover:bg-blue-600 sm:h-9 sm:w-9"
        >
          <span aria-hidden="true">←</span>
        </button>

        {/* Pagination dots */}
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
                  ? "w-6 bg-blue-400"
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
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:border-blue-400 hover:bg-blue-600 sm:h-9 sm:w-9"
        >
          <span aria-hidden="true">→</span>
        </button>

      </div>
    </section>
  );
}