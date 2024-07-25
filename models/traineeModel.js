import mongoose from 'mongoose';
import { type } from 'os';

const traineeSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    fullname: {
        type: String,
        required: [true, 'Please provide Full Name']
    },
    email:{
        type:String,
        required:[true,'Please provide your email address']
    },
    phone: {
        type: String,
        required: [true, 'Please provide Phone Number']
    },
    gender: {
        type: String,
        required: true
    },
    experienceLevel: {
        type: Number,
        required: true
    },
    specialties: {
        type: String,
        required: [true, 'Enter your specialties in training']
    },
    certifications: {
        type: String,
        required: [true, 'Enter your certifications']
    },
    bio: {
        type: String,
        required: [true, 'Enter some details about your training']
    },
    dob: {
        type: Date,
        required: [true, 'Enter your Date of Birth']
    },
    profileCompleted: {
        type: Boolean,
        default: false // Set default to false
    }
});

export default mongoose.models.TraineeDetails || mongoose.model('TraineeDetails', traineeSchema);
