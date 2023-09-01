import React from 'react'

type Props = {
    title?: string;
}

const DividerCarousel = (props: Props) => {
    const { title } = props
    return (
        <div className="relative flex items-center">
            <div className="flex-grow border-t border-neutral-500"></div>
            <span className="flex-shrink mx-4 text-neutral-500">
                {title}
            </span>
            <div className="flex-grow border-t border-neutral-500"></div>
        </div>)
}

export default DividerCarousel