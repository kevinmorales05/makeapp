'use client'
import { IDropdownProps } from "./Dropdown";
import { Dropdown as DropdownUI, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection } from "@nextui-org/react";

import { usePathname, useRouter } from 'next-intl/client';
import { useLocale, useTranslations } from "next-intl"

function I18nDropdown({ trigger, items }: { trigger: React.ReactNode, items: IDropdownProps }) {
  const t = useTranslations('LocaleSwitcher')
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const onLocaleChange = (e: React.ChangeEvent<HTMLSelectElement> | { currentKey: string } | any) => {
    const newLocale: string = e["currentKey"];
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <div className='fixed top-0 right-1 lg:top-1 lg:right-3'>
      <DropdownUI>
        <DropdownTrigger>
          {trigger}
        </DropdownTrigger>
        <DropdownMenu variant={items.variant} aria-label={items.ariaLabel}
          selectionMode="single"
          onSelectionChange={(e) => onLocaleChange(e)}
          defaultSelectedKeys={[locale]}
        >
          {items.sections.map(({ title, showDivider, content, xkey }) => (
            <DropdownSection key={xkey} title={t('titleModal')}
              showDivider={showDivider}>
              {content.map(({ startContent, ...item }) => (
                <DropdownItem
                  key={item.xkey}
                  shortcut={item.shortcut}
                  description={t('description', { locale: item.xkey })}
                  startContent={startContent}
                  color={item.color}
                  className={item.className}
                >
                  {t('title', { locale: item.xkey })}
                </DropdownItem>
              ))}
            </DropdownSection>))}
        </DropdownMenu>
      </DropdownUI>
    </div>
  )
}
export default I18nDropdown