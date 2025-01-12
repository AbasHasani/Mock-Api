import {
  Calendar,
  ChevronUp,
  Home,
  Inbox,
  Search,
  Settings,
  User2,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { serverClient } from "@/app/_trpc/serverClient";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/clientAuth";
import { trpc } from "@/app/_trpc/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { headers } from "next/headers";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Image from "next/image";
import SignOutBtn from "./SignOutBtn";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export async function AppSidebar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const apis = await serverClient.apisRouter.apis({
    userId: session?.user.id || "1",
  });
  if (!session?.user) {
    return;
  }
  return (
    <Sidebar className="bg-red-300">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Apis</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {apis?.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild>
                    <Link href={`/mockapi/${item.id}`}>
                      <span className="capitalize">{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="h-[3rem]" asChild>
                <SidebarMenuButton>
                  <Avatar>
                    <AvatarFallback className="uppercase">
                      {session.user.name.substring(0, 2)}
                    </AvatarFallback>
                    <AvatarImage src={session.user.image || ""} />
                  </Avatar>
                  <p>{session.user.name}</p>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <SignOutBtn />
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
