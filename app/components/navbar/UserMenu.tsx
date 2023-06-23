"use client";

import { useCallback, useState } from "react";
import {
  AiOutlineMenu,
  AiOutlineShoppingCart,
  AiOutlineHeart,
} from "react-icons/ai";
import { RiUserReceivedFill } from "react-icons/ri";
import { LuIceCream, LuLogIn, LuLogOut, LuUserPlus } from "react-icons/lu";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useRentModal from "@/app/hooks/useRentModal";
import { SafeUser } from "@/app/types";

import MenuItem from "./MenuItem";
import Avatar from "../Avatar";
import { BsHousesFill } from "react-icons/bs";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();

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
  const menuItems = [{
    label: "My shoppings",
    onClick: () => router.push("/trips"),
    icon: AiOutlineShoppingCart,
  },
  {
    label: "My favorites",
    onClick: () => router.push("/favorites"),
    icon: AiOutlineHeart,
  },
  {
    label: "My invoices",
    onClick: () => router.push("/reservations"),
    icon: RiUserReceivedFill,
  },
  {
    label: "My properties",
    onClick: () => router.push("/properties"),
    icon: BsHousesFill,
  },
  {
    label: "Korean Cosmetic your home",
    onClick: rentModal.onOpen,
    icon: LuIceCream,
  },
  {
    label: "Logout",
    onClick: () => signOut(),
    icon: LuLogOut,
  },
  ]

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => router.push("/favorites")}
          className="
            md:block
            text-sm 
            font-bold
            py-3 
            px-4 
            rounded-full 
          hover:text-red-dark
          hover:bg-red-dark/10
            transition 
            cursor-pointer
          "
        >
          <AiOutlineHeart size={30} />
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
            text-secondary-800"
          >
            12
          </span>
        </div>
        <div
          onClick={() => router.push("/trips")}
          className="
          md:block
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
            text-secondary-800"
          >
            12
          </span>
        </div>
        <div
          onClick={toggleOpen}
          className="
          p-4
          md:py-1
          md:px-2
          border-[1px] 
          hover:text-red-dark
          hover:bg-red-dark/10
          flex 
          flex-row 
          items-center 
          gap-3 
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="
            absolute 
            rounded-xl 
            shadow-md
            w-[40vw]
            md:w-3/4 
            bg-white 
            overflow-hidden 
            right-0 
            top-12 
            text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                {menuItems.map(it => (
                  <div key={it.label}>
                    {it.label.startsWith("Logout") ? <>
                      <hr />
                      <MenuItem label={it.label} onClick={it.onClick} icon={it.icon} />
                    </> :
                      <MenuItem label={it.label} onClick={it.onClick} icon={it.icon} />
                    }
                  </div>
                ))}
              </>
            ) : (
              <>
                  <MenuItem label="Login" onClick={loginModal.onOpen} icon={ LuLogIn} />
                <MenuItem label="Sign up" onClick={registerModal.onOpen } icon={ LuUserPlus}/>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
