import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../../components/common/AnimatedSection';
import FeaturesIllustration from '../../components/illustrations/FeaturesIllustration';
import { CheckCircle, Zap, Shield, TrendingUp, Repeat, Users, Mail, FileText, Bell } from 'lucide-react';
import SectionTitle from '../../components/common/SectionTitle';

const FeatureCard = ({ icon: Icon, title, description, iconColor }: { 
  icon: React.ElementType; 
  title: string; 
  description: string; 
  iconColor: string;
}) => (
  <motion.div 
    className="bg-white/20 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group border-2 border-transparent hover:border-primary backdrop-blur-lg"
    variants={{
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 },
    }}
  >
    <div className="p-5 bg-background-light rounded-full mb-4 transition-all duration-300 shadow-md group-hover:scale-110">
      <Icon size={32} className={`${iconColor} transition-transform duration-300 group-hover:rotate-12`} />
    </div>
    <h3 className="text-2xl font-bold text-text mb-3">{title}</h3>
    <p className="text-text-light text-base">{description}</p>
  </motion.div>
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const features = [
    { icon: CheckCircle, title: "Expense Tracking", description: "Effortlessly log and categorize your spending for a clear overview.", iconColor: "text-accent" },
    { icon: Zap, title: "Smart Budgeting", description: "Set realistic budgets and receive alerts to stay on track.", iconColor: "text-primary" },
    { icon: Shield, title: "Secure Data", description: "Your financial data is protected with industry-leading security measures.", iconColor: "text-accent-dark" },
    { icon: TrendingUp, title: "Insightful Reports", description: "Visualize your financial health with custom reports and analytics.", iconColor: "text-primary-dark" },
    { icon: Repeat, title: "Automatic Tracking", description: "Connect your bank accounts for effortless, real-time expense synchronization.", iconColor: "text-accent" },
    { icon: Users, title: "Shared Expenses", description: "Easily split bills and track shared expenses with friends and family.", iconColor: "text-primary" },
  ];

export const FeaturesSection = () => {
    return (
        <AnimatedSection>
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-background-light">
          <div className="max-w-6xl mx-auto text-center">
            <SectionTitle>Powerful Features for Financial Freedom</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {features.map((feature, index) => (
                  <FeatureCard key={index} {...feature} />
                ))}
              </motion.div>
              <div className="hidden md:block">
                  <FeaturesIllustration className="w-full h-auto" />
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>
    )
} 