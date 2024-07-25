'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function VerifyEmailPage() {
    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        setError(false)
        // Extract token from URL
        const urlToken = window.location.search.split('=')[1]
        setToken(urlToken || "")
    }, [])

    useEffect(() => {
        const verifyUserEmail = async (token: string) => {
            try {
                const response = await axios.post('/api/users/verifyemail', { token })
                if (response.status === 200) {
                    setVerified(true)
                    setError(false)
                } else {
                    setError(true)
                }
            } catch (error: any) {
                setError(true)
                console.log(error.response?.data || error.message)
            }
        }
    
        if (token.length > 0) {
            verifyUserEmail(token)
        }
    }, [token])

    return (
        <div className='flex flex-col items-center justify-center max-h-full max-w-screen py-12 px-6'>
            <div className='bg-white shadow-md rounded-lg p-8 max-w-sm w-full'>
                <h1 className='text-2xl font-bold text-gray-800 mb-4'>Email Verification</h1>
                {verified ? (
                    <>
                        <p className='text-lg text-green-600 mb-4'>Your email has been successfully verified!</p>
                        <Link 
                            href='/login' 
                            className='w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200 block text-center'
                        >
                            Go to Login
                        </Link>
                    </>
                ) : (
                    <div>
                        {error ? (
                            <p className='text-lg text-red-600'>There was an error verifying your email. Please try again.</p>
                        ) : (
                            <p className='text-lg text-gray-600'>Verifying your email...</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
