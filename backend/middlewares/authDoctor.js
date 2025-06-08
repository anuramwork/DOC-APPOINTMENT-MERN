import jwt from 'jsonwebtoken'

// Doctor authentication middleware

 const authDoctor = async (req, res, next)=>{
        try{

            const {dtoken} = req.headers
            if(!dtoken){
                return res.json({success: false, message: "No dtoken available -Not Authorized Login Again"})
            }
            const token_decode = jwt.verify(dtoken,process.env.JWT_SECRET)
            console.log(token_decode.id)
            //initialize req.body becaue for get request req.body may not be present
            req.body = req.body || {}

            req.body.docId = token_decode.id 
           
            next()

        }catch(error){
        console.log(error)
        res.json({success: false, message: error.message})

    }
 }

 export default authDoctor;