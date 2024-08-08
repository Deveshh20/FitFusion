import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import TraineeDetails from '@/models/traineeModel'
import TrainerDetails from '@/models/trainerModel'
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Connecting to the database
connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        // Validation
        console.log(reqBody);

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        }
        console.log("User exists");

        // Checking password
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ error: "Check your credentials" }, { status: 500 });
        }
        let profileCompleted = false;
        // If the user is a trainer, check their profile completion status
        if (user.role === 'trainer') {
            const trainer = await TrainerDetails.findOne({username:user.username});
            if (trainer) {
                profileCompleted = trainer.profileCompleted;
            }
        }
        if (user.role === 'trainee') {
            const trainee = await TraineeDetails.findOne({username:user.username});
            if (trainee) {
                profileCompleted = trainee.profileCompleted;
            }
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
        };
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' });

        const response = NextResponse.json({
            message: "Logged In Successfully",
            success: true,
            role: user.role,
            username: user.username,
            password:user.password,
            profileCompleted
        });


        response.cookies.set('token', token, {
            httpOnly: true
        });

        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
