"use client";

import React from "react";

type PriceDisplayProps = {
  price: number;
  originalPrice: number;
  className?: string;
};

const PriceDisplay = ({ price, originalPrice, className }: PriceDisplayProps) => {
  return (
    <div className={`flex items-baseline gap-2 ${className ?? ""}`.trim()}>
      <span className="text-xl font-bold text-[#2F5E1A]">
        ₹{price.toLocaleString("en-IN")}
      </span>
      <span className="text-sm text-[#667085] line-through decoration-1">
        ₹{originalPrice.toLocaleString("en-IN")}
      </span>
    </div>
  );
};

export default PriceDisplay;
