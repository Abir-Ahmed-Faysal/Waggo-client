import { GalleryVerticalEnd } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav_user";
import useAuth from "../Hooks/useAuth";
import { Link } from "react-router";

const navMain = [
  { title: "Add a pet", link: "/dashboard/add-pet" },
  { title: "My added pets", link: "/dashboard/my-pet" },
  { title: "Adoption Request", link: "/dashboard/adoption-request" },
  { title: "Create Donation Campaign", link: "/dashboard/create-donation" },
  { title: "My Donation Campaigns", link: "/dashboard/my-campaigns" },
  { title: "My Donations", link: "/dashboard/my-donations" },
];

export function AppSidebar({ ...props }) {
  const { user } = useAuth();
  const currentUser = user || {};

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Dashboard</span>
                  <span className="">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link to={item.link} className="font-medium">
                    {item.title}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={currentUser} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
