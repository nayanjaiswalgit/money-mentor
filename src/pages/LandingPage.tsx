import React from 'react';
import { HeroSection } from './landing/HeroSection';
import { HowItWorksSection } from './landing/HowItWorksSection';
import { FeaturesSection } from './landing/FeaturesSection';
import { TestimonialsSection } from './landing/TestimonialsSection';
import { CtaSection } from './landing/CtaSection';
import { Footer } from './landing/Footer';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CtaSection />
      <Footer />
    </div>
  );
} 