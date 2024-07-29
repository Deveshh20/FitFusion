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

const TraineeDashboard = ({ params }: { params: { username: string } }) => {
  const router=useRouter()
  const { username } = params; 
  const [trainee, setTrainee] = useState({
    username:username,
    fullname: '',
    email: '',
    phone: '',
    gender: '',
    dob: null as Date | null,
    height: '',
    weight: '',
    bmi:'',
    fitnessGoals: '',
    medicalConditions: '',
    preferredWorkoutTypes: '',
    workoutFrequency: '',
    preferredWorkoutTimes: '',
    fitnessLevel: '',
    dietaryRestrictions: '',
    dailyCaloricIntakeGoal: '',
    preferredMealTypes: '',
    foodAllergies: ''
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
      const response = await axios.post(`/api/users/update-trainee/${username}`, trainee);
      console.log('Success:', response.data);
      router.push(`/profile/trainee-profile/${username}`)
    } catch (error:any) {
      console.error('Error:', error.response?.data || error.message);
    }
  };

  return (

    <div className="absolute left-[250px] mt-4  bg-white/85 md:h-fit md:w-[1100px] dark:bg-gray-800 rounded-lg shadow-2xl p-6 space-y-6">

      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl dark:text-white">
        Add Trainee Details
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
              value={trainee.fullname}
              onChange={(e) => setTrainee({ ...trainee, fullname: e.target.value })}
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
              selected={trainee.dob}
              onChange={(date: Date | null) => setTrainee({ ...trainee, dob: date })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block md:w-[1055px] w-[375px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 border-t-2 mb-3"
              dateFormat="yyyy-MM-dd"
              placeholderText="Select date"
            />
          </div>
          </div>
        </div>


        {/* Health and Fitness Details */}
        <h2 className="text-lg font-semibold leading-tight tracking-tight text-gray-900 md:text-xl dark:text-white">
        Health and Fitness Details
        </h2>
        <div className='space-y-3'>
        <div>
          <label htmlFor="height" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Height (in cms)</label>
          <input
            type="text"
            name="height"
            id="height"
            value={trainee.height}
            onChange={(e) => setTrainee({ ...trainee, height: e.target.value })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="e.g., 175cm"
            required
          />
        </div>

        <div>
          <label htmlFor="weight" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Weight (in kgs)</label>
          <input
            type="text"
            name="weight"
            id="weight"
            value={trainee.weight}
            onChange={(e) => setTrainee({ ...trainee, weight: e.target.value })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="e.g., 70 kg"
            required
          />
        </div>

        <div>
          <label htmlFor="bmi" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Body Mass Index(Bmi)</label>
          <input
            type="text"
            name="bmi"
            id="bmi"
            value={trainee.bmi}
            onChange={(e) => setTrainee({ ...trainee, bmi: e.target.value })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="e.g., 24.22"
            required
          />
        </div>

        <div>
          <label htmlFor="fitnessGoals" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fitness Goals</label>
          <input
            type='text'
            name="fitnessGoals"
            id="fitnessGoals"
            value={trainee.fitnessGoals}
            onChange={(e) => setTrainee({ ...trainee, fitnessGoals: e.target.value })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="e.g., weight loss, muscle gain, endurance improvement"
            required
          />
        </div>
        
        <div>
          <label htmlFor="medicalConditions" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Medical Conditions(if any)</label>
          <input
            type='text'
            name="medicalConditions"
            id="medicalConditions"
            value={trainee.medicalConditions}
            onChange={(e) => setTrainee({ ...trainee, medicalConditions: e.target.value })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write N/A if not"
            required
          />
        </div>
        </div>

        {/* Workout Preferences */}
        <h2 className="text-lg font-semibold leading-tight tracking-tight text-gray-900 md:text-xl dark:text-white">
        Workout Preferences
        </h2>
        <div className='space-y-3'>
        <div>
          <label htmlFor=" preferredWorkoutTypes" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Preferred Workout Types</label>
          <input
            type="text"
            name="preferredWorkoutTypes"
            id="preferredWorkoutTypes"
            value={trainee.preferredWorkoutTypes}
            onChange={(e) => setTrainee({ ...trainee, preferredWorkoutTypes: e.target.value })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="e.g., cardio, strength training, yoga"
            required
          />
        </div>

        <div>
          <label htmlFor="workoutFrequency" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Workout Frequency (days per week)</label>
          <input
            type="text"
            name="workoutFrequency"
            id="workoutFrequency"
            value={trainee.workoutFrequency}
            onChange={(e) => setTrainee({ ...trainee, workoutFrequency: e.target.value })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="e.g., 6 days"
            required
          />
        </div>

        <div>
          <label htmlFor="preferredWorkoutTimes" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Preferred Workout Times</label>
          <input
            type="text"
            name="preferredWorkoutTimes"
            id="preferredWorkoutTimes"
            value={trainee.preferredWorkoutTimes}
            onChange={(e) => setTrainee({ ...trainee, preferredWorkoutTimes: e.target.value })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="e.g., morning, afternoon, evening"
            required
          />
        </div>

        <div>
          <label htmlFor="fitnessLevel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fitness Level</label>
          <input
            type='text'
            name="fitnessLevel"
            id="fitnessLevel"
            value={trainee.fitnessLevel}
            onChange={(e) => setTrainee({ ...trainee, fitnessLevel: e.target.value })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="e.g. beginner, intermediate, advanced"
            required
          />
        </div>
        </div>

        {/* Diet Preferences */}
        <h2 className="text-lg font-semibold leading-tight tracking-tight text-gray-900 md:text-xl dark:text-white">
        Diet Preferences
        </h2>
        <div className='space-y-3'>
        <div>
          <label htmlFor="dietaryRestrictions" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dietary Restrictions</label>
          <input
            type="text"
            name="dietaryRestrictions"
            id="dietaryRestrictions"
            value={trainee.dietaryRestrictions}
            onChange={(e) => setTrainee({ ...trainee, dietaryRestrictions: e.target.value })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="e.g., vegetarian, vegan, gluten-free)"
            required
          />
        </div>

        <div>
          <label htmlFor="dailyCaloricIntakeGoal" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Daily Caloric Intake Goal (in kcals)</label>
          <input
            type="text"
            name="dailyCaloricIntakeGoal"
            id="dailyCaloricIntakeGoal"
            value={trainee.dailyCaloricIntakeGoal}
            onChange={(e) => setTrainee({ ...trainee, dailyCaloricIntakeGoal: e.target.value })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="e.g., 2774 kcals"
            required
          />
        </div>

        <div>
          <label htmlFor="preferredMealTypes" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Preferred Meal Types</label>
          <input
            type="text"
            name="preferredMealTypes"
            id="preferredMealTypes"
            value={trainee.preferredMealTypes}
            onChange={(e) => setTrainee({ ...trainee, preferredMealTypes: e.target.value })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="e.g., high-protein, low-carb"
            required
          />
        </div>

        <div>
          <label htmlFor="foodAllergies" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">FoodAllergies (if any)</label>
          <input
            type='text'
            name="foodAllergies"
            id="foodAllergies"
            value={trainee.foodAllergies}
            onChange={(e) => setTrainee({ ...trainee, foodAllergies: e.target.value })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write N/A if not"
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
export default TraineeDashboard;
