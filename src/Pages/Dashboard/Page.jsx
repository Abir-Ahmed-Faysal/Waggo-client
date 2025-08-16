import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import Navbar from "../../components/Navbar";

export default function Page() {
  return (
    <div >
      <Navbar></Navbar>
      <div className="">
        <div className="flex   h-screen overflow-hidden">
        <SidebarProvider>
          <AppSidebar />
          <div className="flex flex-col flex-1 overflow-hidden">

            <SidebarInset>
              {/* Header under Navbar */}
              <header className="flex h-16 items-center gap-2 border-b px-3">
                <SidebarTrigger />
                <Separator orientation="vertical" className="h-4 mx-2" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Current Page</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </header>

              {/* Main scrollable content */}
              <main className="flex-1 overflow-y-auto p-4 bg-muted/50 rounded-xl">
                <Outlet />
              </main>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </div>
      </div>
    </div>
  );
}
