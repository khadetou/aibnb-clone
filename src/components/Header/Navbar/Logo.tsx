import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const { push } = useRouter();

  return (
    <Image
      onClick={() => push("/")}
      src="/images/logo.png"
      alt="Logo"
      className="hidden cursor-pointer md:block"
      height="100"
      width="100"
    />
  );
};

export default Logo;
