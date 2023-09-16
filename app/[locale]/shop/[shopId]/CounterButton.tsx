import React from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

type Props = {}

const CounterButton = (props: Props) => {
    return (
        <div className="flex flex-row items-center gap-4">
            <div
                // onClick={onReduce}
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
                {/* {value} */}
                1
            </div>
            <div
                // onClick={onAdd}
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
    )
}

export default CounterButton