'use client'
import React, { useState } from 'react';
import Head from 'next/head';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import logo from '@/app/asset/logo.png'; // Replace with the actual path to your logo
import axios from 'axios'; // Import axios for making HTTP requests
import { useRouter } from 'next/navigation';
import { toast } from "react-hot-toast";

const TrainerDashboard = ({ params }: { params: { username: string } }) => {
  const router=useRouter()
  const { username } = params; 
  const [trainer, setTrainer] = useState({
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
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`/api/users/update-trainer/${username}`, trainer);
      console.log('Success:', response.data);
      router.push(`/profile/trainer-profile/${username}`)
      // Handle success (e.g., show a success message or redirect)
    } catch (error:any) {
      console.error('Error:', error.response?.data || error.message);
      // Handle error (e.g., show an error message)
    }
  };

  return (

      <div className="absolute left-[250px] mt-4  bg-white/85 md:h-fit md:w-[1100px] dark:bg-gray-800 rounded-lg shadow-2xl p-6 space-y-6">

        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl dark:text-white">
          Add Trainer Details
        </h1>

        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          <h2 className="text-lg font-semibold leading-tight tracking-tight text-gray-900 md:text-xl dark:text-white">
            Personal Information:
          </h2>
          <div className='md:max-w-full md:gap-x-10 md:justify-between md:flex-col flex border-t-2 border-b-2 border-gray-500 py-2 rounded'>
            {/* here */}
            {/* end here */}
            <div className='md:max-w-full w-full space-y-3 rounded-lg'>
            <div>
              <label htmlFor="fullname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
              <input
                type="text"
                name="fullname"
                id="fullname"
                value={trainer.fullname}
                onChange={(e) => setTrainer({ ...trainer, fullname: e.target.value })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 border-b-2"
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
                value={trainer.email}
                onChange={(e) => setTrainer({ ...trainer, email: e.target.value })}
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
                value={trainer.phone}
                onChange={(e) => setTrainer({ ...trainer, phone: e.target.value })}
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
                value={trainer.gender}
                onChange={(e) => setTrainer({ ...trainer, gender: e.target.value })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                required
              >
                <option value=""disabled selected hidden>Select your gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="N/A">Prefer not to say</option>
              </select>
            </div>

            <div>
              <label htmlFor="dob" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date of Birth</label>
              <DatePicker
                selected={trainer.dob}
                onChange={(date: Date | null) => setTrainer({ ...trainer, dob: date })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block md:w-[1055px] w-[375px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 border-t-2 mb-3"
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
          <div className='space-y-3'>
          <div>
            <label htmlFor="experienceLevel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Experience Level</label>
            <input
              type="text"
              name="experienceLevel"
              id="experienceLevel"
              value={trainer.experienceLevel}
              onChange={(e) => setTrainer({ ...trainer, experienceLevel: e.target.value })}
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
              value={trainer.specialties}
              onChange={(e) => setTrainer({ ...trainer, specialties: e.target.value })}
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
              value={trainer.certifications}
              onChange={(e) => setTrainer({ ...trainer, certifications: e.target.value })}
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
              value={trainer.bio}
              onChange={(e) => setTrainer({ ...trainer, bio: e.target.value })}
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
          <button type="submit" className="text-stone-900 font-semibold px-6 py-3 hover:shadow-2xl rounded-lg mt-6 max-w-[200px] bg-neutral-200 ml-8"onClick={logout}>
            Cancel
          </button>
        </form>
      </div>
  );
};

export default TrainerDashboard;



