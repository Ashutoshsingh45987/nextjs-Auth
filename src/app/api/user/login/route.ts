import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/usermodel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'






connect();


export async function POST(request:NextRequest){

    try {

        const reqBody= await request.json();
        console.log(reqBody);
        const{email,password}= reqBody;

        const user= await User.findOne({email});
        if(!user){
            return NextResponse.json({error:"not valid email"},{status:500});
        }

        const validPassword = await bcryptjs.compare(password,user.password);
        if(!validPassword){
            return NextResponse.json({message:"check your credentials"},{status:400});
        }
        // token and cookies creation
        const tokenData ={
            id:user._id,
            username:user.username,
            email:user.email
        }

        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:'3d'});

        const response =  NextResponse.json({message:"User Logged in Successfully",success:true});

        response.cookies.set("token",token,{
            httpOnly:true
        })

        return response;


        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500});
        
    }

}