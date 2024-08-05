// pages/api/users/client-request.ts
import { connect } from '@/dbConfig/dbConfig';
import Request from '@/models/requestModel';
import TraineeDetails from '@/models/traineeModel';
import { NextApiRequest, NextApiResponse } from 'next';

connect();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { trainerId } = req.query;

    const requests = await Request.find({ trainerId, status: 'pending' }).populate('traineeId', 'fullname');
    const acceptedClients = await Request.find({ trainerId, status: 'accepted' }).populate('traineeId', 'fullname');

    if (!requests) {
      return res.status(404).json({ error: 'No Requests found' });
    }

    const formattedRequests = requests.map(request => ({
      _id: request._id,
      clientName: request.traineeId.fullname,
      accepted: request.status === 'accepted',
    }));

    const formattedAcceptedClients = acceptedClients.map(client => ({
      _id: client._id,
      clientName: client.traineeId.fullname,
    }));

    return res.status(200).json({ requests: formattedRequests, acceptedClients: formattedAcceptedClients });
  } catch (error: any) {
    return res.status(400).json({ error: 'Something went wrong' });
  }
}
