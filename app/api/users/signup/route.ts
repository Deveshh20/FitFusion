import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { sendEmail } from '@/helpers/mailer';

// connecting to database
connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password, role } = reqBody;

        // validation
        console.log(reqBody);
        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        // hashing the password
        const salt = await bcryptjs.genSaltSync(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role // Add the role to the new user
        });

        const savedUser = await newUser.save();
        console.log(savedUser);

        // send verification mail
        await sendEmail({ email, emailType: 'VERIFY', userId: savedUser._id });
        console.log('sending email');
        

        return NextResponse.json({
            message: "User Registered Successfully",
            success: true,
            savedUser
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
