import {useState} from 'react' 
import {Link} from 'react-router-dom'  
import './Navbarr.css'

function Navbar(){

    const [menuOpen,setmenuOpen] = useState(false) ;


    return(
        <nav className='navbar'>
            <div className='navBarLogo'>🌱 Eco Sentinel</div>
            <button onClick={() =>setmenuOpen(!menuOpen)} className='ToggleBtn'>☰</button> 

            <ul className={`navbarList ${menuOpen ? "open":""}`}>
                <li><Link to="/" onClick={() => setmenuOpen(false)}>Home</Link></li>
                <li><Link to="/report" onClick={() =>setmenuOpen(false)}>Report Issue</Link></li>
                <li><Link to="/map" onClick={() =>setmenuOpen(false)}>Map</Link></li>
                <li><Link to="/dashboard" onClick={() =>setmenuOpen(false)}>Dashboard</Link></li>



            </ul>
        </nav>
    )
}
export default Navbar ;