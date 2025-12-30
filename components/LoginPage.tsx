
import React from 'react';
import { UserRole } from '../types';

interface Props {
  onLogin: (role: UserRole) => void;
}

const LoginPage: React.FC<Props> = ({ onLogin }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-white text-3xl mb-4">
            🍔
          </div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">QuickBite</h2>
          <p className="mt-2 text-sm text-gray-500 font-medium italic">Self-Ordering Kiosk System</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Account Type</label>
            <div className="grid grid-cols-1 gap-4">
              <button
                onClick={() => onLogin(UserRole.CUSTOMER)}
                className="group relative w-full flex justify-center py-6 px-4 border border-transparent text-xl font-bold rounded-2xl text-white bg-emerald-600 hover:bg-emerald-700 transition-all active:scale-95 shadow-lg shadow-emerald-200"
              >
                <span className="absolute left-6 inset-y-0 flex items-center">
                  👤
                </span>
                Order Food
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="px-2 bg-white text-gray-400 font-bold">Administration</span>
                </div>
              </div>

              <button
                onClick={() => onLogin(UserRole.ADMIN)}
                className="group relative w-full flex justify-center py-5 px-4 border-2 border-emerald-600 text-lg font-bold rounded-2xl text-emerald-600 hover:bg-emerald-50 transition-all active:scale-95"
              >
                <span className="absolute left-6 inset-y-0 flex items-center">
                  ⚙️
                </span>
                Admin Portal
              </button>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-400">
            Secure Enterprise Access v3.1.2
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
