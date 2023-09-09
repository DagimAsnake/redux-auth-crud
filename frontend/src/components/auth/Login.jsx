import React, { useState } from 'react';
import { useDispatch} from 'react-redux';
import { login } from '../store/AuthSlice';
import { loginUser } from '../store/UserSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async(e) => {
    e.preventDefault();

    const formData = {
        username: username,
        password: password
      }
    
    dispatch(loginUser(formData))
    const res =  await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await res.json()
      console.log(data)
      if (res.status === 200) {
        dispatch(login(data.token));
        navigate("/");
      } else {
        console.error('Registration failed:', data.msg);
      }
  };

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <form className="max-w-lg mx-auto" onSubmit={handleLogin}>
        <h1 className="text-4xl font-bold mb-8">Log In</h1>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              name="username"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-black text-white hover:bg-white hover:text-black hover:border-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:shadow-md"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;