// *********************
// Role of the component: Section title - Cibaduyut
// Name of the component: SectionTitle.tsx
// Version: 2.0
// *********************

import React from 'react'

const SectionTitle = ({title, path} : {title: string; path: string}) => {
  return (
    <div className='py-12 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-gray-100'>
      <div className='max-w-screen-2xl mx-auto px-6'>
        <h1 className='text-3xl md:text-4xl font-bold text-gray-800 mb-2'>{title}</h1>
        <p className='text-gray-500 text-sm'>{path}</p>
      </div>
    </div>
  )
}

export default SectionTitle