import Link from "next/link";

import Image from "next/image";

const Logo = () => {
  return (
    <Link href={"/"}>
      <Image width={42} height={42} src={"/logo/logo.webp"} alt="logo" />
    </Link>
  );
};

export default Logo;
