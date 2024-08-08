import { connect } from '@/dbConfig/dbConfig';
import Request from '@/models/requestModel';
import TrainerDetails from '@/models/trainerModel';
import TraineeDetails from '@/models/traineeModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    console.log('Request body:', reqBody);  

    const { trainerId, traineeName } = reqBody;

    const trainee = await TraineeDetails.findOne({ username: traineeName });
    if (!trainee) {
      return NextResponse.json({ error: 'Trainee does not exist' }, { status: 405 });
    }

    const request = new Request({
      trainerId,
      traineeId: trainee._id,
      status: 'pending',
    });

    await request.save();

    return NextResponse.json({ message: 'Request sent successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Error:', error); 
    return NextResponse.json({ error: 'Something went wrong' }, { status: 400 });
  }
}
