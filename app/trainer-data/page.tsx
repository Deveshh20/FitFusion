'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UserCircleIcon } from '@heroicons/react/24/solid'; // Import the UserCircleIcon

const TrainerDataPage = () => {
  const [trainersData, setTrainersData] = useState<any[]>([]); // Use a proper type if you have one

  useEffect(() => {
    const fetchTrainersData = async () => {
      try {
        const response = await axios.get('/api/users/trainers-data');
        setTrainersData(response.data);
      } catch (error) {
        console.error('Error fetching trainers data:', error);
      }
    };

    fetchTrainersData();
  }, []);

  if (trainersData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className='h-[60vh] w-[60vw] bg-neutral-100 text-stone-800 absolute left-[250px] mt-20 rounded-2xl border overflow-hidden border-neutral-200  scrollable-container'>
      <h1 className='p-4 text-stone-800 font-semibold text-3xl'>Hire your Trainer!</h1>
      <div className='p-4'>
        {trainersData.map((trainer) => (
          <div key={trainer._id} className='mb-4 flex bg-white w-full px-4 py-4 rounded-2xl h-24 items-center justify-between'>
            <div className='flex items-center'>
              <UserCircleIcon className='h-16 w-16 text-gray-400 mr-4' /> {/* Profile Icon */}
              <div className='flex flex-col'>
                <div>
                  <p className='text-lg font-semibold'>{trainer.fullname}</p>
                  <span className='font-light text-neutral-500'>{trainer.phone} | {trainer.specialties} | {trainer.experienceLevel} | {trainer.certifications}</span>
                </div>
                <div>
                  <p>{trainer.bio}</p>
                </div>
              </div>
            </div>
            <button className="text-neutral-100 font-semibold px-4 py-2 hover:shadow-2xl rounded-lg bg-stone-900">Contact</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainerDataPage;
