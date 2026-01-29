// *********************
// Role of the component: Stats element for admin dashboard - Cibaduyut
// Name of the component: StatsElement.tsx
// Version: 2.0 - Modern Glass Morphism Design
// *********************

import React from "react";
import { FaArrowUp, FaArrowDown, FaBox, FaUsers, FaShoppingCart, FaChartLine } from "react-icons/fa";

interface StatsElementProps {
  title?: string;
  value?: string | number;
  change?: number;
  icon?: 'products' | 'users' | 'orders' | 'revenue';
}

const iconMap = {
  products: FaBox,
  users: FaUsers,
  orders: FaShoppingCart,
  revenue: FaChartLine,
};

const colorMap = {
  products: 'from-cibaduyut-brown-500 to-cibaduyut-brown-600',
  users: 'from-cibaduyut-gold to-cibaduyut-brown-400',
  orders: 'from-cibaduyut-brown-600 to-cibaduyut-brown-700',
  revenue: 'from-cibaduyut-brown-400 to-cibaduyut-gold',
};

const StatsElement = ({ 
  title = "New Products", 
  value = "2,230", 
  change = 12.5,
  icon = 'products'
}: StatsElementProps) => {
  const Icon = iconMap[icon];
  const gradientColor = colorMap[icon];
  const isPositive = change >= 0;

  return (
    <div className="stats-card flex items-center gap-4 flex-1 min-w-[250px]">
      {/* Icon */}
      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradientColor} flex items-center justify-center shadow-leather flex-shrink-0`}>
        <Icon className="text-white text-xl" />
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-cibaduyut-brown-500 font-medium truncate">{title}</p>
        <p className="text-2xl font-bold text-cibaduyut-brown-800 mt-0.5">{value}</p>
        <div className={`flex items-center gap-1 text-sm mt-1 ${
          isPositive ? 'text-green-600' : 'text-red-500'
        }`}>
          {isPositive ? (
            <FaArrowUp className="text-xs" />
          ) : (
            <FaArrowDown className="text-xs" />
          )}
          <span className="font-medium">{Math.abs(change)}%</span>
          <span className="text-cibaduyut-brown-400 text-xs">vs bulan lalu</span>
        </div>
      </div>
    </div>
  );
};

export default StatsElement;
