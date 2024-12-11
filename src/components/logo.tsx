import Image from "next/image";
import logo from "../../public/logo.svg";
import Link from "next/link";

export default function Logo() {
  return (
    //TODO: Replace with your own logo
    <Link href="/">
      <Image src={logo} alt="Headshot-ai logo" />
    </Link>
  );
}
