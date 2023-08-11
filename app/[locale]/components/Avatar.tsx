'use client';

import Image from "next/image";

interface AvatarProps {
  src: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return ( 
    <Image 
      className="rounded-full border-2 border-red-dark/20" 
      height="30" 
      width="30" 
      alt="Avatar" 
      src={src || '/img/placeholder.jpg'}
    />
   );
}
 
export default Avatar;