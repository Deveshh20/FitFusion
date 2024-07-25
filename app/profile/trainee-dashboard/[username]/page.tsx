'use client'
import React, { useState } from 'react';
import Head from 'next/head';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import logo from '@/app/asset/logo.png'; // Replace with the actual path to your logo
import axios from 'axios'; // Import axios for making HTTP requests
import { useRouter } from 'next/navigation';

const TrainerDashboard = ({ params }: { params: { username: string } }) => {
  const router=useRouter()
  const { username } = params; 
  const [trainee, setTrainee] = useState({
    username:username,
    fullname: '',
    email: '',
    phone: '',
    gender: '',
    experienceLevel: '',
    specialties: '',
    certifications: '',
    bio: '',
    dob: null as Date | null,
    photo: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`/api/users/update-trainee/${username}`, trainee);
      console.log('Success:', response.data);
      router.push(`/profile/trainee-profile/${username}`)
      // Handle success (e.g., show a success message or redirect)
    } catch (error:any) {
      console.error('Error:', error.response?.data || error.message);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className=" absolute left-[300px] min-h-screen max-w-[900px] flex items-center justify-center px-6 py-8">
      <Head>
        <title>Sign Up as Trainer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full max-w-screen bg-white/85 dark:bg-gray-800 rounded-lg shadow-2xl p-6 space-y-6">

        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl dark:text-white">
          Add Trainer Details
        </h1>

        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          <h2 className="text-lg font-semibold leading-tight tracking-tight text-gray-900 md:text-xl dark:text-white">
            Personal Information:
          </h2>
          <div className='max-w-full gap-x-10 justify-between flex-col border-t-2 border-b-2 border-gray-500 px-4 py-4 rounded'>
            {/* here */}
            {/* end here */}
            <div className='max-w-full gap-x-10 justify-between flex mt-10 px-4 py-4 rounded-lg'>
            <div>
              <label htmlFor="fullname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
              <input
                type="text"
                name="fullname"
                id="fullname"
                value={trainee.fullname}
                onChange={(e) => setTrainee({ ...trainee, fullname: e.target.value })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={trainee.email}
                onChange={(e) => setTrainee({ ...trainee, email: e.target.value })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
              <input
                type="text"
                name="phone"
                id="phone"
                value={trainee.phone}
                onChange={(e) => setTrainee({ ...trainee, phone: e.target.value })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Add Phone number"
                required
              />
            </div>

            <div>
              <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
              <select
                name="gender"
                id="gender"
                value={trainee.gender}
                onChange={(e) => setTrainee({ ...trainee, gender: e.target.value })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                <option value="">Select your gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="N/A">Prefer not to say</option>
              </select>
            </div>

            <div>
              <label htmlFor="dob" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date of Birth</label>
              <DatePicker
                selected={trainee.dob}
                onChange={(date: Date | null) => setTrainee({ ...trainee, dob: date })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                dateFormat="yyyy-MM-dd"
                placeholderText="Select date"
              />
            </div>
            </div>
          </div>


          {/* Professional Information */}
          <h2 className="text-lg font-semibold leading-tight tracking-tight text-gray-900 md:text-xl dark:text-white">
          Professional Information
          </h2>
          <div className=''>
          <div>
            <label htmlFor="experienceLevel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Experience Level</label>
            <input
              type="text"
              name="experienceLevel"
              id="experienceLevel"
              value={trainee.experienceLevel}
              onChange={(e) => setTrainee({ ...trainee, experienceLevel: e.target.value })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="e.g., Intermediate"
              required
            />
          </div>

          <div>
            <label htmlFor="specialties" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Specialties</label>
            <input
              type="text"
              name="specialties"
              id="specialties"
              value={trainee.specialties}
              onChange={(e) => setTrainee({ ...trainee, specialties: e.target.value })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="e.g., Strength Training"
              required
            />
          </div>

          <div>
            <label htmlFor="certifications" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Certifications</label>
            <input
              type="text"
              name="certifications"
              id="certifications"
              value={trainee.certifications}
              onChange={(e) => setTrainee({ ...trainee, certifications: e.target.value })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="e.g., Certified Personal Trainer"
              required
            />
          </div>

          <div>
            <label htmlFor="bio" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bio</label>
            <textarea
              name="bio"
              id="bio"
              value={trainee.bio}
              onChange={(e) => setTrainee({ ...trainee, bio: e.target.value })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write a short bio about yourself"
              rows={4}
              required
            />
          </div>
          </div>

          <button type="submit" className="text-neutral-100 font-semibold px-4 py-3 hover:shadow-2xl rounded-lg mt-6 max-w-[200px] bg-stone-900">
            Save changes
          </button>
          <button type="submit" className="text-stone-900 font-semibold px-6 py-3 hover:shadow-2xl rounded-lg mt-6 max-w-[200px] bg-neutral-200 ml-8"onClick={() => router.push(`/profile/trainer-dashboard/${username}`)}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default TrainerDashboard;



