
const { Timestamp } = require('mongodb');
const mongoose = require('mongoose') ;

const reportSchema = new mongoose.Schema({
    image :{
        type :String ,
        required : true 
    },
    issueType :{
        type:String ,
        required:true ,
        enum :[
            'Garbage Dumping',
        'Water Leak',
        'Sewage Overflow',
        'Polluted Water',
        'Open Drain',
        'Dead Tree',
        'Construction Waste',
        'Plastic Waste',
        'Other',
        ]
    } ,
    recommendation:{
        required:true ,
        type:String
    } ,
    confidence :{
        type:Number,
        min:0,
        max:100,
        
    },
    severity:{
        type:String ,
        required:true ,
        enum :['High','Critical','Low','Medium']
    }
    ,
    description :{
        type:String ,
       
    } ,
    latitude:{
        type:Number ,
        required:true
    } ,
    longitude :{
        type:Number ,
        required:true
    },
    address: {
        type: String,
    },
    confirmedCount: {
        type: Number,
        default: 1,
    },

    status :{
        type:String ,
        enum:['Pending', 'In Progress', 'Resolved'] ,
        default :'Pending'
    }
} , {timestamps : true})


module.exports = mongoose.model('Report',reportSchema) ;