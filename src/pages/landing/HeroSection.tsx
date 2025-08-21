import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../../components/common/AnimatedSection';
import HeroIllustration from '../../components/illustrations/HeroIllustration';

export const HeroSection = () => {
  return (
    <AnimatedSection>
      <section className="relative bg-primary text-white py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 transform -skew-y-6 bg-primary-dark"></div>
        <div className="max-w-6xl mx-auto relative z-10 grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
              Master Your Finances, Split Bills with Ease
            </h1>
            <p className="text-lg md:text-xl font-light mb-12 max-w-xl">
              Revence offers intuitive expense tracking, smart budgeting, and seamless shared expense management, just like Splitwise.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/register" className="bg-gradient-to-r from-accent to-accent-dark text-white hover:from-accent-dark hover:to-accent px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                Get Started for Free
              </Link>
              <Link to="/login" className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                Sign In
              </Link>
            </div>
          </div>
          <div className="hidden md:block animate-float">
            <HeroIllustration className="w-full h-auto" />
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}; 