import { useState } from "react";
import { User, Settings, LogOut } from "lucide-react";
import { Dropdown } from "../ui/Dropdown";
import { DropdownItem } from "../ui/DropdownItem";

export interface DropdownItemProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // Config object for dropdown items
  const menuConfig = [
    {
      label: "Profile",
      icon: <User size={16} className="mr-2" />,
      onClick: () => console.log("Profile clicked"),
    },
    {
      label: "Settings",
      icon: <Settings size={16} className="mr-2" />,
      onClick: () => (window.location.href = "/settings"),
    },
    {
      label: "Logout",
      icon: <LogOut size={16} className="mr-2" />,
      onClick: () => {
        localStorage.removeItem("access");
        window.location.href = "/login";
      },
      className: "text-red-600", // optional styling for specific items
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2"
      >
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
          <User size={20} className="text-gray-600" />
        </div>
        <span className="text-sm font-medium text-gray-700 hidden md:block">
          Nayan Jaiswal
        </span>
      </button>

      <Dropdown isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {menuConfig.map((item, index) => (
          <div key={index}>
            <DropdownItem
              onClick={item.onClick}
              className={item.className || ""}
            >
              <div className="flex items-center">
                {item.icon}
                {item.label}
              </div>
            </DropdownItem>
            {index === 1 && <div className="border-t border-gray-100 my-1" />}
          </div>
        ))}
      </Dropdown>
    </div>
  );
}
