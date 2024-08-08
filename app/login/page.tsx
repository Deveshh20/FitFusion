'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import logo from '@/app/asset/logo.png';
import Image from "next/image";
import Link from 'next/link';


export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const[secret,setSecret]=useState("")

    const onLogin = async (e: any) => {
        e.preventDefault(); 
    
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login Success", response.data);
    
            const { role, username, profileCompleted,password } = response.data;
            console.log(password)
            axios.put("https://api.chatengine.io/users/",{
                username:username,
                secret:password
            },{headers:{"Private-key":'2b508d21-8c12-4e1e-9083-e67e1133c7a7'}})
            // Redirect based on the user's role and profile completion status
            if (role === 'trainer') {
                if (profileCompleted) {
                    router.push(`/profile/trainer-profile/${username}`);
                } else {
                    router.push(`/profile/trainer-dashboard/${username}`);
                }
            } else if (role === 'trainee') {
                if (profileCompleted) {
                    router.push(`/profile/trainee-profile/${username}`);
                } else {
                    router.push(`/profile/trainee-dashboard/${username}`);
                }
            }
    
        } catch (error: any) {
            console.log('Login failed');
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="rounded-lg shadow-2xl  min-h-screen flex items-center justify-center px-6 py-8">
            <Head>
                <title>Sign in to your account</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="w-full max-w-md bg-white/85 dark:bg-gray-800 rounded-lg shadow-2xl p-6 space-y-6">
                <a href="#" className="flex items-center justify-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <Image src={logo} className="w-16 h-18" alt='logo' />
                    FitFusion
                </a>

                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Sign in to your account
                </h1>

                <form className="space-y-4 md:space-y-6" onSubmit={onLogin}>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" name="email" id="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                    </div>

                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" name="password" id="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>

                    <div className="flex items-start">
                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
                        <div className="ml-3 text-sm">
                            <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
                                I accept the <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Terms and Conditions</a>
                            </label>
                        </div>
                    </div>

                    <button type="submit" className="text-neutral-100 font-semibold px-4 py-3 hover:shadow-2xl rounded-lg mt-6 w-full bg-stone-900" disabled={buttonDisabled}>
                        Sign in
                    </button>

                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Don&apos;t have an account? <Link href='/signup' className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                    </p>

                </form>
            </div>
        </div>
    );
}
