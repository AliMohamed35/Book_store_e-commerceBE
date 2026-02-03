import nodemailer from "nodemailer"
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import logger from "../logs/logger"

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const transporter = nodemailer.createTransport({
    service:"gmail",
    port : 537,
    secure: false,
    auth:{
        user:"alykrooser@gmail.com",
        pass: "avrf efic mcdb zfix"
    }
})

export const getOTPEmailTemplate = (otp: number): string =>{
    const templatePath = path.join(__dirname, "../layout/template.html");
    let template = fs.readFileSync(templatePath, "utf-8")
    return template.replace("{{OTP_CODE}}", otp.toString())
}

export const sendMail = async (to: string, subject: string, html: string = "") => {
    const mailOptions = {
        from: "alykrooser@gmail.com",
        to,
        subject,
        html
    }
    
    return await transporter.sendMail(mailOptions)
}
