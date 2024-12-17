"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const pricingPlans = [
  {
    name: "Basic",
    price: "$19/month",
    features: ["1 Headshot", "Standard Resolution", "Email Support"],
  },
  {
    name: "Pro",
    price: "$49/month",
    features: ["5 Headshots", "High Resolution", "Priority Support"],
  },
  {
    name: "Enterprise",
    price: "$99/month",
    features: ["Unlimited Headshots", "Custom Branding", "Dedicated Support"],
  },
];

const Pricing = ({ id }: { id: string }) => {
  return (
    <section id={id} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          Pricing Plans
        </motion.h2>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              className="border rounded-lg p-6 shadow-lg flex-1 max-w-sm"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <h3 className="text-2xl font-semibold mb-4">{plan.name}</h3>
              <p className="text-3xl font-bold mb-4">{plan.price}</p>
              <ul className="mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center mb-2">
                    <span className="text-green-500 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button asChild variant="default" className="w-full">
                <Link href="/signup">Choose {plan.name}</Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
