"use client";

import {
  Menu,
  UserRound,
  ChevronDown,
  ChevronRight,
  Home,
  Leaf,
  Sparkles,
  Users,
  MessageSquare,
  HeartPulse,
  Stethoscope,
  Waves,
  Moon,
  Calendar,
  Activity,
  TrendingUp,
  ShoppingCart,
  Pill,
  BookOpen,
  Video,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandMark from "@/components/app/BrandMark";
import { Button } from "@/components/ui/button";
import { publicNavItems } from "@/data/app-navigation";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const PublicNavbar = () => {
  const pathname = usePathname();

  return (
    <header
      className={cn(
        "z-50 border-b border-border/80 bg-background/95 backdrop-blur-md transition-all duration-300 shadow-sm sticky top-0"
      )}
    >
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Brand Logo */}
        <BrandMark />

        {/* Center Navigation Links (Desktop) */}
        <nav className="hidden items-center gap-6 lg:flex ml-auto mr-6">
          {publicNavItems.map((item) => {
            const isSubActive =
              item.subItems &&
              item.subItems.some(
                (sub) =>
                  pathname === sub.path ||
                  (sub.path !== "/" && pathname.startsWith(sub.path))
              );
            const isActive = pathname === item.path || isSubActive;

            if (item.label === "Shop") {
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "inline-flex items-center gap-2 whitespace-nowrap px-4 py-1.5 rounded-full border text-xs sm:text-sm font-extrabold shadow-sm transition-all duration-300 hover:bg-[#6EF3A5]/25 hover:border-primary/40 hover:-translate-y-0.5",
                    pathname === item.path
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-[#6EF3A5]/10 text-primary border-primary/20"
                  )}
                >
                  <item.icon className="h-3.5 w-3.5 text-[#DDA853] animate-pulse" />
                  {item.label}
                </Link>
              );
            }

            if (item.subItems) {
              return (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={cn(
                        "relative inline-flex items-center gap-1.5 pb-1.5 text-xs sm:text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-0 text-foreground hover:text-primary after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:after:scale-x-100",
                        isActive
                          ? "text-primary font-bold after:scale-x-100"
                          : ""
                      )}
                    >
                      <item.icon className="h-3.5 w-3.5 text-muted-foreground" />
                      {item.label}
                      <ChevronDown className="h-3 w-3 text-muted-foreground transition-transform duration-200" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="w-60 p-1.5 rounded-2xl bg-white/95 backdrop-blur-md border border-border/80 shadow-lg z-[999] animate-in fade-in-80 slide-in-from-top-1 duration-200"
                  >
                    {item.subItems.map((subItem) => {
                      const isChildActive = pathname === subItem.path;
                      return (
                        <DropdownMenuItem
                          key={subItem.path}
                          asChild
                          className="focus:bg-[#6EF3A5]/10 focus:text-[#2F5E1A] rounded-xl cursor-pointer"
                        >
                          <Link
                            href={subItem.path}
                            className={cn(
                              "flex items-center gap-2.5 px-3 py-2 text-xs font-semibold",
                              isChildActive ? "text-primary bg-primary/5 font-extrabold" : ""
                            )}
                          >
                            <subItem.icon className="h-4 w-4 shrink-0 text-[#2F5E1A]/70" />
                            {subItem.label}
                          </Link>
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            }

            return (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "relative inline-flex items-center gap-2 whitespace-nowrap pb-1.5 text-xs sm:text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 text-foreground hover:text-primary after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:after:scale-x-100",
                  isActive ? "text-primary font-bold after:scale-x-100" : ""
                )}
              >
                <item.icon className="h-3.5 w-3.5 text-muted-foreground" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Section (Login & Consultation) */}
        <div className="flex items-center gap-3">
          {/* Consultation Button (Desktop) */}
          <Button
            variant="outline"
            className="border-[#2F5E1A] text-[#2F5E1A] hover:bg-[#2F5E1A]/10 hover:text-[#2F5E1A] rounded-xl font-semibold hidden md:flex h-9 text-xs"
            asChild
          >
            <Link href="/book-consultation">Book Consultation</Link>
          </Button>

          {/* Login Button (Desktop) */}
          <Button
            className="bg-[#2F5E1A] hover:bg-[#1E3F11] text-white rounded-xl font-semibold hidden md:flex h-9 text-xs"
            asChild
          >
            <Link href="/login">
              <UserRound className="mr-1.5 h-3.5 w-3.5" />
              Login
            </Link>
          </Button>

          {/* Mobile Hamburger Drawer */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden rounded-full h-9 w-9"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] bg-white flex flex-col justify-between overflow-y-auto no-scrollbar"
            >
              <div>
                <SheetHeader className="pb-4 border-b">
                  <SheetTitle>
                    <BrandMark />
                  </SheetTitle>
                </SheetHeader>
                <nav className="mt-6 flex flex-col gap-4">
                  {publicNavItems.map((item) => {
                    const isActive = pathname === item.path;

                    if (item.subItems) {
                      return (
                        <div key={item.label} className="flex flex-col gap-1 pl-1">
                          <span className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground px-3.5 py-1.5 block border-b border-border/40">
                            {item.label}
                          </span>
                          {item.subItems.map((subItem) => {
                            const isSubActive = pathname === subItem.path;
                            return (
                              <Button
                                key={subItem.path}
                                variant={isSubActive ? "secondary" : "ghost"}
                                className={cn(
                                  "justify-start transition-all duration-200 hover:translate-x-1 rounded-xl text-xs pl-6 h-9",
                                  isSubActive
                                    ? "bg-[#6EF3A5]/20 text-[#2F5E1A] font-bold"
                                    : "text-muted-foreground"
                                )}
                                asChild
                              >
                                <Link href={subItem.path}>
                                  <subItem.icon className="mr-2 h-3.5 w-3.5 shrink-0" />
                                  {subItem.label}
                                </Link>
                              </Button>
                            );
                          })}
                        </div>
                      );
                    }

                    return (
                      <Button
                        key={item.path}
                        variant={isActive ? "secondary" : "ghost"}
                        className={cn(
                          "justify-start transition-all duration-300 hover:translate-x-1 rounded-xl text-xs sm:text-sm h-10",
                          isActive ? "bg-[#6EF3A5]/20 text-[#2F5E1A] font-bold" : ""
                        )}
                        asChild
                      >
                        <Link href={item.path}>
                          <item.icon className="mr-2 h-4 w-4" />
                          {item.label}
                        </Link>
                      </Button>
                    );
                  })}
                </nav>
              </div>

              {/* Mobile CTA Footer */}
              <div className="flex flex-col gap-2 pt-4 border-t border-border mt-8">
                <Button
                  variant="outline"
                  className="border-[#2F5E1A] text-[#2F5E1A] rounded-xl w-full text-xs h-10"
                  asChild
                >
                  <Link href="/book-consultation">Book Consultation</Link>
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="rounded-xl text-xs h-10" asChild>
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button
                    className="bg-[#2F5E1A] hover:bg-[#1E3F11] text-white rounded-xl text-xs h-10"
                    asChild
                  >
                    <Link href="/register">Register</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default PublicNavbar;
