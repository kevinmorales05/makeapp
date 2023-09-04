'use client';

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import useFavorite from "@/app/hooks/useFavorite";
import { SafeUser } from "@/app/types";
import { motion } from "framer-motion"
import ClientOnly from "../ClientOnly";
import { IProductFormatted } from "../../hooks/useProducts";

interface HeartButtonProps {
  listing: IProductFormatted,
  currentUser?: SafeUser | null
}

const HeartButton: React.FC<HeartButtonProps> = ({
  listing,
  currentUser
}) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    listing,
    currentUser
  });

  return (
    <motion.div
      onClick={toggleFavorite}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="
        relative
        hover:opacity-80
        transition
        cursor-pointer
      "
    >
      <AiOutlineHeart
        size={28}
        className="
          fill-white
          absolute
          -top-[2px]
          -right-[2px]
        "
      />
      <AiFillHeart
        size={24}
        className={
          hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'
          // ""
        }
      />
    </motion.div>
  );
}

export default HeartButton;