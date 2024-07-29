import mongoose from 'mongoose';

const traineeSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: [true, 'Please provide Full Name']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email address']
    },
    phone: {
        type: String,
        required: [true, 'Please provide Phone Number']
    },
    gender: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: [true, 'Enter your Date of Birth']
    },
    height: {
        type: String,
        required: [true, 'Please provide your height']
    },
    weight: {
        type: String,
        required: [true, 'Please provide your weight']
    },
    bmi: {
        type: String,
        required: [true, 'Please provide your BMI']
    },
    fitnessGoals: {
        type: String,
        required: [true, 'Please provide your fitness goals']
    },
    medicalConditions: {
        type: String,
        required: [true, 'Please provide any medical conditions']
    },
    preferredWorkoutTypes: {
        type: String,
        required: [true, 'Please provide your preferred workout types']
    },
    workoutFrequency: {
        type: String,
        required: [true, 'Please provide your workout frequency']
    },
    preferredWorkoutTimes: {
        type: String,
        required: [true, 'Please provide your preferred workout times']
    },
    fitnessLevel: {
        type: String,
        required: [true, 'Please provide your fitness level']
    },
    dietaryRestrictions: {
        type: String,
        required: [true, 'Please provide any dietary restrictions']
    },
    dailyCaloricIntakeGoal: {
        type: String,
        required: [true, 'Please provide your daily caloric intake goal']
    },
    preferredMealTypes: {
        type: String,
        required: [true, 'Please provide your preferred meal types']
    },
    foodAllergies: {
        type: String,
        required: [true, 'Please provide any food allergies']
    },
    profileCompleted: {
        type: Boolean,
        default: false // Set default to false
    }
});

export default mongoose.models.TraineeDetails || mongoose.model('TraineeDetails', traineeSchema);
