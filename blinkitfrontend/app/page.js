"use client";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import blinkitlogo from '../public/blinkitfrontendlogo.png'


import { useEffect, useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
export default function Home() {
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/dashboard');
      // redirect('/dashboard');
    }
  }, []);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value)
    } else if (e.target.name === "password") {
      setPassword(e.target.value)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password
    };

    try {
      console.log(process.env.BACKEND_URL)
      let response = await fetch(`https://blinkitbackend.onrender.com/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      response = await response.json();

      if (response.success !== true) {
        throw new Error('Failed to create user');
      } else {
        localStorage.setItem('token', response.authtoken);
        // redirect('/dashboard');
        console.log('User created successfully');
        toast.success(`Welcome `, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setTimeout(() => {

          router.push('/dashboard');
        }, 3000);
      }
      return response;
    } catch (error) {
      console.error('Error creating user:', error.message);
    }
  };
  return (

    <>
      <ToastContainer />
      <Navbar />
      <div className="flex min-h-full flex-col justify-center  px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-20 w-auto" src={blinkitlogo.src} alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
              <div className="mt-2">
                <input id="email" onChange={handleChange} name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>

              <div className="mt-2">
                <input onChange={handleChange} id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">Sign in</button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?
            <Link href="/signup" className="font-semibold leading-6 text-green-600 hover:text-green-500">Sign Up</Link>
          </p>
        </div>
      </div>
    </>
  );
}
