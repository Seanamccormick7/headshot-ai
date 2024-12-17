import Image from "next/image";
import logo from "../../public/logo.svg";
import Link from "next/link";

export default function Logo() {
  return (
    //TODO: Replace with your own logo
    //current redirect rules mean that when directed to homepage,
    //user will automatically be sent back to dashboard if logged in
    <Link href="/">
      <Image src={logo} alt="Headshot AI logo" className="h-8 w-auto" />
    </Link>
  );
}
