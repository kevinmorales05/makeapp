"use client";

import { useCallback, useEffect, useState, Fragment, useRef } from "react";
import {
  AiOutlineMenu,
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineClose,
} from "react-icons/ai";
import { RiArrowDownSLine, RiArrowDropDownLine, RiUserReceivedFill } from "react-icons/ri";
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

import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'


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
            hidden
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
          hidden
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
        <Menu as="div"
          className="  
          px-2
          py-3
          border-[1px] 
          flex 
          flex-row 
          items-center 
          justify-center
          gap-2
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          "
        >
          <Menu.Button
            className="flex items-center"
          >
            <div>
              <Avatar src={currentUser?.image} />
            </div>
            <RiArrowDownSLine />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
            //   className="
            // absolute right-0 mt-[330px] w-56 origin-top-right rounded-md
            // bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              className="
            absolute 
            rounded-xl 
            shadow-xl
            //w-[40vw]
            w-56
            bg-white 
            overflow-hidden 
            right-0 
            top-12 
            text-sm
            ring-1 ring-black ring-opacity-5 focus:outline-none
          ">
              <div className="px-1 py-1 ">
                <>
                  {currentUser ? (
                    <>
                      {
                        menuItems.map((it: any) => (
                          <div key={it.label}>
                            {it.label.startsWith("Logout") ? <>
                              <hr />
                              <MenuItem label={it.label} onClick={it.onClick} icon={it.icon} />
                            </> :
                              <MenuItem label={it.label} onClick={it.onClick} icon={it.icon} />
                            }
                          </div>
                        ))
                      }
                    </>
                  ) : <>
                    <MenuItem label="Login" onClick={loginModal.onOpen} icon={LuLogIn} />
                    <MenuItem label="Sign up" onClick={registerModal.onOpen} icon={LuUserPlus} /></>}
                </>
              </div>
            </Menu.Items>
          </Transition>

        </Menu>
      </div>
    </div>
  );
};

export default UserMenu;

