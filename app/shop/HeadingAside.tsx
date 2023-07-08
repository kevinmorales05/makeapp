interface HeadingShopAsideProps {
    title: String
}
export default function HeadingAside({ title }: HeadingShopAsideProps) {
    return (
        <div className="
        block font-size: 24px;
    line-height: 100%;
    text-transform: capitalize;
    padding-bottom: 10px;
    color: #222;
    font-family: Tenor Sans;
    border-bottom: 2px solid #222;
    margin-bottom: 15px">
            {title}
        </div>
    )
}
