import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = ({ img }: { img: string }) => {
  return (
    <Link href={"/"} className=" block items-center gap-2 mr-3 md:mr-0">
      <Image src={img} width={300} height={100} alt="brand" />
    </Link>
  );
};

export default Logo;
