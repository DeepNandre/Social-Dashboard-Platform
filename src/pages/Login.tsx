import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MicrosoftLogo } from '../components/icons/MicrosoftLogo';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../authConfig';

export function Login() {
  const navigate = useNavigate();
  const { instance } = useMsal();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDemoLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    const demoUser = {
      id: '1',
      name: 'Demo User',
      email: 'demo@socialsleuth.com',
      role: 'user',
      preferences: {
        theme: 'light',
        favoriteReports: []
      }
    };
    localStorage.setItem('user', JSON.stringify(demoUser));
    navigate('/');
  };

  const handleMicrosoftLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await instance.loginPopup({
        ...loginRequest,
        prompt: "select_account"
      });
      const account = instance.getAllAccounts()[0];
      if (account) {
        const user = {
          id: account.localAccountId || account.homeAccountId,
          name: account.name || 'Microsoft User',
          email: account.username,
          role: 'user',
          preferences: {
            theme: 'light',
            favoriteReports: []
          }
        };
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/');
      } else {
        setError('No account was selected');
      }
    } catch (err) {
      setError(`Login failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-teal-400">
      <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-2xl relative z-10">
        <div className="flex flex-col items-center">
          <img
            src="/logo.png"
            alt="Social Sleuth Logo"
            className="h-16 w-16 mb-4"
          />
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2 text-center">
            Welcome to Social Sleuth
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Sign in to uncover powerful social media insights.
          </p>
        </div>
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded mb-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}
        <div className="space-y-3">
          <button
            onClick={handleMicrosoftLogin}
            disabled={isLoading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <MicrosoftLogo className="h-5 w-5" />
            </span>
            {isLoading ? 'Signing in...' : 'Sign in with Microsoft'}
          </button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or</span>
            </div>
          </div>
          <button
            onClick={handleDemoLogin}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Continue in Demo Mode
          </button>
        </div>
        <div className="mt-6 text-center text-xs text-gray-400">
          By continuing, you agree to our <a href="#" className="underline">Privacy Policy</a> and <a href="#" className="underline">Terms of Service</a>.
        </div>
      </div>
    </div>
  );
}