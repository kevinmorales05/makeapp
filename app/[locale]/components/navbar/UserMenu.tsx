"use client";

import { useCallback, useEffect, useState, Fragment, useRef } from "react";
import {
  AiOutlineMenu,
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineClose,
} from "react-icons/ai";
import { RiArrowDownSLine, RiArrowDropDownLine, RiFileSettingsFill, RiUserReceivedFill } from "react-icons/ri";
import { LuIceCream, LuLogIn, LuLogOut, LuUserPlus } from "react-icons/lu";

import { signOut } from "next-auth/react";
import { useRouter } from 'next-intl/client';

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useRentModal from "@/app/hooks/useRentModal";
import { SafeUser } from "@/app/types";

import { BsHousesFill } from "react-icons/bs";

import Dropdown, { IDropdownProps } from "../dropdowns/Dropdown";

import { Button, User, cn } from "@nextui-org/react";
import { useLocale, useTranslations } from "next-intl";
import { FaHandsHelping } from "react-icons/fa";
import { ICON_CLASES_DROPDOWN } from "@/app/constants/client_constants";
import { useCartStore } from "@/app/hooks/useCart";
import { useFavoriteStore } from "@/app/hooks/useFavorite";
import { TbFileInvoice } from "react-icons/tb";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter()
  const locale = useLocale();
  const t = useTranslations("navbar")
  const { totalCart } = useCartStore()
  const { totalFavorite } = useFavoriteStore()


  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const rentModal = useRentModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [loginModal, rentModal, currentUser]);

  const signOutAndClear = () => {
    useCartStore.persist.clearStorage()
    useFavoriteStore.persist.clearStorage()
    signOut()
  }

  const trigger = (<User
    as="button"
    avatarProps={{
      isBordered: true,
      src: currentUser?.image || '/img/placeholder.jpg'
    }}
    name={currentUser?.name}
    description={currentUser?.email}
    className="transition-transform"
    classNames={{
      name: "hidden truncate lg:block lg:max-w-[95px] xl:max-w-full",
      description: "hidden truncate lg:block lg:max-w-[95px] xl:max-w-full ",
    }}
  />)

  const sectionsMenu: IDropdownProps = {
    variant: "bordered",
    ariaLabel: "User Menu Actions",
    disabledKeys: ["signed_in_as"],
    sections: [
      {
        title: t("user_menu.section_profile.title"),
        xkey: "my_profile",
        showDivider: true,
        content: [
          {
            xkey: "signed_in_as",
            title: t("user_menu.section_profile.btns.signed.title"),
            description: currentUser?.email || "",
            color: "primary",
            onClick: () => { alert("development") },
            startContent: <></>,
            className: "h-14 gap-2 font-bold opacity-90",
          },
          // {
          //   xkey: "my_orders",
          //   title: "Profile",
          //   description: "See my personal profile",
          //   color: "primary",
          //   onClick: () => router.push("/profile", { locale }),
          //   startContent: <Button size="sm" variant="light" startContent={<RiUserReceivedFill className={ICON_CLASES_DROPDOWN} />} isIconOnly />,
          // },
          {
            xkey: "my_orders",
            title: t("user_menu.section_profile.btns.orders.title"),
            description: t("user_menu.section_profile.btns.orders.subtitle"),
            color: "primary",
            onClick: () => router.push("/orders", { locale }),
            startContent: <Button size="sm" variant="light" startContent={<RiUserReceivedFill className={ICON_CLASES_DROPDOWN} />} isIconOnly />,
          },
          {
            xkey: "log_out",
            title: t("user_menu.section_profile.btns.log_out.title"),
            description: t("user_menu.section_profile.btns.log_out.subtitle"),
            color: "danger",
            onClick: () => signOutAndClear(),
            startContent: <Button size="sm" variant="light" startContent={<LuLogOut className={cn(ICON_CLASES_DROPDOWN, "rotate-180")} />} isIconOnly />,
          },
          // {
          //   xkey: "my_shopping_cart",
          //   title: "My shoppping cart",
          //   description: "See some my beauty choices",
          //   color: "primary",
          //   onClick: () => router.push("/cart", { locale }),
          //   startContent: <Button size="sm" variant="light" startContent={<LuIceCream className={ICON_CLASES_DROPDOWN} />} isIconOnly />,
          // }
        ]
      },
      {
        xkey: "disvover_more",
        title: t("user_menu.section_feedback.title"),
        content: [

          // {
          //   xkey: "configurations",
          //   title: "Configurations",
          //   description: "Manage my account",
          //   color: "danger",
          //   onClick: () => alert("configurations"),
          //   startContent: <Button size="sm" variant="light" startContent={<RiFileSettingsFill className={ICON_CLASES_DROPDOWN} />} isIconOnly />,
          // },
          {
            xkey: "feedback",
            title: t("user_menu.section_feedback.btns.feedback.title"),
            description: t("user_menu.section_feedback.btns.feedback.subtitle"),
            color: "danger",
            onClick: () => alert("help_and_feedback"),
            startContent: <Button size="sm" variant="light" startContent={<FaHandsHelping className={ICON_CLASES_DROPDOWN} />} isIconOnly />,
          },

        ]
      }
    ]
  }

  const sectionGuest: IDropdownProps = {
    variant: "bordered",
    ariaLabel: "User Guest Menu Actions",
    sections: [
      {
        xkey: "my_profile",
        title: t("guest_menu.section_title"),
        showDivider: false,
        content: [
          {
            xkey: "login",
            title: t("guest_menu.btns.login.title"),
            description: t("guest_menu.btns.login.subtitle"),
            color: "primary",
            onClick: () => loginModal.onOpen(),
            startContent: <Button size="sm" variant="light" startContent={<LuLogIn className={iconClasses} />} isIconOnly />,
          },
          {
            xkey: "sign_up",
            title: t("guest_menu.btns.sign_up.title"),
            description: t("guest_menu.btns.sign_up.subtitle"),
            color: "primary",
            onClick: () => registerModal.onOpen(),
            startContent: <Button size="sm" variant="light" startContent={<LuUserPlus className={iconClasses} />} isIconOnly />,
          },
        ]
      }
    ]
  }
  return (
    <div className="relative">
      <div className="flex flex-row items-center sm:gap-3">
        <div
          onClick={() => router.push("/favorites", { locale })}
          className="
            block
            text-sm 
            font-bold
            py-3 
            sm:px-4 
            rounded-full 
          hover:text-primary-red
          hover:bg-primary-red/10
            transition 
            cursor-pointer
          "
        >
          <AiOutlineHeart size={30} />
          {totalFavorite() !== 0 &&
            <span
              className="
          absolute
        bg-primary-red
        text-primary-white
          bottom-0
          ml-4
          inline-block whitespace-nowrap rounded-full 
          px-[0.60em] 
          pb-[0.25em]
          pt-[0.35em]
          text-center 
          align-baseline 
          text-[.9em] 
          font-bold 
          leading-none 
          //text-secondary-800"
            >
              {totalFavorite()}
            </span>
          }

        </div>
        <div
          onClick={() => router.push("/carts", { locale })}
          className="
          block
          text-sm 
          font-bold 
          py-3 
          px-4 
        hover:text-primary-red
        hover:bg-primary-red/10
          rounded-full 
          transition 
          cursor-pointer
          "
        >
          <AiOutlineShoppingCart size={30} />
          {totalCart() !== 0 &&
            <span
              className="
                  absolute
                  bottom-0
                  bg-primary-red
                   text-primary-white
                    ml-4
                    inline-block whitespace-nowrap rounded-full 
                    px-[0.60em] 
                    pb-[0.25em]
                    pt-[0.35em]
                    text-center 
                    align-baseline 
                    text-[.9em] 
                    font-bold 
                    leading-none 
                    //text-secondary-800"
            >
              {totalCart()}
            </span>
          }


        </div>

        {currentUser ? (
          <Dropdown trigger={trigger} items={sectionsMenu} />
        ) : (
          <Dropdown trigger={trigger} items={sectionGuest} />
        )}

      </div>
    </div>
  );
};

export default UserMenu;