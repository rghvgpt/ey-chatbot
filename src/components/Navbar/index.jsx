import Image from "next/image";
import profilePic from "public/Logo-Vecmocon.svg";

export const Navbar = () => {
  return (
    <div className="flex h-[80px] sm:h-[80px] py-2 px-2 sm:px-8 items-center justify-center">
      <Image src={profilePic} alt="Vecmocon Logo" width={150} height={50} />
    </div>
  );
};
