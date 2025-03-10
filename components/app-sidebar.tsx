"use client";
import { Settings, Utensils, HomeIcon } from "lucide-react";

import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "#",
    icon: HomeIcon,
  },
  {
    title: "Master Data",
    url: "#",
    icon: Utensils,
    items: [
      {
        title: "Menu",
        url: "/menu",
      },
      {
        title: "Categories",
        url: "/categories",
      },
      {
        title: "Variants",
        url: "/variants",
      },
    ],
  },

  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <NavMain items={items} />
      </SidebarContent>
    </Sidebar>
  );
}
