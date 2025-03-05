import { useState } from "react";
import { User, Settings, LogOut } from "lucide-react";
import { Dropdown } from "../ui/Dropdown";
import { DropdownItem } from "../ui/DropdownItem";

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);

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
          John Doe
        </span>
      </button>

      <Dropdown isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <DropdownItem onClick={() => console.log("Profile clicked")}>
          Profile
        </DropdownItem>
        <DropdownItem onClick={() => (window.location.href = "/settings")}>
          <div className="flex items-center">
            <Settings size={16} className="mr-2" />
            Settings
          </div>
        </DropdownItem>
        <div className="border-t border-gray-100 my-1" />
        <DropdownItem
          onClick={() => {
            localStorage.removeItem("access");
            window.location.href = "/login";
          }}
        >
          <div className="flex items-center text-red-600">
            <LogOut size={16} className="mr-2" />
            Logout
          </div>
        </DropdownItem>
      </Dropdown>
    </div>
  );
}
