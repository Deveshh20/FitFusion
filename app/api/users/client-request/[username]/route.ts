// pages/api/users/client-request/[username]/route.ts
import { connect } from '@/dbConfig/dbConfig';
import Request from '@/models/requestModel';
import TrainerDetails from '@/models/trainerModel';
import TraineeDetails from '@/models/traineeModel'; 

import { NextRequest, NextResponse } from 'next/server';

connect();

export async function GET(req: NextRequest, { params }: { params: { username: string } }) {
  try {
    const { username } = params;
    const trainer = await TrainerDetails.findOne({ username });

    if (!trainer) {
      return NextResponse.json({ error: 'Trainer not found' }, { status: 404 });
    }

    const trainerId = trainer._id;

    // Fetch requests and populate traineeId
    const requests = await Request.find({ trainerId, status: 'pending' })
      .populate('traineeId', 'fullname email phone fitnessGoals'); // Populate trainee details

    if (requests.length === 0) {
      return NextResponse.json({ error: 'No requests found' }, { status: 404 });
    }

    console.log(requests);
    return NextResponse.json(requests, { status: 200 });
    
  } catch (error: any) {
    console.error('Error fetching client requests:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 400 });
  }
}
