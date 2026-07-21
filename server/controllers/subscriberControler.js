const Subscriber = require("../models/subscriber.js") ;

const subscribe = async(req,res) =>{
    try{
    const {email} = req.body ;

    if(!email){
       return  res.status(400).json({message:"email is required"})
    }

    const existing =await Subscriber.findOne({email}) ;
    if(existing){
        return res.status(200).json({message:"You are already subscribed"})
    }

    const emailsend = new Subscriber({email}) ;
    await emailsend.save() ;
    res.status(200).json({message:"You are succesfully subscribed to alerts"}) ;


}catch(error){
    res.status(400).json({message:error.message}) ;
}



}

module.exports = {subscribe} ;