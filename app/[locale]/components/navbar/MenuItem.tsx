'use client';
import { Menu } from "@headlessui/react";
import { IconType } from "react-icons";

interface MenuItemProps {
  onClick: () => void;
  label: string;
  icon: IconType,
}

const MenuItem: React.FC<MenuItemProps> = ({
  onClick,
  label,
  icon: Icon,
}) => {
  return (
    <Menu.Item >
      {({ active }) => (
        <button
          onClick={onClick}
          className={`
          ${label.startsWith("Logout") || label.startsWith('Sign') ? "hover:bg-secondary-dark/10  hover:text-secondary-dark" : ""}
            ${active ? 'bg-red-dark/20 text-red-dark' : 'text-gray-900'
            } text-start group flex w-full items-center rounded-md px-2 py-2 text-sm`}
        >
          <Icon size={26} className={`${label.startsWith("Logout") ? "rotate-180" : ""
            } inline-flex mr-2`} /> <span>{label}</span>          </button>
      )}
    </Menu.Item>

  );
}

export default MenuItem;