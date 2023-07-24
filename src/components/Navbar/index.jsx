import Image from "next/image";
import profilePic from "public/ey_logo.png";

export const Navbar = () => {
  return (
    <div className="flex h-[80px] sm:h-[80px] py-2 px-2 sm:px-8 items-center justify-center">
      <Image src={profilePic} alt="EY Logo" width={100} />
    </div>
  );
};
