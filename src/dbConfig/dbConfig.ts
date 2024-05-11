import mongoose from "mongoose";

export async function connect(){
    try {
        await mongoose.connect(process.env.MONGO_URL!);         // here see we have used ! 
        const connection= mongoose.connection;

        connection.on('connected',()=>{
            console.log("connected to the database Successfully")
        })

        connection.on('error',(error)=>{
            console.log("DB connection error ,make sure db is running"+error);
            process.exit();
        })
    } catch (error) {
        console.log("Something went wrong in connecting the Datatabase");
        console.log(error);
    }

}

