'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";
import {toast} from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Signuppage() {

    const  navigate = useRouter();

  const[user, setUser]= useState(
    {
        email:"",
        password:"",
        username:""
    }
  )  

  const [disableButton, setDisabelButton]= useState(false);
  const[loading,setLoading]=useState(false);

  const onSubmit= async ()=>{
    try {
        setLoading(true);
        const response = await axios.post("/api/user/signup",user);
        console.log("Signup Successful", response.data);
        setLoading(false);
        navigate.push("/login");
        
    } catch (error:any) {
        console.log("Signup Failed");
        toast.error(error.message)
        
    }
  }

  useEffect(()=>{
    if(user.password.length>0 && user.email.length>0 && user.username.length>0){
        setDisabelButton(false);
    }
    else{
        setDisabelButton(true);
    }
  },[user])
  return(
    <div className="flex flex-col items-center justify-center py-2 min-h-screen">
        <h1>{loading?"Processing": "Signup"}</h1>
        <hr/>
        <label htmlFor="username">username</label>
        <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
         value={user.username} 
         onChange={(e)=>setUser({...user,username:e.target.value})}
         id="username" placeholder="username" type="text"
        ></input>

        <label htmlFor="email">email</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="email"
            />
        <label htmlFor="password">password</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="password"
            />

        <button
            onClick={onSubmit}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{disableButton ? "No signup" : "Signup"}</button>
            <Link href="/login">Visit login page</Link>
        
    </div>
  );
}


