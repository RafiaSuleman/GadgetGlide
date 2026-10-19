import React from 'react'

const Trust = () => {
  return (
     <section className="border-y border-gray-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-5 py-6 sm:grid-cols-3 lg:px-8">
          {[
            {
              icon: "✦",
              title: "Premium Technology",
              subtitle: "Quality products for everyday life",
            },
            {
              icon: "✓",
              title: "Trusted Shopping",
              subtitle: "A simple and convenient experience",
            },
            {
              icon: "↗",
              title: "Explore Latest Gear",
              subtitle: "Find your next favourite device",
            },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-xl font-bold text-blue-600">
                {item.icon}
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{item.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

  )
}

export default Trust
