import nodemailer from "nodemailer"



const sendEmail = async ({ to, subject, html }) => {
    console.log("reached send email in utils");
    
  // Replace with your real SMTP credentials (like from Gmail or Ethereal)
  const transporter = nodemailer.createTransport({
    service: "Gmail", // or use 'ethereal.email' for testing
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Clinic Team" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  },(error, info) =>{
    if(error){
        console.error('Error',error);
        
    }else{
        console.log('Email sent successfully', info.response);
        
    }
  });
};



export default sendEmail;
