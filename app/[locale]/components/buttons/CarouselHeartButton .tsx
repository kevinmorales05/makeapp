'use client';

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import { useCarouselFavorite } from "@/app/hooks/useFavorite";
import { SafeUser } from "@/app/types";
import { motion } from "framer-motion"
import ClientOnly from "../ClientOnly";
import { IProductFormatted } from "../../hooks/useProducts";
import { Button } from "@nextui-org/react";

interface CarouselHeartButtonProps {
  listing: IProductFormatted,
  currentUser?: SafeUser | null
}

const CarouselHeartButton: React.FC<CarouselHeartButtonProps> = ({
  listing,
  currentUser
}) => {
  const { hasFavorited, toggleFavorite } = useCarouselFavorite({
    listing,
    currentUser
  });

  return (
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="
        relative
        hover:opacity-80
        transition
        cursor-pointer
      "
      >
        <Button onPress={toggleFavorite} isIconOnly radius="full" className="w-16 h-16 md:w-14 md:h-14 shadow-md text-white cursor-pointer transition-all duration-300 ease-linear group-hover:text-white bg-red-dark hover:opacity-80 transition-opacity">
          {hasFavorited ? <AiFillHeart className="w-8 h-8 md:w-6 md:h-6 text-white" /> : <AiOutlineHeart className="w-8 h-8 md:w-6 md:h-6 text-white" />}
        </Button>
      </motion.div >
  );
}

export default CarouselHeartButton;