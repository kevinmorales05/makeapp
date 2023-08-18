'use client'

import useCountries from "@/app/hooks/useCountries";
import { useLocale } from "next-intl"

import { Dropdown as DropdownUI, DropdownTrigger, DropdownMenu, DropdownItem, Button, User, Selection, dropdownMenu, cn, DropdownSection, Avatar } from "@nextui-org/react";
import React, { Key, SetStateAction } from "react";
import { US } from 'country-flag-icons/react/3x2'
import { EC } from 'country-flag-icons/react/3x2'
import { KR } from 'country-flag-icons/react/3x2'
import { useRouter } from 'next-intl/client';
import Dropdown from "../../dropdowns/Dropdown";
import { IconType } from "react-icons";
import { RiFileSettingsFill, RiUserReceivedFill } from "react-icons/ri";
import { BsHousesFill } from "react-icons/bs";
import { LuIceCream, LuLogIn, LuLogOut, LuUserPlus } from "react-icons/lu";
import { FaHandsHelping } from "react-icons/fa";


export interface ItemsDropdowns {
  children?: React.ReactNode,
  key?: string,
  className?: string,
  isIcon?: boolean,
  icon?: IconType | any,
  onclick?: () => void
}

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
  key: string,
  onClick: () => void
}

export interface IDropdownSectionProps {
  title: string,
  showDivider?: boolean,
  key: string,
  content: IDropdownItemProps[]

}

const iconClasses: string = "text-xl text-default-500 pointer-events-none flex-shrink-0";

