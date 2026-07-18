"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type HeroButtonsProps = {
  onShopNowClick: () => void;
  consultationPath?: string;
  showConsultation?: boolean;
};

const HeroButtons = ({
  onShopNowClick,
  consultationPath = "/book-consultation",
  showConsultation = true,
}: HeroButtonsProps) => {
  return (
    <div className="flex flex-wrap gap-4 mt-8">
      {/* Primary: Shop Now */}
      <Button
        onClick={onShopNowClick}
        className="bg-[#2F5E1A] hover:bg-[#1E3F11] text-white px-8 py-6 rounded-xl font-semibold text-base shadow-lg transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
      >
        Shop Now
      </Button>

      {/* Secondary: Book Consultation */}
      {showConsultation && (
        <Button
          variant="outline"
          className="border-2 border-white/60 text-white bg-transparent hover:bg-white hover:text-[#2F5E1A] hover:border-white px-8 py-6 rounded-xl font-semibold text-base transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
          asChild
        >
          <Link href={consultationPath}>
            Book Consultation
          </Link>
        </Button>
      )}
    </div>
  );
};

export default HeroButtons;
