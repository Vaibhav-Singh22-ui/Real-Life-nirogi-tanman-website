import Link from "next/link";
import { getImgSrc } from "@/lib/utils";
import { useLoading } from "@/context/LoadingContext";

type BrandMarkProps = {
  compact?: boolean;
  className?: string;
};

const BrandMark = ({ compact = false, className }: BrandMarkProps) => {
  const { isLoading, showNavbarLogo } = useLoading();

  return (
    <Link href="/" className={`inline-flex items-center gap-3 ${className ?? ""}`.trim()}>
      <img
        id="navbar-logo"
        src={getImgSrc("/Logo.svg")}
        alt="Nirogi Tanman logo"
        className={`${
          compact ? "h-10 w-10 p-1" : "h-16 w-16 p-2"
        } object-contain bg-white rounded-full border border-border/40 shadow-sm ${
          !isLoading || showNavbarLogo ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
    </Link>
  );
};

export default BrandMark;
