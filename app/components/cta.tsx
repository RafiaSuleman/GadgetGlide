 import Link from 'next/link'
import React from 'react'
 
 const CTA = () => {
   return (
     <section className="mx-auto max-w-7xl px-5 pb-16 lg:px-8">
        <div className="relative overflow-hidden rounded-4xl bg-[#101827] px-6 py-12 text-white sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-blue-600/30 blur-3xl" />

          <div className="relative z-10 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-300">
              Your next upgrade starts here
            </p>

            <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              Find the tech that fits your life.
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-gray-300 sm:text-base">
              Explore our collection and discover your next favourite gadget
              with Gadget Glide.
            </p>

            <Link
              href="#featured-products"
              className="mt-8 inline-flex items-center gap-3 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-blue-500"
            >
              Explore Products <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
   )
 }
 
 export default CTA
 