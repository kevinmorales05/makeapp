import React from 'react'

type Props = {
    title?: string;
}

const DividerCarousel = (props: Props) => {
    const { title } = props
    if (!title) {
        return
    }
    return (
        <div className="relative flex items-center text-xl justify-center">
            <div className="flex-grow border-t border-neutral-500 max-w-md"></div>
            <span className="flex-shrink mx-4 font-bold">
                {title}
            </span>
            <div className="flex-grow border-t border-neutral-500 max-w-md "></div>
        </div>)
}

export default DividerCarousel