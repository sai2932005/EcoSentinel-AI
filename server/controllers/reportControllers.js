
const Report  = require('../models/report.js') ;

const sendAlertEmail = require('../utils/sentEmailAlert.js'); // 🆕
const geoCode = require("../utils/reverseGeocode.js") ;
const Subscriber = require('../models/subscriber.js');


const createReport = async(req,res)=>{
    try{
         console.log('Content-Type header:', req.headers['content-type']);
        console.log('req.file:', req.file);   // 🆕 temporary debug line
        console.log('req.body:', req.body); 
        const { issueType , latitude,longitude ,severity} = req.body ;

        const lat = parseFloat(latitude);
        const lng = parseFloat(longitude) ;


        const RAD = 0.001 ;
        const SEVEN_DAYS_AGO = new Date(Date.now() - 7 *24 *60*60*1000) ;


        const imagePath  = req.file ? `/uploads/${req.file.filename}` : null   ;
        const existingReport = await Report.findOne({
            issueType,
            latitude :{$lte : lat+RAD , $gte : lat - RAD},
            longitude :{$lte : lng+RAD , $gte : lng - RAD},
            createdAt :{$gte : SEVEN_DAYS_AGO}
        })

        if(existingReport){
            existingReport.confirmedCount = (existingReport.confirmedCount || 1 )+1 ;
            await existingReport.save();

            return res.status(200).json({
                duplicate:true ,
                message : `This matches an existing report — confirmed by ${existingReport.confirmedCount} people now.`,
                report : existingReport
            })
        }
        const address =await geoCode(lat,lng);
        const report =  new Report({...req.body ,image: imagePath,address}) ;
        const savedReport = await report.save() ;

        if(severity == "Critical" || severity == "High"){
            const subscriberss  = await Subscriber.find();
            if(subscriberss.length > 0 ){
                const email = subscriberss.map((s)=> s.email) ;
                sendAlertEmail(email,savedReport) ;
            }

        }






        res.status(201).json({duplicate:false ,report : savedReport})
    }
    catch(error){
        res.status(400).json({message : error.message})
    }

};


const getReports =async (req,res)=>{
    try{
        const reports =await Report.find().sort({createdAt : -1}) ;
        res.status(200).json(reports) ;
    }
    catch(error){
        res.status(500).json({message:error.message}) ;
    }

}


const  getReportById = async(req,res)=>{
    try{
        const reportById = await Report.findById(req.params.id) ;
        if(!reportById){
            return res.status(404).json({message : "Report Not Found"})
        }

        res.status(200).json(reportById) ;

    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}


module.exports  = {createReport,getReportById,getReports}
