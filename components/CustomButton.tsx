// *********************
// Role of the component: Custom button - Cibaduyut
// Name of the component: CustomButton.tsx
// Version: 2.0
// *********************

import React from "react";

interface CustomButtonProps {
  paddingX?: number;
  paddingY?: number;
  text: string;
  buttonType: "submit" | "reset" | "button";
  customWidth?: string;
  textSize?: string;
  variant?: "primary" | "outline" | "ghost";
}

const CustomButton = ({
  text,
  buttonType,
  customWidth,
  variant = "outline"
}: CustomButtonProps) => {
  const baseStyles = "font-medium rounded-lg transition-all duration-200 active:scale-[0.98]";
  
  const variants = {
    primary: "bg-amber-600 text-white px-6 py-2.5 hover:bg-amber-700 shadow-sm hover:shadow",
    outline: "border border-gray-300 text-gray-700 px-6 py-2.5 hover:border-amber-600 hover:text-amber-600 hover:bg-amber-50",
    ghost: "text-amber-600 px-4 py-2 hover:bg-amber-50"
  };

  return (
    <button
      type={buttonType}
      className={`${baseStyles} ${variants[variant]} ${customWidth !== "no" && customWidth ? `w-${customWidth}` : ''}`}
    >
      {text}
    </button>
  );
};

export default CustomButton;