function I18nWidget() {
  const locale = useLocale();
  console.log('locales contains:', locale)
  const { getByFlag } = useCountries()
  const router = useRouter()
  let Flag = getByFlag(locale)

  const [selectedKeys, setSelectedKeys] = React.useState(new Set<string>(["new"]));
  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );


  const trigger = (<Button size="sm" startContent={<Flag />} isIconOnly variant="light" aria-label={locale} />
  )

  const items = [
    {
      children: "Español",
      key: "es",
      isIcon: true,
      icon: EC,
      onclick: () => router.push('/', { locale: 'es' })
    },
    {
      children: "Ingles",
      key: "en",
      isIcon: true,
      icon: US,
      onclick: () => router.push('/', { locale: 'en' })
    },
    {
      children: "Coreano",
      key: "ko",
      isIcon: true,
      icon: KR,
      onclick: () => router.push('/', { locale: 'ko' })
    },
  ];

  const dropdownmenu = {
    ariaLabel: "Language Actions",
    variant: "flat",
    disallowEmptySelection: true,
    defaultSelectedKeys: locale,
    disabledKeys: locale,
    selectionMode: "single"
  }

  const sectionsMenuProps: IDropdownProps = {
    variant: "bordered",
    ariaLabel: "Dropdown menu with description",
    sections: [
      {
        title: "Actions", showDivider: true, key: "actions",
        content: [{
          title: "New file",
          description: "Create a new file",
          startContent: <AddNoteIcon className={iconClasses} />,
          color: "primary",
          shortcut: "⌘C",
          key: "new",
          onClick: () => alert('well you push new file')
        },
        {
          title: "New file",
          description: "Create a new file",
          startContent: <CopyDocumentIcon className={iconClasses} />,
          color: "primary",
          shortcut: "⌘C",
          key: "copy",
          onClick: () => alert('well you push new file')
        },
        {
          title: "Edit file",
          description: "Allows you to edit the file",
          startContent: <EditDocumentIcon className={iconClasses} />,
          color: "primary",
          shortcut: "⌘C",
          key: "edit",
          onClick: () => alert('well you push new file')
        },]
      }, {
        title: "Danger Zone", showDivider: false, key: "danger zone", content: [
          {
            title: "delete file",
            description: "Create a new file",
            color: "danger",
            className: "text-danger",
            startContent: <DeleteDocumentIcon className={cn(iconClasses, "text-violet-800 hover:text-white")} />,
            shortcut: "⌘C",
            key: "delete",
            onClick: () => alert('well you push new file')
          },
        ]
      }]
  }


  const sectionI18n: IDropdownProps = {
    variant: "flat",
    ariaLabel: "Language Actions",
    sections: [
      {
        title: "Choose a language",
        key: "Languages",
        content: [
          {
            title: "Español",
            description: "",
            key: "es",
            color: "danger",
            onClick: () => router.push('/', { locale: 'en' }),
            startContent: <Button size="sm" variant="light" startContent={<EC className={iconClasses} />} isIconOnly />,
          },
          {
            title: "Ingles",
            description: "Cambiar a Ingles",
            key: "en",
            color: "danger",
            onClick: () => router.push('/', { locale: 'en' }),
            startContent: <Button size="sm" variant="light" startContent={<US className={iconClasses} />} isIconOnly />,
          },
          {
            title: "Coreano",
            description: "Cambiar a Coreano",
            key: "ko",
            color: "danger",
            onClick: () => router.push('/', { locale: 'ko' }),
            startContent: <Button size="sm" variant="light" startContent={<KR className={iconClasses} />} isIconOnly />,
          }
        ]
      }]
  }

  const triggerMenu = (
    <Avatar isBordered={true}
      src='/img/placeholder.jpg' />
  )

  const sectionsMenu: IDropdownProps = {
    variant: "bordered",
    ariaLabel: "User Menu Actions",
    disabledKeys: ["signed_in_as"],
    sections: [
      {
        title: "My profile",
        key: "my_profile",
        showDivider: true,
        content: [
          {
            key: "signed_in_as",
            title: "Signed in as",
            description: "aguilakrakatoa@gmail.com",
            color: "primary",
            onClick: () => alert("signed_in_as"),
            startContent: <></>,
            className: "h-14 gap-2 font-bold opacity-90",
          },
          {
            key: "my_invoices",
            title: "My invoices",
            description: "See my invoices pendent",
            color: "primary",
            onClick: () => alert("my_invoices"),
            startContent: <Button size="sm" variant="light" startContent={<RiUserReceivedFill className={iconClasses} />} isIconOnly />,
          },
          {
            key: "my_curiosities",
            title: "My curiosities",
            description: "Discover my amazing beauty products",
            color: "primary",
            onClick: () => alert("signed_in_as"),
            startContent: <Button size="sm" variant="light" startContent={<BsHousesFill className={iconClasses} />} isIconOnly />,
          },
          {
            key: "korean_cosmetic_your_home",
            title: "Korean Cosmetic your home",
            description: "See some tips for my beauty",
            color: "primary",
            onClick: () => alert("korean_cosmetic_your_home"),
            startContent: <Button size="sm" variant="light" startContent={<LuIceCream className={iconClasses} />} isIconOnly />,
          }
        ]
      },
      {
        title: "Discover more",
        key: "disvover_more",
        content: [
          {
            key: "log_out",
            title: "Log Out",
            description: "Goint out of my account",
            color: "danger",
            onClick: () => alert("log_out"),
            startContent: <Button size="sm" variant="light" startContent={<LuLogOut className={cn(iconClasses, "rotate-180")} />} isIconOnly />,
          },
          {
            key: "configurations",
            title: "Configurations",
            description: "Manage my account",
            color: "danger",
            onClick: () => alert("configurations"),
            startContent: <Button size="sm" variant="light" startContent={<RiFileSettingsFill className={iconClasses} />} isIconOnly />,
          },
          {
            key: "help_and_feedback",
            title: "Help & Feedback",
            description: "Help to improve this application",
            color: "danger",
            onClick: () => alert("help_and_feedback"),
            startContent: <Button size="sm" variant="light" startContent={<FaHandsHelping className={iconClasses} />} isIconOnly />,
          },

        ]
      }
    ]
  }

  const sectionsGuest: IDropdownProps = {
    variant: "bordered",
    ariaLabel: "User Guest Menu Actions",
    disabledKeys: ["signed_in_as"],
    sections: [
      {
        key: "my_profile",
        title: "Welcome",
        showDivider: false,
        content: [
          {
            key: "login",
            title: "Login",
            description: "Enter to your account",
            color: "primary",
            onClick: () => alert("login"),
            startContent: <Button size="sm" variant="light" startContent={<LuLogIn className={iconClasses} />} isIconOnly />,
          },
          {
            key: "sign_up",
            title: "Sign Up",
            description: "Register to my new account",
            color: "primary",
            onClick: () => alert("sign_up"),
            startContent: <Button size="sm" variant="light" startContent={<LuUserPlus className={iconClasses} />} isIconOnly />,
          },
        ]
      }
    ]
  }
  return (
    <div className='fixed top-0 right-1 md:top-1 md:right-3'>
      <DropdownUI>
        <DropdownTrigger>
          <Button size="sm" startContent={<Flag />} isIconOnly variant="light" aria-label={locale} />
        </DropdownTrigger>
        <DropdownMenu
          variant="flat"
          disallowEmptySelection
          defaultSelectedKeys={[locale]}
          disabledKeys={[locale]}
          selectionMode="single"
          // selectedKeys={selectedKeys}
          // onSelectionChange={(keys: Selection | React.Key[] | any): void => setSelectedKeys(keys)}
          items={items}
        >
          {(item: ItemsDropdowns) => (
            <DropdownItem
              key={item.key}
              color={item.key === locale ? "default" : "danger"}
              className={item.key === locale ? "text-danger" : ""}
              onPress={item.onclick}
              startContent={<Button size="sm" startContent={<item.icon className={iconClasses} />} isIconOnly variant="light" aria-label={locale} />}
            >
              {item.children}
            </DropdownItem>
          )}
        </DropdownMenu>
      </DropdownUI>
      <Dropdown items={items} trigger={trigger} propsMenu={dropdownmenu} />

      <hr />
      <DropdownUI>
        <DropdownTrigger>
          <Button
            variant="bordered"
          >
            Open Menu
          </Button>
        </DropdownTrigger>
        <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
          <DropdownSection title="Actions" showDivider>
            <DropdownItem
              key="new"
              shortcut="⌘N"
              description="Create a new file"
              startContent={<AddNoteIcon className={iconClasses} />}
            >
              New file
            </DropdownItem>
            <DropdownItem
              key="copy"
              shortcut="⌘C"
              description="Copy the file link"
              startContent={<CopyDocumentIcon className={iconClasses} />}
            >
              Copy link
            </DropdownItem>
            <DropdownItem
              key="edit"
              shortcut="⌘⇧E"
              description="Allows you to edit the file"
              startContent={<EditDocumentIcon className={iconClasses} />}
            >
              Edit file
            </DropdownItem>
          </DropdownSection>
          <DropdownSection title="Danger zone">
            <DropdownItem
              key="delete"
              className="text-danger"
              color="danger"
              shortcut="⌘⇧D"
              description="Permanently delete the file"
              startContent={<DeleteDocumentIcon className={cn(iconClasses, "text-danger")} />}
            >
              Delete file
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </DropdownUI>



      <DropdownUI>
        <DropdownTrigger>
          <Button
            variant="bordered"
          >
            {selectedValue}
          </Button>
        </DropdownTrigger>
        <DropdownMenu variant={sectionsMenuProps.variant} aria-label={sectionsMenuProps.ariaLabel}
          selectionMode="single"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
          defaultSelectedKeys={selectedValue}

        >
          {sectionsMenuProps.sections.map(({ title, showDivider, content }) => (
            <DropdownSection key={title} title={title} showDivider={showDivider}>
              {content.map(({ startContent, ...item }) => (
                <DropdownItem
                  key={item.key}
                  shortcut={item.shortcut}
                  onPress={item.onClick}
                  description={item.description}
                  startContent={startContent}
                  color={item.color}
                  className={"className" in item ? item.className : ""}
                >
                  {item.title}
                </DropdownItem>
              ))}
            </DropdownSection>))}


        </DropdownMenu>

        after there

      </DropdownUI>

      <DropdownUI>
        <DropdownTrigger>
          <Button
            variant="bordered"
          >
            {selectedValue}
          </Button>
        </DropdownTrigger>
        <DropdownMenu variant={sectionI18n.variant} aria-label={sectionI18n.ariaLabel}
          selectionMode="single"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
          defaultSelectedKeys={selectedValue}

        >
          {sectionI18n.sections.map(({ title, showDivider, content }) => (
            <DropdownSection key={title} title={title} showDivider={showDivider}>
              {content.map(({ startContent, ...item }) => (
                <DropdownItem
                  key={item.key}
                  shortcut={item.shortcut}
                  onPress={item.onClick}
                  description={item.description}
                  startContent={startContent}
                  color={item.color}
                  className={"className" in item ? item.className : ""}
                >
                  {item.title}
                </DropdownItem>
              ))}
            </DropdownSection>))}
        </DropdownMenu>
      </DropdownUI>

      <DropdownUI>
        <DropdownTrigger>
          {triggerMenu}
        </DropdownTrigger>
        <DropdownMenu variant={sectionsMenu.variant} aria-label={sectionsMenu.ariaLabel}
          disabledKeys={sectionsMenu.disabledKeys}
          selectionMode="single"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
          defaultSelectedKeys={selectedValue}
        >
          {sectionsMenu.sections.map(({ title, showDivider, content }) => (
            <DropdownSection key={title} title={title} showDivider={showDivider}>
              {content.map(({ startContent, ...item }) => (
                <DropdownItem
                  key={item.key}
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


      <DropdownUI>
        <DropdownTrigger>
          {triggerMenu}
        </DropdownTrigger>
        <DropdownMenu variant={sectionsGuest.variant} aria-label={sectionsGuest.ariaLabel}
          selectionMode="single"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
          defaultSelectedKeys={selectedValue}
        >
          {sectionsGuest.sections.map(({ title, showDivider, content }) => (
            <DropdownSection key={title} title={title} showDivider={showDivider}>
              {content.map(({ startContent, ...item }) => (
                <DropdownItem
                  key={item.key}
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

    </div>
  )
}

export default I18nWidget

export const AddNoteIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M7.37 22h9.25a4.87 4.87 0 0 0 4.87-4.87V8.37a4.87 4.87 0 0 0-4.87-4.87H7.37A4.87 4.87 0 0 0 2.5 8.37v8.75c0 2.7 2.18 4.88 4.87 4.88Z"
      fill="currentColor"
      opacity={0.4}
    />
    <path
      d="M8.29 6.29c-.42 0-.75-.34-.75-.75V2.75a.749.749 0 1 1 1.5 0v2.78c0 .42-.33.76-.75.76ZM15.71 6.29c-.42 0-.75-.34-.75-.75V2.75a.749.749 0 1 1 1.5 0v2.78c0 .42-.33.76-.75.76ZM12 14.75h-1.69V13c0-.41-.34-.75-.75-.75s-.75.34-.75.75v1.75H7c-.41 0-.75.34-.75.75s.34.75.75.75h1.81V18c0 .41.34.75.75.75s.75-.34.75-.75v-1.75H12c.41 0 .75-.34.75-.75s-.34-.75-.75-.75Z"
      fill="currentColor"
    />
  </svg>
);
export const CopyDocumentIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M15.5 13.15h-2.17c-1.78 0-3.23-1.44-3.23-3.23V7.75c0-.41-.33-.75-.75-.75H6.18C3.87 7 2 8.5 2 11.18v6.64C2 20.5 3.87 22 6.18 22h5.89c2.31 0 4.18-1.5 4.18-4.18V13.9c0-.42-.34-.75-.75-.75Z"
      fill="currentColor"
      opacity={0.4}
    />
    <path
      d="M17.82 2H11.93C9.67 2 7.84 3.44 7.76 6.01c.06 0 .11-.01.17-.01h5.89C16.13 6 18 7.5 18 10.18V16.83c0 .06-.01.11-.01.16 2.23-.07 4.01-1.55 4.01-4.16V6.18C22 3.5 20.13 2 17.82 2Z"
      fill="currentColor"
    />
    <path
      d="M11.98 7.15c-.31-.31-.84-.1-.84.33v2.62c0 1.1.93 2 2.07 2 .71.01 1.7.01 2.55.01.43 0 .65-.5.35-.8-1.09-1.09-3.03-3.04-4.13-4.16Z"
      fill="currentColor"
    />
  </svg>
);

export const EditDocumentIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M15.48 3H7.52C4.07 3 2 5.06 2 8.52v7.95C2 19.94 4.07 22 7.52 22h7.95c3.46 0 5.52-2.06 5.52-5.52V8.52C21 5.06 18.93 3 15.48 3Z"
      fill="currentColor"
      opacity={0.4}
    />
    <path
      d="M21.02 2.98c-1.79-1.8-3.54-1.84-5.38 0L14.51 4.1c-.1.1-.13.24-.09.37.7 2.45 2.66 4.41 5.11 5.11.03.01.08.01.11.01.1 0 .2-.04.27-.11l1.11-1.12c.91-.91 1.36-1.78 1.36-2.67 0-.9-.45-1.79-1.36-2.71ZM17.86 10.42c-.27-.13-.53-.26-.77-.41-.2-.12-.4-.25-.59-.39-.16-.1-.34-.25-.52-.4-.02-.01-.08-.06-.16-.14-.31-.25-.64-.59-.95-.96-.02-.02-.08-.08-.13-.17-.1-.11-.25-.3-.38-.51-.11-.14-.24-.34-.36-.55-.15-.25-.28-.5-.4-.76-.13-.28-.23-.54-.32-.79L7.9 10.72c-.35.35-.69 1.01-.76 1.5l-.43 2.98c-.09.63.08 1.22.47 1.61.33.33.78.5 1.28.5.11 0 .22-.01.33-.02l2.97-.42c.49-.07 1.15-.4 1.5-.76l5.38-5.38c-.25-.08-.5-.19-.78-.31Z"
      fill="currentColor"
    />
  </svg>
);


export const DeleteDocumentIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M21.07 5.23c-1.61-.16-3.22-.28-4.84-.37v-.01l-.22-1.3c-.15-.92-.37-2.3-2.71-2.3h-2.62c-2.33 0-2.55 1.32-2.71 2.29l-.21 1.28c-.93.06-1.86.12-2.79.21l-2.04.2c-.42.04-.72.41-.68.82.04.41.4.71.82.67l2.04-.2c5.24-.52 10.52-.32 15.82.21h.08c.38 0 .71-.29.75-.68a.766.766 0 0 0-.69-.82Z"
      fill="currentColor"
    />
    <path
      d="M19.23 8.14c-.24-.25-.57-.39-.91-.39H5.68c-.34 0-.68.14-.91.39-.23.25-.36.59-.34.94l.62 10.26c.11 1.52.25 3.42 3.74 3.42h6.42c3.49 0 3.63-1.89 3.74-3.42l.62-10.25c.02-.36-.11-.7-.34-.95Z"
      fill="currentColor"
      opacity={0.399}
    />
    <path
      clipRule="evenodd"
      d="M9.58 17a.75.75 0 0 1 .75-.75h3.33a.75.75 0 0 1 0 1.5h-3.33a.75.75 0 0 1-.75-.75ZM8.75 13a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1-.75-.75Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);



