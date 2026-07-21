
const mongoose = require('mongoose') ;

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI) ;
        console.log("MONGO DB is connected");
    }
    catch(error){
        console.log("Mongodb connection was failed ", error) ;

        process.exit(1) ;
    }
}

module.exports = connectDB ; 