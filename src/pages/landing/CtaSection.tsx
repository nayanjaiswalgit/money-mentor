import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AnimatedSection from "../../components/common/AnimatedSection";

export const CtaSection = () => {
  return (
    <AnimatedSection>
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 pattern-dots text-white/10"></div>
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Take Control of Your Finances?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Join Revence today and start your journey towards financial clarity and freedom.
            </p>
            <Link to="/register">
              <motion.button 
                className="bg-white text-primary font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
                whileHover={{ y: -5, boxShadow: "0px 15px 20px rgba(0,0,0,0.1)" }}
              >
                Get Started for Free
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </AnimatedSection>
  );
}; 