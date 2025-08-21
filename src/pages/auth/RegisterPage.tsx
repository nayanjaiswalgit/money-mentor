import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, User, AlertCircle, Loader2, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { registerUser, selectAuthError, selectAuthLoading } from '../../features/auth/authSlice';
import { FormField } from '../../components/ui/forms/FormField';
import styles from '../../components/ui/forms/formStyles.module.css';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const FORM_VALIDATION = {
  name: (value: string): string => {
    if (!value) return 'Name is required';
    if (value.length < 2) return 'Name must be at least 2 characters';
    return '';
  },
  email: (value: string): string => {
    if (!value) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(value)) return 'Please enter a valid email';
    return '';
  },
  password: (value: string): string => {
    if (!value) return 'Password is required';
    if (value.length < 8) return 'Password must be at least 8 characters';
    return '';
  },
  confirmPassword: (value: string, password: string): string => {
    if (!value) return 'Please confirm your password';
    if (value !== password) return 'Passwords do not match';
    return '';
  },
} as const;

export function RegisterPage() {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const error = useAppSelector(selectAuthError);
  const isLoading = useAppSelector(selectAuthLoading);
  const from = location.state?.from?.pathname || '/';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors: FormErrors = {
      name: FORM_VALIDATION.name(formData.name),
      email: FORM_VALIDATION.email(formData.email),
      password: FORM_VALIDATION.password(formData.password),
      confirmPassword: FORM_VALIDATION.confirmPassword(formData.confirmPassword, formData.password),
    };
    
    const filteredErrors = Object.entries(validationErrors).reduce((acc, [key, value]) => {
      if (value) acc[key as keyof FormErrors] = value;
      return acc;
    }, {} as FormErrors);

    setErrors(filteredErrors);
    
    if (Object.keys(filteredErrors).length > 0) {
      return;
    }

    try {
      const resultAction = await dispatch(registerUser({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      }));
      
      if (registerUser.fulfilled.match(resultAction)) {
        navigate(from, { replace: true });
      }
    } catch (err) {
      console.error('Registration error:', err);
    }
  };

  const isFormValid = Object.keys(errors).length === 0 && 
    formData.name && 
    formData.email && 
    formData.password && 
    formData.confirmPassword;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex">
      {/* Left side - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 -left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-20 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center text-white p-16">
            <h2 className="text-4xl font-bold mb-4">Welcome to Revence</h2>
            <p className="text-lg text-white/80 max-w-md leading-relaxed">
                Your personal finance command center. Track spending, manage budgets, and see all your accounts in one place.
            </p>

            {/* Abstract UI graphic */}
            <div className="mt-12 p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl">
                <div className="flex justify-between items-end mb-4">
                    <div>
                        <div className="text-sm text-white/70">Total Balance</div>
                        <div className="text-3xl font-bold">$12,480.55</div>
                    </div>
                    <div className="w-24 h-10 bg-green-400/20 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                    </div>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full mb-6">
                    <div className="w-3/4 h-2 bg-blue-300 rounded-full"></div>
                </div>
                <div className="flex space-x-4">
                    <div className="flex-1">
                        <div className="text-sm text-white/70">Income</div>
                        <div className="text-xl font-semibold text-green-300">+$4,500</div>
                    </div>
                    <div className="w-px bg-white/20"></div>
                    <div className="flex-1">
                        <div className="text-sm text-white/70">Expenses</div>
                        <div className="text-xl font-semibold text-red-300">-$2,150</div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Right side */}
      <div className="flex-1 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-20 xl:px-28">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-left">Create your account</h2>
          
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3 flex items-center text-red-700 text-sm">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
              <span>{typeof error === 'string' ? error : 'An unexpected error occurred.'}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            <FormField
              id="name"
              label="Full Name"
              value={formData.name}
              onChange={val => handleChange({ target: { name: 'name', value: val } } as React.ChangeEvent<HTMLInputElement>)}
              icon={User}
              type="text"
              placeholder="John Doe"
              required
              error={errors.name}
              disabled={isLoading}
            />
            <FormField
              id="email"
              label="Email address"
              value={formData.email}
              onChange={val => handleChange({ target: { name: 'email', value: val } } as React.ChangeEvent<HTMLInputElement>)}
              icon={Mail}
              type="email"
              placeholder="you@example.com"
              required
              error={errors.email}
              disabled={isLoading}
              autoComplete="email"
            />
            <div className="relative">
              <FormField
                id="password"
                label="Password"
                value={formData.password}
                onChange={val => handleChange({ target: { name: 'password', value: val } } as React.ChangeEvent<HTMLInputElement>)}
                icon={Lock}
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                required
                error={errors.password}
                disabled={isLoading}
                autoComplete="new-password"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute top-1/2 -translate-y-1/2 right-0 text-gray-400 hover:text-gray-600">
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            <div className="relative">
              <FormField
                id="confirmPassword"
                label="Confirm Password"
                value={formData.confirmPassword}
                onChange={val => handleChange({ target: { name: 'confirmPassword', value: val } } as React.ChangeEvent<HTMLInputElement>)}
                icon={Lock}
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="••••••••"
                required
                error={errors.confirmPassword}
                disabled={isLoading}
                autoComplete="new-password"
              />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute top-1/2 -translate-y-1/2 right-0 text-gray-400 hover:text-gray-600">
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            
            <button
              type="submit"
              disabled={!isFormValid || isLoading}
              className="w-full bg-indigo-600 text-white py-2.5 px-4 rounded-lg font-semibold text-base shadow-md hover:bg-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader2 className="mx-auto h-6 w-6 animate-spin" /> : 'Create account'}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button type="button" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </button>
              <button type="button" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.11.793-.26.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.562 21.807 24 17.302 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </button>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
