import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../../components/common/AnimatedSection';
import HowItWorksIllustration from '../../components/illustrations/HowItWorksIllustration';
import { Link as LinkIcon, Upload, PieChart, TrendingUp } from 'lucide-react';
import SectionTitle from '../../components/common/SectionTitle';

const WorkStepCard = ({ icon: Icon, title, description, iconColor }: {
  icon: React.ElementType;
  title: string;
  description: string;
  iconColor: string;
}) => (
  <motion.div 
    className="bg-white/20 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group border-2 border-transparent hover:border-primary backdrop-blur-lg"
    variants={{
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 },
    }}
  >
    <div className="p-4 bg-background-light rounded-full mb-4 transition-all duration-300 shadow-sm group-hover:scale-110">
      <Icon size={28} className={`${iconColor} transition-transform duration-300 group-hover:rotate-12`} />
    </div>
    <h3 className="text-xl font-bold text-text mb-3">{title}</h3>
    <p className="text-text-light text-sm">{description}</p>
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

const workSteps = [
  { icon: LinkIcon, title: "Connect Your Accounts", description: "Link your bank accounts and credit cards for automatic transaction syncing", iconColor: "text-primary" },
  { icon: Upload, title: "Upload Statements", description: "Import your bank statements and receipts with smart OCR technology", iconColor: "text-accent" },
  { icon: PieChart, title: "Track & Analyze", description: "Monitor your spending patterns and get insights into your finances", iconColor: "text-primary-dark" },
  { icon: TrendingUp, title: "Grow Wealth", description: "Make informed decisions to improve your financial health", iconColor: "text-accent-dark" },
];

export const HowItWorksSection = () => {
  return (
    <AnimatedSection>
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background-light to-background">
        <div className="max-w-6xl mx-auto text-center">
          <SectionTitle>How Revence Works</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <HowItWorksIllustration className="w-full h-auto" />
            </div>
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {workSteps.map((step, index) => (
                <WorkStepCard key={index} {...step} />
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </AnimatedSection>
  )
} 