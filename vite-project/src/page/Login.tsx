// LoginPage.tsx
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { login } from '../service/info';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Sparkles } from 'lucide-react';

const schema = yup.object().shape({
  userName: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm({ resolver: yupResolver(schema) });

  const nav = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      nav('/admin');
    }
  }, []);

  const onSubmit = async (data: any) => {
    try {
      const res = await login(data.userName, data.password);
      const token = res.data?.accessToken;
      if (token) {
        localStorage.setItem('accessToken', token);
        nav('/admin');
      }
    } catch (err: any) {
      setError("password", { message: 'Invalid username or password' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-800 to-cyan-800 px-4">
      <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-2xl p-8 w-full max-w-md border border-slate-300">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Sparkles className="text-cyan-500 w-6 h-6 animate-pulse" />
          <h2 className="text-3xl font-bold text-center tracking-tight text-slate-800">
            Admin Portal
          </h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              autoFocus
              {...register('userName')}
              className="px-4 py-2 w-full border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            {errors.userName && <p className="text-red-500 text-xs mt-1">{errors.userName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                className="px-4 py-2 w-full border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600 text-white py-2.5 rounded-xl font-semibold shadow-lg transition duration-200"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}