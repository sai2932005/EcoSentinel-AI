
import {Link} from 'react-router-dom' 
import './Landing.css' 


function LandingPage(){
    return(
        <div className='landing'>
            <section className='hero'>
                <h1>EcoSentinal</h1> 
                <p>Turn what you see into action</p>
                <Link to="/report" className="ctaBtn">Report an Issue</Link>
            </section>
            

            <section className='whycard'>
                <h2>Why this matters</h2>
                <p>Every year, millions of liters of water are lost, lakes become polluted,
                and illegal dumping goes unreported because environmental issues are
                discovered too late or lack actionable evidence. EcoSentinel AI empowers
                citizens to become environmental inspectors by turning photos into
                structured, location-aware reports that NGOs and communities can act on.</p>

            </section>

            <section className='how_it_works'>
                <h2>How it works</h2>
                <div className='steps'>
                <div className='step'>
                    <span className='stepNumber'>1</span>
                    <p>Snap a photo of the issue</p>
                </div>
                <div className='step'>
                    <span className='stepNumber'>2</span>
                    <p>AI classifies it & suggests severity</p>
                </div>
                <div className="step">
                    <span className='stepNumber'>3</span>
                    <p>You confirm or correct it</p>
                </div>
                 <div className="step">
                    <span className='stepNumber'>4</span>
                    <p>Report goes live on the map</p>
                </div>
                </div>


            </section>
        </div>
    )
}

export default LandingPage ;