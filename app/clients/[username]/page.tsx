// pages/clients/[username].tsx
'use client'
import axios from 'axios';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface ClientRequest {
  _id: string;
  traineeId: {
    fullname: string;
    email: string;
    phone: string;
    fitnessGoals:string
  };
}
interface Clients{
  _id:string,
  name:string
}

const ClientPage = () => {
  const pathname = usePathname();
  const username = pathname.split('/').pop();
  const [requests, setRequests] = useState<ClientRequest[]>([]);
  const [clients, setClients] = useState<Clients[]>([]);
  const[selectRequest,setSelectRequest]=useState<any>()
  const[action,setAction]=useState('')
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (username) {
      fetchRequests();
    }
  }, [username]);

  async function fetchRequests() {
    try {
      const response = await axios.get(`/api/users/client-request/${username}`);
      console.log('Response data:', response.data);
      setRequests(response.data);
      setLoading(false);
    } catch (error: any) {
      console.error('Error fetching client requests:', error);
      setLoading(false); // Make sure to stop loading in case of error
    }
  }
  const handelClick=(request:any,e:string)=>{
    setSelectRequest(request)
    setAction(e)
    console.log(request);
    console.log(action);
    
    
  }
  async function requestHandler() {
    if (selectRequest && action) {
      try {
        const response = await axios.patch(`/api/users/request-handler/${username}`, {
          requestId: selectRequest._id,
          action: action,
        });
        alert(`Request has been ${action}`);
        // Refresh requests after handling
        fetchRequests();
      } catch (error: any) {
        console.error('Error sending request:', error);
        alert('Failed to send request to the trainer.');
      }
    }
  }

  useEffect(() => {
    if (selectRequest && action) {
      requestHandler();
    }
  }, [selectRequest, action]);

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
              <p><strong>Full Name:</strong> {request.traineeId.fullname}</p>
              <p><strong>Email:</strong> {request.traineeId.email}</p>
              <p><strong>Phone:</strong> {request.traineeId.phone}</p>
              <p><strong>Fitness Goal:</strong> {request.traineeId.fitnessGoals}</p>
              <div className='flex gap-x-2'>
              <button onClick={()=>handelClick(request,"accept")}>Accept</button>
              <button onClick={()=>handelClick(request,"reject")}>Reject</button>
              </div>
              {/* Display other client details if needed */}
            </li>
          ))}
        </ul>
        
      )}
      <h1>Clients</h1>
      {clients.length === 0 ? (
        <p>No clients yet</p>
      ) : (
        <ul>
          {clients.map(client => (
            <li key={client._id}>
              <p><strong>Name:</strong> {client.name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ClientPage;
