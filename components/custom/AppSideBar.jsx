import React, { useContext } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  HelpCircle,
  Icon,
  LogOut,
  MessageCircleCode,
  Settings,
  Wallet,
} from "lucide-react";
import WorkspaceHistory from "./WorkspaceHistory";
import SideBarFooter from "./SideBarFooter";
import { UserDetailContext } from "@/context/UserDetailContext";

const AppSideBar = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  ;

  return (
    <Sidebar className="h-full z-50">
      <SidebarHeader className="p-1">
        <div className="flex items-center gap-3 mt-5">
          <Image src="/ThunderLogo.png" alt="logo" width={40} height={40} />
          <div className="text-white-400">
            <h2 className="text-lg font-medium ">
              Hey there,
              <br />
              <span>lets get started!</span>
            </h2>
          </div>
        </div>

        <Button
          className="mx-5 mt-2"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          <MessageCircleCode /> Start new chat
        </Button>
      </SidebarHeader>
      <SidebarContent className="p-5 mt-1 scrollbar-hide">
        {/* <SidebarGroup /> */}
        <WorkspaceHistory></WorkspaceHistory>
        {/* <SidebarGroup /> */}
      </SidebarContent>
      <SidebarFooter>
        <SideBarFooter />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSideBar;
