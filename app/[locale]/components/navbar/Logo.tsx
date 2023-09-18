import Link from "next/link";
type LogoProps = {
  locale: string;
}
const Logo = ({ locale }: LogoProps) => {
  return (
    <Link
      href={`/${locale}`}
      // onClick={() => router.push('/', { locale })}
      aria-label="Korean-Cosmetic"
      className="block cursor-pointer font-merienda !text-primary-red text-4xl"
      // size="md"
      color="primary"
    // src="/img/logo.png" 
    // height="50" 
    // width="50" 
    // alt="Logo" 
    >
      {"Make App"}
    </Link>
  );
}

export default Logo;
