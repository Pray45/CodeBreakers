import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost/CodeBreakers/logic/check-session.php', {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.loggedIn) {
          navigate('/home');
        }
      })
      .catch((err) => {
        console.error('Session check failed:', err);
      });
  }, [navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost/CodeBreakers/logic/register.php',
        { email, name, password },
        { withCredentials: true }
      );

      if (response.data.success) {
        navigate('/home');
      } else {
        toast.error(response.data.message || 'Registration failed');
      }
    } catch (err) {
      toast.error('Server error. Please try again later.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-white px-4">
      <form
        onSubmit={handleRegister}
        className="bg-surface p-8 rounded-xl shadow-xl w-full max-w-sm"
      >
        <h2 className="text-2xl text-clr font-bold text-center mb-6">Register</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 bg-background text-white placeholder-muted border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Name"
          className="w-full mb-4 px-4 py-2 bg-background text-white placeholder-muted border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          Register
        </button>

        <div className="mt-4 text-sm text-muted text-center">
          Already have an account?
          <button
            type="button"
            onClick={() => navigate('/')}
            className="ml-2 text-primary hover:underline"
          >
            Log in
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
