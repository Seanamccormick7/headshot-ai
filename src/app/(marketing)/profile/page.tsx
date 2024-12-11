import H1 from "@/components/h1";
import Link from "next/link";
import React from "react";

export default function Profile() {
  return (
    <>
      <H1>PROFILE PAGE</H1>

      <Link href={"/payment"}>Proceed to payment</Link>
    </>
  );
}
