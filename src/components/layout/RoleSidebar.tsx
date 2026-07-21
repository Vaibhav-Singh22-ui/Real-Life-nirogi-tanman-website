import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandMark from "@/components/app/BrandMark";
import type { AppRole } from "@/types/navigation";
import { roleSidebarGroups } from "@/data/app-navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

type RoleSidebarProps = {
  role: AppRole;
};

const RoleSidebar = ({ role }: RoleSidebarProps) => {
  const { state, isHovered } = useSidebar();
  const collapsed = state === "collapsed";
  const isCollapsed = collapsed && !isHovered;
  const pathname = usePathname();

  const groups = roleSidebarGroups[role] || [];

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader className="border-b border-sidebar-border p-3">
        <BrandMark compact={isCollapsed} />
      </SidebarHeader>
      <SidebarContent className="space-y-1 py-2">
        {groups.map((group, groupIdx) => (
          <SidebarGroup key={groupIdx} className="px-2 py-1">
            {!isCollapsed && (
              <SidebarGroupLabel className="text-[11px] font-extrabold uppercase tracking-wider text-sidebar-foreground/60 px-2 py-1">
                {group.groupLabel}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton asChild tooltip={item.label} isActive={isActive}>
                        <Link href={item.path} className="flex items-center gap-2 font-semibold">
                          <item.icon className={`h-4 w-4 shrink-0 ${isActive ? "text-primary font-bold" : "text-sidebar-foreground/70"}`} />
                          {!isCollapsed && <span>{item.label}</span>}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-3">
        {!isCollapsed && (
          <div className="flex items-center justify-between text-[11px] text-sidebar-foreground/70 font-semibold">
            <span>Nirogi Tanman Platform</span>
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};

export default RoleSidebar;
