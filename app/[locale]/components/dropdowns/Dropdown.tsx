import React from "react";
import { Dropdown as DropdownUI, DropdownTrigger, DropdownMenu, DropdownItem, Button, Avatar, User } from "@nextui-org/react";
import { US } from 'country-flag-icons/react/3x2'
import { EC } from 'country-flag-icons/react/3x2'
import { KR } from 'country-flag-icons/react/3x2'
import { IconType } from "react-icons";


export interface ItemsDropdown {
  children: React.ReactNode,
  key: string,
  className?: string,
  isIcon: boolean,
  icon?: IconType | any,
  onclick: () => void
}
interface PropsMenu {
  ariaLabel?: string
  variant?: string
  disallowEmptySelection?: boolean
  defaultSelectedKeys?: string
  disabledKeys?: string
  selectionMode?: string
}

interface DropdownProps {
  trigger: React.ReactNode | string,
  items: ItemsDropdown[],
  propsMenu: PropsMenu

}

export default function Dropdown({ trigger, items, propsMenu }: DropdownProps
) {

  const { ariaLabel } = propsMenu
  const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

  return (
    <div className="flex items-center gap-4">
      <DropdownUI placement="bottom-end">
        <DropdownTrigger>
          {trigger}
        </DropdownTrigger>
        <DropdownMenu aria-label={ariaLabel} variant="flat" items={items}
          
        >
          {({ icon: Icon, ...item }: any) => (
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
          )}
          {/* {({ icon: Icon, ...item }) => {(
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
          )}} */}
        </DropdownMenu>
      </DropdownUI>

    </div >
  );
}
