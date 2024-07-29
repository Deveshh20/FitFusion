// File: models/Request.ts
import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
    trainerId: { type: mongoose.Schema.Types.ObjectId, ref: 'TrainerDetails', required: true },
    traineeId: { type: mongoose.Schema.Types.ObjectId, ref: 'TraineeDetails', required: true },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Request || mongoose.model('Request', requestSchema);
