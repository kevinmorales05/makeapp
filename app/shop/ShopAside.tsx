import React from 'react'
import ShopAsideItem from './ShopAsideItem'
import HeadingAside from './HeadingAside'

export default function ShopAside() {

    const shopasideitems = [
        {
            title: "Categories",
            body: (<>
                <div>Accordion here</div>
            </>),
        },
        {
            title: "Prices",
            body: (<>
                <div>Range Prices here</div>
            </>),
        },
        {
            title: "Top 3 For Today",
            body: (<>
                <div>body content</div>
            </>),
        },

    ]

    const title = "Title content Aside"

    return (
        <>{shopasideitems.map((it, index) =>
            <ShopAsideItem key={index} title={it.title} body={it.body} />

        )}
        </>
    )
}
