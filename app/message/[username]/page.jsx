'use client'
import axios from 'axios'
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic';

import { ChatEngine } from 'react-chat-engine'

const Page = () => {
  const pathname = usePathname();
  const username = pathname.split("/").pop();
  const [userName, setUserName] = useState(username);
  const [secret, setSecret] = useState("");

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const response = await axios.get(`/api/users/message/${username}`);
        const { password } = response.data;
        setSecret(password);
        console.log('Fetched password:', password); // Debugging
      } catch (error) {
        console.error('Error finding user details', error);
      }
    }
    fetchUserDetails();
  }, [username]);

  console.log('Username:', userName);
  console.log('Secret:', secret);

  return (
    <div>
      {userName && secret ? (
        <ChatEngine
        height='100vh'
          projectID={'48c21346-0164-4f23-a872-1858374ac42e'}
          userName={userName}
          userSecret={secret}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Page;
