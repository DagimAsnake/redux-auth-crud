import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {  logout } from '../store/AuthSlice';

const Navbar = () => {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const logoutHandler = () => {
        dispatch(logout());
        navigate("/");
      };
    
    return (
        <nav className="bg-gray-800 fixed w-full z-10">
            <div className="max-w-full sm:px-6 ">
                <div className="relative flex items-center justify-between h-16">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    </div>
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex-shrink-0">
                            <Link to="/" className="text-white font-bold text-xl">My Blog</Link>
                        </div>
                        <div className="hidden sm:block sm:ml-6">
                            <div className="flex space-x-4">
                                <Link to="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                                <Link to="/create" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Add Blog</Link>
                            </div>
                        </div>
                        <div className="sm:ml-auto">
                            <div className="hidden sm:block sm:ml-6">
                                <div className="flex space-x-4">
                                    {!isLoggedIn && (
                                        <>
                                            <Link to="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                                            <Link to="/signup" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Signup</Link>
                                        </>
                                    )}
                                    {isLoggedIn && <button onClick={logoutHandler} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Logout</button> }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
        </nav>
    )
}

export default Navbar