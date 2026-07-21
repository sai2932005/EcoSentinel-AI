const express = require('express') ;

const {createReport,getReportById,getReports}  = require('../controllers/reportControllers.js') ;
const upload = require('../config/multerConfig.js') ;

const router = express.Router() ;

router.post("/", upload.single("image"),createReport);
router.get("/",getReports);
router.get('/:id',getReportById)



module.exports = router ;