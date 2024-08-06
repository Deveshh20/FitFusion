import { connect } from '@/dbConfig/dbConfig';
import Request from '@/models/requestModel';
import TrainerDetails from '@/models/trainerModel';
import TraineeDetails from '@/models/traineeModel'; // Import TraineeDetails model if not already imported
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function PATCH(req: NextRequest, { params }: { params: { username: string } }) {
  try {
      const { username } = params;
      const { requestId, action } = await req.json();
      console.log(username);
      console.log(requestId);
      console.log(action);

      const trainer = await TrainerDetails.findOne({ username });
      if (!trainer) {
          return NextResponse.json({ error: 'Trainer not found' }, { status: 404 });
      }

      const trainerId = trainer._id;

      const request = await Request.findOne({ _id: requestId, trainerId });
      if (!request) {
          return NextResponse.json({ error: 'Request not found' }, { status: 404 });
      }

      const trainee = await TraineeDetails.findOne({ _id: request.traineeId });
      if (!trainee) {
          return NextResponse.json({ error: 'Trainee not found' }, { status: 404 });
      }

      if (action === 'accept') {
          request.status = 'accepted';
          trainer.clients.push(trainee._id); // Add trainee ID to trainer's clients array
          await trainer.save();
      } else if (action === 'reject') {
          request.status = 'rejected';
      } else {
          return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
      }

      // Delete the request document from the database
      await Request.deleteOne({ _id: requestId });

      return NextResponse.json({ message: 'Request updated successfully' }, { status: 200 });

  } catch (error: any) {
      console.error('Error updating request:', error);
      return NextResponse.json({ error: 'Something went wrong' }, { status: 400 });
  }
}
