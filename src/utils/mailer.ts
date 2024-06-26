import nodemailer from 'nodemailer';
import User from '@/models/usermodel';
import bcryptjs, { genSalt } from 'bcryptjs';


export const sendEmail = async ({email,emailType,userId}:any)=>{

    try {

       const hashedToken =  await bcryptjs.hash(userId.toString(),10)

       console.log(email);
       console.log("Email Type",emailType);
       console.log(typeof emailType);

        if(emailType==="VERIFY"){
            const updateduser =await User.findByIdAndUpdate(userId,
                {
                    $set: {
                        verifyToken: hashedToken,
                        verifyTokenExpiry: Date.now() + 3600000
                    }
                }, { new: true }
            )
            console.log(updateduser.verifyToken);

            if (!updateduser) {
                throw new Error("User not found"); // Handle error if user is not found
            }
            console.log("updated user for verify",updateduser);
        }
        else if( emailType==="RESET"){
            await User.findByIdAndUpdate(userId, {
                $set: {
                    forgetPasswordToken: hashedToken,
                    forgetPasswordTokenExpiry: Date.now() + 3600000
                }
            }, { new: true })
        }
        console.log("outside if else ");

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "b854c063bd6e03",
              pass: "6fe779e5f508a7"
            }
          });

        const mailOptions= {
            from: 'ashu@ashu.ai', 
            to: email, 
            subject: emailType=== 'VERIFY'?"Verify your email":"Reset your Password", 
            text: "Hello world?", // plain text body
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
          };

        const mailResponse= transport.sendMail(mailOptions);

        return mailResponse;


    } catch (error:any) {
        throw new Error(error.message)
    }
}