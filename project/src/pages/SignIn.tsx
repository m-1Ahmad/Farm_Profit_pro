import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Sprout } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type SignInForm = z.infer<typeof schema>;

function SignIn() {
  const { login } = useAuth();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignInForm>({
    resolver: zodResolver(schema),
  });

 
  const goHome = () => navigate('/');

  const onSubmit = async (data: SignInForm) => {
    try {
      await login(data.email, data.password);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
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
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Login Here!</h1>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-3">
                User Name
              </label>
              <input
                {...register('email')}
                type="email"
                className="w-full px-4 py-4 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-green-600 text-lg"
                placeholder=""
              />
              {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
            </div>
            
            <div>
              <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-3">
                Password
              </label>
              <input
                {...register('password')}
                type="password"
                className="w-full px-4 py-4 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-green-600 text-lg"
                placeholder=""
              />
              {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
              
              <div className="mt-3">
                <a href="#" className="text-orange-500 hover:text-orange-600 text-sm">
                  Forget Password
                </a>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gray-800 text-white px-12 py-3 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 disabled:opacity-50 text-lg font-medium"
              >
                {isSubmitting ? <Loader /> : 'Login'}
              </button>
            </div>

            <div className="pt-4">
              {!isAuthenticated && (
                <Link to="/signup" className="text-orange-500 hover:text-orange-600 text-lg">
                  Create an Account
                </Link>
              )}
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

export default SignIn;