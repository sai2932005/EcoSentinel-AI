
import {BrowserRouter,Routes,Route} from 'react-router-dom' ;

import  Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import ReportIssue from './pages/ReportIssue';
import MapPage from './pages/MapPage';
import ReportDetails from './pages/ReportDetails';

function App() {
  return(
    <BrowserRouter>
      <div style={{display :'flex' , flexDirection:'column' , minHeight:'100vh'}}>
        <Navbar/>
        <main style={{flex : '1'}}>
          <Routes>
            <Route path="/" element={<Landing/>}/>
            <Route path="/report" element={<ReportIssue/>}/>
            <Route path="/dashboard" element ={<Dashboard/>} />
            <Route path="/report/:id" element={<ReportDetails/>}/>
            <Route path="/map" element={<MapPage/>}/>




          </Routes>



        </main>
        <Footer />




      </div>
    
    
    
    </BrowserRouter>
  )




}

export default App
