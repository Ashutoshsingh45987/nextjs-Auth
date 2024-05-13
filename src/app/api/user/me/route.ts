import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/usermodel";
import { getDatafromToken } from "@/utils/getDatafromToken";
import { NextRequest, NextResponse } from "next/server";




connect();

export async function POST( request:NextRequest){

    try {
        // get the datat from the tokem 
        const userId = await getDatafromToken(request);
        console.log(userId);

        const user= await User.findOne({_id:userId}).select("-password");

        
        return NextResponse.json({
            message:"User found",
            data: user
        })


    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }
}