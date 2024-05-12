import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/usermodel';
import { trackDynamicDataAccessed } from 'next/dist/server/app-render/dynamic-rendering';
import {NextRequest,NextResponse} from 'next/server'
import { use } from 'react';

connect();

export async function POST(request:NextRequest){
    try {

        const reqBody = await request.json();
        console.log(reqBody);
        const {token}= reqBody;
        console.log(token);

        const user = await User.findOne({verifyToken:token,verifyTokenExpiry:{$gt: Date.now()}})  

        if(!user){
            return NextResponse.json({error:"Invalid Token"},{status:400});
        }

        // This step is important before u save the user
        user.isVerified= true;
        user.verifyToken=undefined;
        user.verifyTokenExpiry= undefined;

        await user.save()


        return NextResponse.json({
            message:"Email verified successfully",
            success:true,

        },
        {
            status:200
        }
    )



        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500});
    }
}
