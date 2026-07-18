"use client";

import React from "react";

type SubscriptionSelectorProps = {
  options: string[];
  selectedOption: string;
  onChange: (option: string) => void;
  className?: string;
};

const SubscriptionSelector = ({
  options,
  selectedOption,
  onChange,
  className,
}: SubscriptionSelectorProps) => {
  return (
    <div className={`flex flex-wrap gap-2 my-3 ${className ?? ""}`.trim()}>
      {options.map((option) => {
        const isSelected = selectedOption === option;

        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#2F5E1A]/20 select-none ${
              isSelected
                ? "bg-[#2F5E1A] border-[#2F5E1A] text-white shadow-sm"
                : "bg-white border-[#E5E7EB] text-[#667085] hover:border-[#2F5E1A]/40 hover:text-[#2F5E1A]"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

export default SubscriptionSelector;
