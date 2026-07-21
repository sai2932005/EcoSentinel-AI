
const express = require('express') ;
const router = express.Router() ;

const {analyzer}= require("../controllers/analyzeController.js") 
const upload = require("../config/multerConfig.js") ;  

router.post("/" , upload.single("image") ,analyzer) ;

module.exports = router ;