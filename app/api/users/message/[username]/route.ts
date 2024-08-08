// pages/api/users/client-request/[username]/route.ts
import { connect } from '@/dbConfig/dbConfig';
import Request from '@/models/requestModel';
import User from '@/models/userModel';
import TraineeDetails from '@/models/traineeModel'; 

import { NextRequest, NextResponse } from 'next/server';

connect();

export async function GET(req: NextRequest, { params }: { params: { username: string } }) {
  try {
    const { username } = params;
    const user = await User.findOne({ username });

    if (!User) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({username: user.username,
        password:user.password,}, { status: 200 });
    
  } catch (error: any) {
    console.error('Error fetching client requests:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 400 });
  }
}
