"use client";

import { motion } from "framer-motion";

const reviews = [
  {
    name: "Jane Doe",
    text: "Headshot-ai transformed my LinkedIn profile. The quality is amazing!",
  },
  {
    name: "John Smith",
    text: "Quick, affordable, and professional. Highly recommend!",
  },
  {
    name: "Alice Johnson",
    text: "The AI-generated headshots are lifelike and exactly what I needed.",
  },
];

const Reviews = ({ id }: { id: string }) => {
  return (
    <section id={id} className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          What Our Customers Say
        </motion.h2>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md max-w-md"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <p className="text-lg mb-4">`{review.text}`</p>
              <p className="text-sm font-semibold text-right">
                - {review.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
