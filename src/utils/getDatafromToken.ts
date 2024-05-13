import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

export async function getDatafromToken(request:NextRequest){
    try {
        const token:any = request.cookies.get("token");

        const decodedToken:any =  jwt.verify( token ,process.env.TOKEN_SECRET!)

        return decodedToken.id;
        
    } catch (error:any) {
        throw new Error(error.message);
    }

}