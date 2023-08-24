interface HeadingShopAsideProps {
    title: String
}
export default function HeadingAside({ title }: HeadingShopAsideProps) {
    return (
        <div className="
                        block
                        font-size: 24px;
                        line-height: 100%;
                        capitalize
                        pb-2	
                        border-black
                        border-b-2	
                        mb-4
                        font-merienda
        ">
            {title}
        </div>
    )
}
