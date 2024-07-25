import { connect } from '@/dbConfig/dbConfig';
import TrainerDetails from '@/models/trainerModel';
import { NextRequest, NextResponse } from 'next/server';

// Connecting to the database
connect();

export async function GET(req: NextRequest) {
    try {
        const trainers = await TrainerDetails.find({});
        return NextResponse.json(trainers, { status: 200 }); // Return the fetched data with status 200
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
