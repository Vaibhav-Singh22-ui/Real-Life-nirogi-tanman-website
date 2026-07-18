"use client";

import React from "react";
import { Star } from "lucide-react";

type RatingStarsProps = {
  rating: number; // e.g. 4.7
  reviewsCount?: number; // e.g. 124
  className?: string;
};

const RatingStars = ({ rating, reviewsCount = 120, className }: RatingStarsProps) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className={`flex items-center gap-1 ${className ?? ""}`.trim()}>
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, index) => {
          const isFilled = index < fullStars;
          const isHalf = !isFilled && index === fullStars && hasHalfStar;

          return (
            <Star
              key={index}
              className={`h-4 w-4 ${
                isFilled
                  ? "fill-[#FFB23F] text-[#FFB23F]"
                  : isHalf
                  ? "fill-[#FFB23F]/50 text-[#FFB23F]"
                  : "text-[#E5E7EB] fill-none"
              }`}
            />
          );
        })}
      </div>
      <span className="text-xs font-semibold text-[#1B1B1B] ml-1">{rating}</span>
      <span className="text-xs text-[#667085] ml-0.5">({reviewsCount} reviews)</span>
    </div>
  );
};

export default RatingStars;
