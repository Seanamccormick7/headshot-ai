"use client";

import { createCheckoutSession, generateHeadshots } from "@/actions/actions";
import H1 from "@/components/h1";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const [isPending, startTransition] = useTransition();
  const { data: session, update, status } = useSession();
  const router = useRouter();

  return (
    <main className="flex flex-col items-center space-y-10">
      {searchParams.success && (
        <H1>Success! You now have access to your dashboard.</H1>
      )}
      {searchParams.cancelled && <H1>Headshot AI access requires payment</H1>}

      {searchParams.success && (
        <Button
          onClick={async () => {
            await generateHeadshots();
            await update(true);
            router.push("/app/dashboard/gallery");
          }}
          disabled={status === "loading" || session?.user.hasAccess}
        >
          View my Headshots
        </Button>
      )}

      {!searchParams.success && (
        <Button
          disabled={isPending}
          onClick={async () => {
            startTransition(async () => {
              await createCheckoutSession();
            });
          }}
        >
          {/* TODO: change this price might just use differnt stripe type (not a seperate page) */}
          Buy lifetime access for $19.99
        </Button>
      )}

      {searchParams.success && (
        <p className="text-sm text-green-700">
          Payment successful! You now have lifetime access to Headshot-ai.
        </p>
      )}
      {searchParams.cancelled && (
        <p className="text-sm text-red-700">
          Payment cancelled. You can try again.
        </p>
      )}
    </main>
  );
}
