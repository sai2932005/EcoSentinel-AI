
const multer = require('multer') ;
const path = require('path') ;
const {v4 :uuidv4}  = require("uuid") ;

const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinaryConfig.js');


const storage = new CloudinaryStorage({
    cloudinary : cloudinary ,
    params:{
        folder : 'ecosentinel-reports',
        allowed_formats : ['jpg','jpeg','png'],
    }
}) ;





const fileFilter = (req,file,cb) =>{
    if(file.mimetype.startsWith("image/")){
        cb(null,true) ;
    }else{
        cb(new Error("Only image files are allowed") , false)
    }


};


const upload = multer({
    storage,
    fileFilter,
    limits : {fileSize : 5 * 1024 *1024} ,

})


module.exports = upload ;



