import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

export async function getDatafromToken(request:NextRequest){
    try {
        const token = request.cookies.get("token")?.value || '';
        console.log("heheheh")
        console.log(token); // Inspect the structure of tokenObject

        const decodedToken:any =  jwt.verify( token ,process.env.TOKEN_SECRET!)

        return decodedToken.id;
        
    } catch (error:any) {
        throw new Error(error.message);
    }

}