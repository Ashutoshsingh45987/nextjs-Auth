import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/usermodel';
import {NextRequest,NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs';
import { sendEmail } from '@/utils/mailer';



connect();

export async function POST(request:NextRequest){
    try {
        const reqBody=  await request.json();
        console.log(reqBody);
        const {username,email,password}= reqBody;               // this is destructrign of the data or extraction

        // validation
        const user =  await User.findOne({email});
        if(user){

            return NextResponse.json({error:"User already exists"},{status:400});
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword=  await bcryptjs.hash(password,salt);

        const newUser = new User({
            username:username,
            email:email,
            password:hashedPassword,
        })

        const savedUser = await newUser.save();
        console.log(savedUser);

        // send verificatijn email
        await sendEmail({email,emailType:"VERIFY",userId:savedUser._id});

        return NextResponse.json({
            message:"User Registerd Successfully",
            success:true,

        }) 


    } catch (error:any) {

       return NextResponse.json({error:error.message},{status:500});
        
    }
}