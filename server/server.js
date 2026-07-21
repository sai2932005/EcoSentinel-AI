const express = require('express') ;
const cors = require('cors');
const path = require('path'); 
const connectDB = require('./config/db');
require('dotenv').config() ;
const reportRoutes = require('./routes/reportRoutes.js') ;
const analyzeRoutes = require('./routes/analyzeRoutes.js') ;
const subscriberRoute = require('./routes/subscriberRoutes.js') ;


const app = express() ;
connectDB() ;

app.use(express.json()) ;
app.use(cors());
const PORT = process.env.PORT || 5000 ;


app.use('/api/reports',reportRoutes) ;
app.use('/api/analyze',analyzeRoutes) ; 
app.use("/api/subscribe",subscriberRoute) ;
app.use('/uploads',express.static(path.join(__dirname,"uploads")))
app.get("/",(req,res)=>{
    res.send("EcoSentinel Ai is running backend      less go  BROOOOOOO!!!!")
})




app.listen(PORT , ()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})