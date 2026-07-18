import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImgSrc(img: any): string {
  if (!img) return "";
  if (typeof img === "object" && img !== null && "src" in img) {
    return img.src;
  }
  return img;
}
