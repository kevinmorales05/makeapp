'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { format } from 'date-fns';

import useCountries from "@/app/hooks/useCountries";
import {
  SafeListing,
  SafeReservation,
  SafeUser
} from "@/app/types";

import HeartButton from "../buttons/HeartButton";
import Button from "../buttons/Button";
import ClientOnly from "../ClientOnly";
import useFavorite, { useFavoriteStore } from "@/app/hooks/useFavorite";
import axios from "axios";
import { apix } from "@/app/constants/axios-instance";
import { useLocale } from "next-intl";

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null
};

const ListingCard: React.FC<ListingCardProps> = ({
  data: dataServer,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  currentUser,
}) => {
  const router = useRouter();

  const { currentFavorites } = useFavoriteStore()
  const locale = useLocale()
  const [data, setData] = useState()
  useEffect(() => {
    if (currentFavorites().length) {
      (async () => {
        const favorites = await apix(locale).post(`favorites`, currentFavorites());
      })();
    }
  }, [currentFavorites()])

  // const { getByValue } = useCountries();
  // const location = getByValue(data.locationValue);



  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId)
    }, [disabled, onAction, actionId]);

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
          "
        >
          <Image
            fill
            className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
            src={data.imageSrc}
            alt="Listing"
          />
          <div className="
            absolute
            top-3
            right-3
          ">
            <HeartButton
              listingId={data.id}
              currentUser={currentUser}
            />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {/* {location?.region}, {location?.label} */}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">
            $ {price}
          </div>
          {!reservation && (
            <div className="font-light">night</div>
          )}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
}

export default ListingCard;