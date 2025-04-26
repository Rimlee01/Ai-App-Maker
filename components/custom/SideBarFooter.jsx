import React, { useContext } from "react";
import { Button } from "../ui/button";
import { HelpCircle, LogOutIcon, Settings, Wallet } from "lucide-react";
import { UserDetailContext } from "@/context/UserDetailContext";

const SideBarFooter = () => {
  const { setUserDetail } = useContext(UserDetailContext);

  const options = [
    {
      name: "Settings",
      Icon: Settings,
    },
    {
      name: "Help Center",
      Icon: HelpCircle,
    },
    {
      name: "My Subscription",
      Icon: Wallet,
    },
    {
      name: "Logout",
      Icon: LogOutIcon,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user from local storage
    window.location.href = "/";  // Refresh the page to reflect logout state
    setUserDetail(null); // Clear user details from context
  };

  return (
    <div className="mt-2 mb-1">
      {options.map((option, idx) => (
        <Button
          key={idx}
          variant="ghost"
          className="w-full my-2 flex justify-start gap-2"
          onClick={option.name === "Logout" ? handleLogout : undefined}
        >
          <option.Icon />
          {option.name}
        </Button>
      ))}
    </div>
  );
};

export default SideBarFooter;
