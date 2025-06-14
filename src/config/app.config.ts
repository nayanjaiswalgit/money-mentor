import { features } from './features';
import { routes } from './routes';

export interface AppConfig {
  appName: string;
  version: string;
  environment: 'development' | 'staging' | 'production';
  apiBaseUrl: string;
  features: typeof features;
  routes: typeof routes;
  theme: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
  layout: {
    maxWidth: string;
    padding: string;
  };
}

const config: AppConfig = {
  appName: 'Expense Tracker',
  version: '1.0.0',
  environment: process.env.NODE_ENV as AppConfig['environment'],
  apiBaseUrl:  'http://localhost:8000',
  features,
  routes,
  theme: {
    primary: '#3B82F6',
    secondary: '#10B981',
    background: '#F3F4F6',
    text: '#1F2937',
  },
  layout: {
    maxWidth: 'max-w-7xl',
    padding: 'sm:px-6 lg:px-8',
  },
};

export default config; 