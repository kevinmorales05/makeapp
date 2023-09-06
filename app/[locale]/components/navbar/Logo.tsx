import Link from "next/link";
const Logo = () => {
  return (
    <Link
      href={'/'}
      // onClick={() => router.push('/', { locale })}
      aria-label="Korean-Cosmetic"
      className="block cursor-pointer font-merienda !text-red-dark text-4xl"
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
