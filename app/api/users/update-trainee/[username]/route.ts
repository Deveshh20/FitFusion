import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import TraineeDetails from '@/models/traineeModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        console.log(reqBody);
        
        const { username, fullname, email, phone, gender, dob, height, weight, bmi, fitnessGoals, medicalConditions, preferredWorkoutTypes, workoutFrequency, preferredWorkoutTimes, fitnessLevel, dietaryRestrictions, dailyCaloricIntakeGoal, preferredMealTypes, foodAllergies} = reqBody;

        // Ensure username is defined
        const user = await User.findOne({ username });
        if (!user) {
            return NextResponse.json({ error: 'Cannot find the user' }, { status: 404 });
        }
        const traineeDetails = new TraineeDetails({
            username,
            fullname,
            email,
            phone,
            gender,
            dob,
            height,
            weight,
            bmi,
            fitnessGoals,
            medicalConditions,
            preferredWorkoutTypes,
            workoutFrequency,
            preferredWorkoutTimes,
            fitnessLevel,
            dietaryRestrictions,
            dailyCaloricIntakeGoal,
            preferredMealTypes,
            foodAllergies,
            profileCompleted: true
        },
        );

        await traineeDetails.save();
        console.log(traineeDetails);
        
        return NextResponse.json({
            message: "Trainer details saved successfully",
            success: true,
            traineeDetails
        });
    } catch (error: any) {
        console.error('Error updating trainer details:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
