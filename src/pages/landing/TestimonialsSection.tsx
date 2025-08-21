import { motion } from "framer-motion";
import AnimatedSection from "../../components/common/AnimatedSection";
import SectionTitle from "../../components/common/SectionTitle";

const TestimonialCard = ({
  quote,
  author,
  borderColor,
}: {
  quote: string;
  author: string;
  borderColor: string;
}) => (
  <motion.div
    className={`bg-white/20 p-8 rounded-xl shadow-md border-t-4 ${borderColor} backdrop-blur-lg`}
    variants={{
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 },
    }}
  >
    <p className="text-text-light italic mb-4">"{quote}"</p>
    <p className="font-semibold text-text text-right">- {author}</p>
  </motion.div>
);

const testimonials = [
  {
    quote: "Revence has completely changed the way I manage my finances. It's so intuitive and powerful.",
    author: "Alex Johnson",
    borderColor: "border-primary",
  },
  {
    quote: "The best expense tracker I've ever used. The insights are incredibly helpful for budgeting.",
    author: "Samantha Lee",
    borderColor: "border-secondary",
  },
  {
    quote: "As a freelancer, keeping track of expenses was a nightmare. Revence made it simple and stress-free.",
    author: "Michael Chen",
    borderColor: "border-accent",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export const TestimonialsSection = () => {
  return (
    <AnimatedSection>
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-background-light">
        <div className="max-w-6xl mx-auto text-center">
          <SectionTitle>What Our Users Say</SectionTitle>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </motion.div>
        </div>
      </section>
    </AnimatedSection>
  );
};

 