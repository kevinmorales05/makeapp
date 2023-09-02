'use client';

import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import image44 from '@/public/mocking/mizon.jpg'

interface SummaryCounterProps {
  title: string;
  total: number;
  value: number;
  src: string,
  onChange: (value: number) => void;
}

const SummaryCounter: React.FC<SummaryCounterProps> = ({
  title,
  total,
  value,
  src,
  onChange,
}) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value === 1) {
      return;
    }

    onChange(value - 1);
  }, [onChange, value]);

  return (
    <div className="flex flex-row items-center justify-between gap-3">
      <div className="flex flex-row gap-2">
        <Image
          shadow="sm"
          radius="lg"
          height="90px"
          width="90px"
          alt={title}
          className="object-cover w-full h-full"
          src={src}
        />
        <div className="flex gap-2 flex-col justify-center text-start">
          <p className="font-medium">{title}</p>
          <p className="font-light text-gray-600">$ {total}</p>
        </div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div
          onClick={onReduce}
          className="
            w-10
            h-10
            rounded-full
            border-[1px]
            border-neutral-400
            flex
            items-center
            justify-center
            text-neutral-600
            cursor-pointer
            hover:opacity-80
            transition
          "
        >
          <AiOutlineMinus />
        </div>
        <div
          className="
            font-light 
            text-xl 
            text-neutral-600
          "
        >
          {value}
        </div>
        <div
          onClick={onAdd}
          className="
            w-10
            h-10
            rounded-full
            border-[1px]
            border-neutral-400
            flex
            items-center
            justify-center
            text-neutral-600
            cursor-pointer
            hover:opacity-80
            transition
          "
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
}

export default SummaryCounter;