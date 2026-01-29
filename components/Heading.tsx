// *********************
// Role of the component: Heading component - Cibaduyut
// Name of the component: Heading.tsx
// Version: 2.0 - Modern Design
// *********************

import React from 'react'

interface HeadingProps {
  title: string;
  subtitle?: string;
  light?: boolean;
}

const Heading = ({ title, subtitle, light = false } : HeadingProps) => {
  return (
    <div className="text-center">
      <h2 className={`font-display text-4xl md:text-5xl lg:text-6xl font-bold ${
        light ? 'text-white' : 'text-cibaduyut-brown-800'
      }`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-3 text-lg ${light ? 'text-white/70' : 'text-cibaduyut-brown-500'}`}>
          {subtitle}
        </p>
      )}
      <div className={`section-divider mt-6 ${light ? 'opacity-50' : ''}`}></div>
    </div>
  )
}

export default Heading