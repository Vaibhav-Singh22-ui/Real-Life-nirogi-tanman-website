import { Bell, Search } from "lucide-react";
import AppBreadcrumbs from "@/components/app/AppBreadcrumbs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import type { AppRole } from "@/types/navigation";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/integrations/supabase/client";
import Link from "next/link";

const RoleTopbar = ({ role }: { role: AppRole }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    localStorage.removeItem("nirogi_signup_role");
    await supabase.auth.signOut();
    router.replace("/login");
  };

  const profilePath = role === "patient" ? "/patient/profile" : `/${role}/settings`;
  const isDashboard = pathname ? pathname.endsWith("/dashboard") : false;

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/90 bg-primary/5 backdrop-blur-md">
      <div className="flex h-14 items-center gap-3 px-4 md:px-6">
        <SidebarTrigger className="h-9 w-9" />
        
        <div className="hidden flex-1 md:block">
          <AppBreadcrumbs />
        </div>

        {/* Spacer to push notifications and profile to the right on mobile */}
        <div className="flex-1 md:hidden" />

        {/* Conditional Search Bar: Only shown on dashboard main pages */}
        {isDashboard && (
          <div className="hidden w-72 items-center gap-2 rounded-md border border-input bg-card px-3 md:flex">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search patients, reports..." className="border-0 bg-transparent px-0 focus-visible:ring-0" />
          </div>
        )}

        <Button variant="ghost" size="icon" aria-label="Notifications" className="h-9 w-9">
          <Bell className="h-4 w-4 text-muted-foreground" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-10 gap-2 px-1 focus-visible:ring-0">
              <Avatar className="h-8 w-8 ring-2 ring-primary/20">
                <AvatarFallback className="bg-primary/10 text-primary font-medium text-xs">NT</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={profilePath}>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/${role}/settings`}>Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default RoleTopbar;
