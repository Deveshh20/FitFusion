import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import TrainerDetails from '@/models/trainerModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        console.log(reqBody);
        
        const { username, fullname, email, phone, gender, experienceLevel, specialties, certifications, bio, dob, photo } = reqBody;

        
        const user = await User.findOne({ username });
        if (!user) {
            return NextResponse.json({ error: 'Cannot find the user' }, { status: 404 });
        }
        const trainerDetails = new TrainerDetails({
            username,
            fullname,
            email,
            phone,
            gender,
            experienceLevel,
            specialties,
            certifications,
            bio,
            dob,
            profileCompleted:true
        });

        await trainerDetails.save();
        console.log(trainerDetails);
        
        return NextResponse.json({
            message: "Trainer details saved successfully",
            success: true,
            trainerDetails
        });
    } catch (error: any) {
        console.error('Error updating trainer details:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
