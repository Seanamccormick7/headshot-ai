"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Logo from "../logo";

const Hero = ({ id }: { id: string }) => {
  return (
    // Updated gradient to a sleek blue range
    <section
      id={id}
      className="bg-gradient-to-r from-violet-700 to-violet-400 min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20"
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Image
          src="/hero.svg" // Replace with your image path
          alt="AI Generated Headshot Example"
          width={300}
          height={300}
          className="rounded-full shadow-lg"
        />
      </motion.div>

      {/* Logo, can stay or be replaced */}
      <Logo className="my-6" />

      <motion.h1
        className="text-5xl font-extrabold text-white mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Upgrade Your <span className="text-zinc-900">Headshots</span> with Ease
      </motion.h1>

      <motion.p
        className="text-xl text-white max-w-2xl mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        Use Headshot-ai to save time and money. Get professional AI-generated
        headshots tailored to your needs.
      </motion.p>

      <motion.div
        className="flex space-x-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        {/* Primary CTA -> Get Started (/signup) */}
        <Button asChild>
          <Link href="/signup">Get Started</Link>
        </Button>

        {/* Secondary CTA -> Log In (/login) */}
        <Button asChild variant="secondary">
          <Link href="/login">Log In</Link>
        </Button>
      </motion.div>
    </section>
  );
};

export default Hero;
