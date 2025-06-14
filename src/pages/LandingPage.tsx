import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Zap, Shield, TrendingUp, Repeat, Users, Mail, FileText, Bell, Link as LinkIcon, Upload, PieChart } from 'lucide-react';

// Reusable components
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-4xl font-bold text-gray-900 mb-20 relative after:absolute after:w-24 after:h-1 after:bg-indigo-600 after:bottom-[-20px] after:left-1/2 after:-translate-x-1/2">
    {children}
  </h2>
);

const FeatureCard = ({ icon: Icon, title, description, iconColor }: { 
  icon: React.ElementType; 
  title: string; 
  description: string; 
  iconColor: string;
}) => (
  <div className="bg-gradient-to-br from-white to-gray-50 p-12 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-3 transition-all duration-300 flex flex-col items-center group border border-gray-100">
    <div className="p-5 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full mb-4 group-hover:scale-110 group-hover:from-indigo-200 group-hover:to-purple-200 transition-all duration-300 shadow-md">
      <Icon size={32} className={iconColor} />
    </div>
    <h3 className="text-2xl font-bold text-gray-800 mb-3">{title}</h3>
    <p className="text-gray-600 text-base">{description}</p>
  </div>
);

const WorkStepCard = ({ icon: Icon, title, description, iconColor }: {
  icon: React.ElementType;
  title: string;
  description: string;
  iconColor: string;
}) => (
  <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2 transition-all duration-300 flex flex-col items-center group">
    <div className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-full mb-4 group-hover:scale-110 group-hover:from-indigo-100 group-hover:to-purple-100 transition-all duration-300 shadow-sm">
      <Icon size={28} className={iconColor} />
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

const TestimonialCard = ({ quote, author, borderColor }: {
  quote: string;
  author: string;
  borderColor: string;
}) => (
  <div className={`bg-white p-8 rounded-xl shadow-md border-t-4 ${borderColor}`}>
    <p className="text-gray-700 italic mb-4">{quote}</p>
    <p className="font-semibold text-gray-900">{author}</p>
  </div>
);

// Feature data
const features = [
  { icon: CheckCircle, title: "Expense Tracking", description: "Effortlessly log and categorize your spending for a clear overview.", iconColor: "text-green-600" },
  { icon: Zap, title: "Smart Budgeting", description: "Set realistic budgets and receive alerts to stay on track.", iconColor: "text-yellow-600" },
  { icon: Shield, title: "Secure Data", description: "Your financial data is protected with industry-leading security measures.", iconColor: "text-blue-600" },
  { icon: TrendingUp, title: "Insightful Reports", description: "Visualize your financial health with custom reports and analytics.", iconColor: "text-pink-600" },
  { icon: Repeat, title: "Automatic Tracking", description: "Connect your bank accounts for effortless, real-time expense synchronization.", iconColor: "text-orange-600" },
  { icon: Users, title: "Shared Expenses", description: "Easily split bills and track shared expenses with friends and family.", iconColor: "text-cyan-600" },
  { icon: Mail, title: "Gmail Integration", description: "Automatically import receipts and financial documents from your Gmail inbox.", iconColor: "text-red-600" },
  { icon: FileText, title: "Invoice Management", description: "Create, track, and manage invoices with automated payment reminders and status updates.", iconColor: "text-amber-600" },
  { icon: Bell, title: "Smart Notifications", description: "Get timely alerts for bill payments, budget limits, and important financial updates.", iconColor: "text-rose-600" },
];

// Work steps data
const workSteps = [
  { icon: LinkIcon, title: "Connect Your Accounts", description: "Link your bank accounts and credit cards for automatic transaction syncing", iconColor: "text-emerald-600" },
  { icon: Upload, title: "Upload Statements", description: "Import your bank statements and receipts with smart OCR technology", iconColor: "text-violet-600" },
  { icon: PieChart, title: "Track & Analyze", description: "Monitor your spending patterns and get insights into your finances", iconColor: "text-pink-600" },
  { icon: TrendingUp, title: "Grow Wealth", description: "Make informed decisions to improve your financial health", iconColor: "text-blue-600" },
];

// Testimonials data
const testimonials = [
  { quote: "Revence has transformed how I manage my money. It's incredibly easy to use and provides so much clarity!", author: "- Jane Doe, Small Business Owner", borderColor: "border-indigo-500" },
  { quote: "I love the budgeting features. I've never been so on top of my finances before. Highly recommend!", author: "- John Smith, Freelancer", borderColor: "border-purple-500" },
  { quote: "The reports are amazing! I can see exactly where my money is going, which helps me make smarter financial decisions.", author: "- Emily White, Student", borderColor: "border-green-500" },
];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 to-indigo-700 text-white py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 transform -skew-y-6 bg-gradient-to-br from-purple-500 to-indigo-600"></div>
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <h1 className="text-6xl font-extrabold leading-tight mb-6 animate-fade-in-down">
            Master Your Finances, Split Bills with Ease
          </h1>
          <p className="text-2xl font-light mb-12 opacity-0 animate-fade-in delay-200">
            Revence offers intuitive expense tracking, smart budgeting, and seamless shared expense management, just like Splitwise.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 opacity-0 animate-fade-in delay-400">
            <Link to="/register" className="bg-white text-indigo-700 hover:bg-gray-100 px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
              Get Started for Free
            </Link>
            <Link to="/login" className="border border-white text-white hover:bg-white hover:text-indigo-700 px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <SectionTitle>How Revence Works</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workSteps.map((step, index) => (
              <WorkStepCard key={index} {...step} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <SectionTitle>Powerful Features for Financial Freedom</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-indigo-700 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Ready to Take Control of Your Financial Future?</h2>
          <p className="text-xl font-light mb-10">Join thousands of satisfied users who are achieving their financial dreams with Revence.</p>
          <Link to="/register" className="bg-white text-indigo-700 hover:bg-gray-100 px-10 py-4 rounded-full text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
            Start Your Journey Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <p className="mb-4">&copy; {new Date().getFullYear()} Revence. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            <Link to="/privacy" className="hover:text-white transition-colors duration-200">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors duration-200">Terms of Service</Link>
            <Link to="/contact" className="hover:text-white transition-colors duration-200">Contact Us</Link>
          </div>
        </div>
      </footer>
    </div>
  );
} 