import doctorModel from "../models/doctorModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appintmentModel.js"


const changeAvailability = async (req, res)=>{
    try{
        const {docId} = req.body
        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId, {available: !docData.available})
        res.json({success: true, message: "Availability changed"})

    }catch(error){
        console.log(error)
        res.json({success: false, message: error.message})
    
    }
}

const doctorList = async (req, res)=>{
    try{
        const doctors = await doctorModel.find({}).select(['-password','-email'])
        res.json({success: true, doctors}) 
    }catch(error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

//API for doctor login

 const loginDoctor = async (req, res)=>{
    try{
        const {email, password} = req.body
         const doctor = await doctorModel.findOne({email})
          
         if(!doctor){
            return res.json({success: false, message: "Invalid credentials email does not match"})

         }
         const isMatch =  await bcrypt.compare(password, doctor.password);
         if(isMatch){
            const token = jwt.sign({id: doctor._id},process.env.JWT_SECRET)
            res.json({success: true, token})

         }else{
            res.json({success: false, message: "Invalid Password"})
         }
    }catch(error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
 }


 // API to get doctor appointments for doctor panel

 const appointmentsDoctor = async (req, res)=>{
    try {
        
        const {docId} = req.body
        const appointments = await appointmentModel.find({docId})
        
        res.json({success:true, appointments})
        
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
 }


 // API to mark appointment completed for doctor panel

 const appointmentComplete = async (req, res)=>{
    try {
        const {appointmentId, docId} = req.body
        const appointmentData = appointmentModel.findById(appointmentId)

        if(appointmentData && appointmentData.docId === docId){
            await appointmentModel.findByIdAndUpdate(appointmentId, {isCompleted: true})
            return res.json({success: true, message : "Appointment completed"})

        }else{
            return res.json({success: false, message : "Mark Failed"})
        }
        
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
 }


 // API to cancel appointment for doctor panel

 const appointmentCancel = async (req, res)=>{
    try {
        const {appointmentId, docId} = req.body
        const appointmentData = appointmentModel.findById(appointmentId)

        if(appointmentData && appointmentData.docId === docId){
            await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled : true})
            return res.json({success: true, message : "Appointment Cancelled"})

        }else{
            return res.json({success: false, message : "Cancellation Failed"})
        }
        
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
 }

export {changeAvailability, doctorList, loginDoctor,appointmentsDoctor, appointmentCancel, appointmentComplete}