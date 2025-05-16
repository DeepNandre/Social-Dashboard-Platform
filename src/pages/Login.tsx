import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { MicrosoftLogo } from '../components/icons/MicrosoftLogo';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../authConfig';

export function Login() {
  const navigate = useNavigate();
  const { setUser } = React.useContext(UserContext);
  const { instance } = useMsal();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDemoLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("Demo login clicked");
    const demoUser = {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      role: 'user',
      preferences: {
        theme: 'light',
        favoriteReports: []
      }
    };
    setUser(demoUser);
    localStorage.setItem('user', JSON.stringify(demoUser));
    navigate('/');
  };

  const handleMicrosoftLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Using popup instead of redirect for easier debugging
      const response = await instance.loginPopup({
        ...loginRequest,
        prompt: "select_account"
      });
      
      console.log("Login successful", response);
      
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
        
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/');
      } else {
        setError('No account was selected');
      }
    } catch (err) {
      console.error('Login failed:', err);
      setError(`Login failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4076bb] to-[#50c0af] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-grid-white/[0.05]" />
      
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-xl relative z-10">
        <div>
          <img 
            src="/enspec-logo.png" 
            alt="Enspec Power Logo" 
            className="mx-auto h-16 w-auto"
            onError={(e) => {
              console.error('Logo failed to load');
              e.target.style.display = 'none';
            }}
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Analytics Dashboard
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in with your Microsoft account to access analytics
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="space-y-3">
          <button
            onClick={handleMicrosoftLogin}
            disabled={isLoading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4076bb] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#4076bb] hover:bg-[#3567a7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4076bb] transition-colors"
          >
            Continue in Demo Mode
          </button>
        </div>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Enspec's Internal Tool
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}