import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost/logic/login.php', {
        email,
        password,
      });

      if (response.data.success) {
        navigate('/hero');
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error('Server error. Please try again later.'); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-white px-4">
      <form
        onSubmit={handleLogin}
        className="bg-surface p-8 rounded-xl shadow-xl w-full max-w-sm"
      >
        <h2 className="text-2xl text-clr font-bold text-center mb-6">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 bg-background text-white placeholder-muted border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-2 bg-background text-white placeholder-muted border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-primary text-clr py-2 rounded-md hover:opacity-90 transition"
        >
          Log In
        </button>
        <div className="mt-4 text-sm text-muted text-center">
          Don't have an account?
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="ml-2 text-primary hover:underline"
          >
            Register
          </button>
        </div>

      </form>
    </div>
  );
};

export default Login;
