"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";

type DiscountBadgeProps = {
  discount: number; // e.g. 44 for 44%
  className?: string;
};

const DiscountBadge = ({ discount, className }: DiscountBadgeProps) => {
  // Red badge for larger discounts (>= 45%), Green badge otherwise
  const isLargeDiscount = discount >= 45;

  return (
    <Badge
      className={`rounded-full px-2.5 py-1 text-xs font-bold text-white shadow-sm border-none tracking-wide transition-all select-none ${
        isLargeDiscount
          ? "bg-[#EF4444] hover:bg-[#EF4444]"
          : "bg-[#16A34A] hover:bg-[#16A34A]"
      } ${className ?? ""}`.trim()}
    >
      {discount}% OFF
    </Badge>
  );
};

export default DiscountBadge;
