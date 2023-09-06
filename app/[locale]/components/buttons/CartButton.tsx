'use client';

import { AiFillHeart, AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";

import useCart, { ICartItemState } from "@/app/hooks/useCart";
import { SafeUser } from "@/app/types";
import { motion } from "framer-motion"
import ClientOnly from "../ClientOnly";
import { IProductFormatted } from "../../hooks/useProducts";
import Button from "./Button";
import { MdShoppingCart } from "react-icons/md";
import { useRouter } from "next/navigation";

interface CartButtonProps {
  listing: ICartItemState,
  currentUser?: SafeUser | null,
  locale: string
}

const CartButton: React.FC<CartButtonProps> = ({
  listing,
  currentUser,
  locale
}) => {
  const { hasCarted, toggleCart } = useCart({
    listing,
    currentUser, locale
  });
  const router = useRouter();

  return (
    <motion.div
      onClick={!hasCarted ? toggleCart : () => router.push(`/${locale}/carts`)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="
        relative
        hover:opacity-80
        transition
        cursor-pointer
      "
    >
      {!hasCarted &&
        <Button
          small
          icon={AiOutlineShoppingCart}
          outline
          className="flex justify-center items-center gap-2"
          label="Add cart"
          onClick={() => { }}
        // onClick={() => toggleCart()}
        />
      }
      {hasCarted &&
        <Button
          small
          icon={MdShoppingCart}
          className="flex justify-center items-center gap-2"
          label="See in cart"
          onClick={() => { }}
        // onClick={() => router.push(`/${locale}/carts`)}
        />
      }
    </motion.div>
  );
}

export default CartButton;