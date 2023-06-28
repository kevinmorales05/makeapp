'use client';
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
    <div
      onClick={onClick}
      className={`
        px-4 
        py-3 
        transition
        font-semibold
        hover:bg-red-dark/10
        hover:text-red-dark
        ${label.startsWith("Logout") || label.startsWith('Sign') ? "hover:bg-secondary-dark/10  hover:text-secondary-dark" : ""}


      `}
    >
      <Icon size={26} className={`${label.startsWith("Logout") ? "rotate-180" : ""
        } inline-flex mr-2`} /> <span>{label}</span>
    </div>
  );
}

export default MenuItem;