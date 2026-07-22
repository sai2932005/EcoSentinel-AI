const express = require('express') ;

const {createReport,getReportById,getReports}  = require('../controllers/reportControllers.js') ;
const upload = require('../config/multerConfig.js') ;

const router = express.Router() ;





router.post("/", (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      console.log('=== MULTER/CLOUDINARY ERROR ===');
      console.log(err);
      return res.status(500).json({ message: 'Upload failed', error: err.message || String(err) });
    }
    next();
  });
}, createReport);
router.get("/",getReports);
router.get('/:id',getReportById)



module.exports = router ;