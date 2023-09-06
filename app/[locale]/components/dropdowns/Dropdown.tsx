import { Dropdown as DropdownUI, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection } from "@nextui-org/react";

export interface IDropdownProps {
  variant: "solid" | "bordered" | "light" | "flat" | "faded" | "shadow",
  ariaLabel: string,
  sections: IDropdownSectionProps[],
  disabledKeys?: string[]
}

export interface IDropdownItemProps {
  title: string,
  description: string,
  startContent: React.ReactNode,
  color: "primary" | "danger" | "default" | "secondary" | "success" | "warning" | undefined,
  className?: string,
  shortcut?: string,
  xkey: string,
  onClick: () => void
}

export interface IDropdownSectionProps {
  title: string,
  showDivider?: boolean,
  xkey: string,
  content: IDropdownItemProps[]

}

export default function Dropdown({ trigger, items }: { trigger: React.ReactNode, items: IDropdownProps }
) {
  return (
    <DropdownUI key={items.ariaLabel}>
      <DropdownTrigger >
        {trigger}
      </DropdownTrigger>
      <DropdownMenu variant={items.variant} aria-label={items.ariaLabel} disabledKeys={items.disabledKeys}>
        {items.sections.map(({ title, showDivider, content }) => (
          <DropdownSection key={title} title={title} showDivider={showDivider}>
            {content.map(({ startContent, ...item }) => (
              <DropdownItem
                key={item.xkey}
                shortcut={item.shortcut}
                onPress={item.onClick}
                description={item.description}
                startContent={startContent}
                color={item.color}
                className={item.className}
              >
                {item.title}
              </DropdownItem>
            ))}
          </DropdownSection>))}
      </DropdownMenu>
    </DropdownUI>
  );
}
