import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import TraineeDetails from '@/models/traineeModel'
import TrainerDetails from '@/models/trainerModel'
import { NextRequest,NextResponse } from 'next/server';

connect()

export async function request(req:NextRequest) {
    const reqBody=await req.json();
    const{trainerId,traineeName,message}=reqBody

    // const trainer=await TrainerDetails.findOne({trainerId})
    // if(!trainer){
    //     return NextResponse.json({ error: "User does not exist" }, { status: 400 });
    // }
    try {
        await TrainerDetails.findByIdAndUpdate(
            trainerId,
            { $addToSet: { clients: traineeName } }, // Use $addToSet to avoid duplicates
            { new: true } // Return the updated document
          );
          return NextResponse.json({ mssg: "client added" }, { status: 200 });
    } catch (error:any) {
        return NextResponse.json({error:"something went worng in adding the client"},{status:400})
    }

}