import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Avatar, User } from "@nextui-org/react";
import { US } from 'country-flag-icons/react/3x2'
import { EC } from 'country-flag-icons/react/3x2'
import { KR } from 'country-flag-icons/react/3x2'
import { IconType } from "react-icons";


interface itemsDropdown {
  children: React.ReactNode,
  key: string,
  className: string,
  isIcon: boolean,
  icon?: IconType | any,
  onclick: () => void
}

interface DropdownProps {
  trigger: React.ReactNode | string,
  items: itemsDropdown[]
}

export default function DropdownMain({ trigger, items }: DropdownProps
) {

  const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          {trigger}
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          {items.map(({ icon: Icon, ...item }) => (
            <DropdownItem key={item.key} className={item.className} color={item.key === "logout" || item.key === "sign_up" ? "danger" : "default"} onPress={item.onclick}
              startContent={item.isIcon ?
                <Button size="sm"
                  startContent={<Icon
                  className={iconClasses}
                  />}
                  isIconOnly
                  variant="light"
                  className={item.key === "logout" ? "rotate-180" : ""}
                  aria-label={item.key} /> : <></>
              }
            >
              {item.children}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>

    </div >
  );
}
