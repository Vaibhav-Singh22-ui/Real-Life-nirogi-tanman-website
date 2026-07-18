"use client";

import React from "react";

type FeatureCardProps = {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
};

const FeatureCard = ({ title, icon: Icon }: FeatureCardProps) => {
  return (
    <div className="flex flex-col items-center text-center group">
      {/* Circular container with clean light green accent */}
      <div className="flex items-center justify-center h-16 w-16 rounded-full bg-[#2F5E1A]/10 border border-[#2F5E1A]/20 mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#2F5E1A] group-hover:border-[#2F5E1A] shadow-sm">
        <Icon className="h-7 w-7 text-[#2F5E1A] transition-all duration-300 group-hover:text-white" />
      </div>
      {/* Uppercase bold title */}
      <h4 className="text-sm font-bold text-[#1B1B1B] tracking-wider uppercase max-w-[200px]">
        {title}
      </h4>
    </div>
  );
};

export default FeatureCard;
