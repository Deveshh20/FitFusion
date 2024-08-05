'use client'
import axios from 'axios';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface ClientRequest {
  _id: string;
  clientName: string;
}

const ClientPage = () => {
  const pathname = usePathname();
  const username = pathname.split('/').pop();
  const [requests, setRequests] = useState<ClientRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (username) {
      fetchRequests();
    }
  }, [username]);

  async function fetchRequests() {
    try {
      const response = await axios.get(`/api/users/request-handler/get-requests/${username}`);
      
      // Log the raw response data for debugging
      console.log('Response data:', response.data);

      // Ensure response.data.requests is an array
      if (Array.isArray(response.data.requests)) {
        setRequests(response.data.requests);
      } else {
        console.error('Unexpected response format:', response.data.requests);
      }
      setLoading(false);
    } catch (error: any) {
      console.error('Error fetching client requests:', error);
      setLoading(false); // Make sure to stop loading in case of error
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Client Requests</h1>
      {requests.length === 0 ? (
        <p>No client requests available</p>
      ) : (
        <ul>
          {requests.map(request => (
            <li key={request._id}>
              {request._id}
              {/* Display other client details if needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ClientPage;
