import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Sprout } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type SignUpForm = z.infer<typeof schema>;

function SignUp() {
  const { signup, login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpForm>({
    resolver: zodResolver(schema),
  });
  const [backendError, setBackendError] = useState<string | null>(null);

  const goHome = () => navigate('/');

  const onSubmit = async (data: SignUpForm) => {
    try {
      await signup(data.email, data.password, data.name , data.address);
      await login(data.email, data.password);
      setBackendError(null);
      navigate('/');
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        setBackendError(error.response.data.error);
      } else {
        setBackendError('Signup failed. Please try again later.');
      }
      console.error('Signup failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex relative">
      <button
        onClick={goHome}
        className="absolute top-6 left-6 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded shadow text-sm font-medium z-10"
        aria-label="Go to homepage"
      >
        &larr; Home
      </button>
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center bg-white px-8 py-12">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Create an account</h1>
            <p className="text-gray-600">If you already have an account, please log in instead.</p>
          </div>
          
          {backendError && (
            <div className="mb-4 p-3 rounded bg-red-100 border border-red-300 text-red-700 text-center text-sm font-medium animate-fade-in">
              {backendError}
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  {...register('name')}
                  type="text"
                  className="w-full px-4 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-lg"
                  placeholder="Name"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
              </div>
              
              <div>
                <input
                  {...register('address')}
                  type="text"
                  className="w-full px-4 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-lg"
                  placeholder="Address"
                />
                {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
              </div>
            </div>
            
            <div>
              <input
                {...register('email')}
                type="email"
                className="w-full px-4 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-lg"
                placeholder="Email Address"
              />
              {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
            </div>
            
            <div>
              <input
                {...register('password')}
                type="password"
                className="w-full px-4 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-lg"
                placeholder="Password"
              />
              {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
            </div>

            <div className="flex space-x-4 pt-6">
              <Link
                to="/signin"
                className="bg-gray-800 text-white px-8 py-3 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-lg font-medium"
              >
                Back to Login
              </Link>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-orange-500 text-white px-8 py-3 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 text-lg font-medium"
              >
                {isSubmitting ? <Loader /> : 'Sign In'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Branding */}
      <div className="flex-1 bg-green-600 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="mb-8">
            <img src="/logo.jpg" alt="Farm Profit Pro Logo" className="h-24 w-24 mx-auto rounded-full bg-white object-contain" />
          </div>
          <h2 className="text-5xl font-bold">Farm Profit Pro</h2>
        </div>
      </div>
    </div>
  );
}

export default SignUp;