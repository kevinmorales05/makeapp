"use client";

import { useCallback, useEffect, useState, Fragment, useRef } from "react";
import {
  AiOutlineMenu,
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineClose,
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
            sm:block
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
          sm:block
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
        {/* <div
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
          justify-center
          gap-3 
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          "
        >
          {isOpen ?
            <AiOutlineClose className="animation" />
            : <AiOutlineMenu />}
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div> */}
        <Menu as="div"
          className="
          p-4
          md:py-2

          md:px-2
          border-[1px] 
          hover:text-red-dark
          hover:bg-red-dark/10
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
            // className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            className="flex items-center"
          >
            {isOpen ?
              <AiOutlineClose />
              : <AiOutlineMenu />}
            <div className="hidden md:block">
              <Avatar src={currentUser?.image} />
            </div>
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
              className="
              absolute right-0 mt-2 w-56 origin-top-right 
              // divide-y divide-gray-100 
              rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
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
                            <MenuItem label={it.label} onClick={() => { toggleOpen(); it.onClick(); }} icon={it.icon} />
                          </> :
                            <MenuItem label={it.label} onClick={() => { toggleOpen(); it.onClick(); }} icon={it.icon} />
                          }
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      <MenuItem label="Login" onClick={() => { toggleOpen(); loginModal.onOpen(); }} icon={LuLogIn} />
                      <MenuItem label="Sign up" onClick={() => { toggleOpen(); registerModal.onOpen(); }} icon={LuUserPlus} />
                    </>
                  )}
                </div>
              </div>
              {/* <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      {active ? (
                        <EditActiveIcon
                          className="mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                      ) : (
                        <EditInactiveIcon
                          className="mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                      )}
                      Edit
                    </button>
                  )}
                </Menu.Item> */}
            </Menu.Items>
          </Transition>

        </Menu>
      </div>
      {/* {isOpen && (
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
                      <MenuItem label={it.label} onClick={() => { toggleOpen(); it.onClick(); }} icon={it.icon} />
                    </> :
                      <MenuItem label={it.label} onClick={() => { toggleOpen(); it.onClick(); }} icon={it.icon} />
                    }
                  </div>
                ))}
              </>
            ) : (
              <>
                <MenuItem label="Login" onClick={() => { toggleOpen(); loginModal.onOpen(); }} icon={LuLogIn} />
                <MenuItem label="Sign up" onClick={() => { toggleOpen(); registerModal.onOpen(); }} icon={LuUserPlus} />
              </>
            )}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default UserMenu;

function EditInactiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
    </svg>
  )
}

function EditActiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
    </svg>
  )
}

function DuplicateInactiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 4H12V12H4V4Z"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
      <path
        d="M8 8H16V16H8V8Z"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
    </svg>
  )
}

function DuplicateActiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 4H12V12H4V4Z"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
      <path
        d="M8 8H16V16H8V8Z"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
    </svg>
  )
}

function ArchiveInactiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="8"
        width="10"
        height="8"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
      <rect
        x="4"
        y="4"
        width="12"
        height="4"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
      <path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  )
}

function ArchiveActiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="8"
        width="10"
        height="8"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
      <rect
        x="4"
        y="4"
        width="12"
        height="4"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
      <path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  )
}

function MoveInactiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 4H16V10" stroke="#A78BFA" strokeWidth="2" />
      <path d="M16 4L8 12" stroke="#A78BFA" strokeWidth="2" />
      <path d="M8 6H4V16H14V12" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  )
}

function MoveActiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 4H16V10" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M16 4L8 12" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M8 6H4V16H14V12" stroke="#C4B5FD" strokeWidth="2" />
    </svg>
  )
}

function DeleteInactiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="6"
        width="10"
        height="10"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
      <path d="M3 6H17" stroke="#A78BFA" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  )
}

function DeleteActiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="6"
        width="10"
        height="10"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
      <path d="M3 6H17" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#C4B5FD" strokeWidth="2" />
    </svg>
  )
}

