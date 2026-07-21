
const express = require('express');
const router = express.Router() ;
const{subscribe} = require('../controllers/subscriberControler.js') ;

router.post("/",subscribe) ;

module.exports = router;