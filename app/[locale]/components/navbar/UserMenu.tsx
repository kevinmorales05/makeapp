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
import { useLocale } from "next-intl";
import { FaHandsHelping } from "react-icons/fa";
import { ICON_CLASES_DROPDOWN } from "@/app/constants/constants";
import { useCartStore } from "@/app/hooks/useCart";
import { useFavoriteStore } from "@/app/hooks/useFavorite";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter()
  const locale = useLocale();
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
        title: "My profile",
        xkey: "my_profile",
        showDivider: true,
        content: [
          {
            xkey: "signed_in_as",
            title: "Signed in as",
            description: currentUser?.email || "",
            color: "primary",
            onClick: () => { alert("development") },
            startContent: <></>,
            className: "h-14 gap-2 font-bold opacity-90",
          },
          // {
          //   xkey: "my_invoices",
          //   title: "Profile",
          //   description: "See my personal profile",
          //   color: "primary",
          //   onClick: () => router.push("/profile", { locale }),
          //   startContent: <Button size="sm" variant="light" startContent={<RiUserReceivedFill className={ICON_CLASES_DROPDOWN} />} isIconOnly />,
          // },
          {
            xkey: "my_curiosities",
            title: "My favorites",
            description: "Place of your amazing and beauty products",
            color: "primary",
            onClick: () => router.push("/favorites", { locale }),
            startContent: <Button size="sm" variant="light" startContent={<BsHousesFill className={ICON_CLASES_DROPDOWN} />} isIconOnly />,
          },
          {
            xkey: "my_shopping_cart",
            title: "My shoppping cart",
            description: "See some my beauty choices",
            color: "primary",
            onClick: () => router.push("/cart", { locale }),
            startContent: <Button size="sm" variant="light" startContent={<LuIceCream className={ICON_CLASES_DROPDOWN} />} isIconOnly />,
          }
        ]
      },
      {
        title: "Discover more",
        xkey: "disvover_more",
        content: [
          {
            xkey: "log_out",
            title: "Log Out",
            description: "Goint out of my account",
            color: "danger",
            onClick: () => signOutAndClear(),
            startContent: <Button size="sm" variant="light" startContent={<LuLogOut className={cn(ICON_CLASES_DROPDOWN, "rotate-180")} />} isIconOnly />,
          },
          {
            xkey: "configurations",
            title: "Configurations",
            description: "Manage my account",
            color: "danger",
            onClick: () => alert("configurations"),
            startContent: <Button size="sm" variant="light" startContent={<RiFileSettingsFill className={ICON_CLASES_DROPDOWN} />} isIconOnly />,
          },
          {
            xkey: "help_and_feedback",
            title: "Help & Feedback",
            description: "Help to improve this application",
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
        title: "Welcome",
        showDivider: false,
        content: [
          {
            xkey: "login",
            title: "Login",
            description: "Enter to your account",
            color: "primary",
            onClick: () => loginModal.onOpen(),
            startContent: <Button size="sm" variant="light" startContent={<LuLogIn className={iconClasses} />} isIconOnly />,
          },
          {
            xkey: "sign_up",
            title: "Sign Up",
            description: "Register to my new account",
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
          hover:text-red-dark
          hover:bg-red-dark/10
            transition 
            cursor-pointer
          "
        >
          <AiOutlineHeart size={30} />
          {totalFavorite() !== 0 &&
            <span
              className="
          absolute
        bg-red-dark
        text-white
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
        hover:text-red-dark
        hover:bg-red-dark/10
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
                  bg-red-dark
                   text-white
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