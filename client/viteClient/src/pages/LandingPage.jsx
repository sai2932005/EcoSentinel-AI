import {useState} from 'react' 
import {Link} from 'react-router-dom' 
import './Landing.css' 


function LandingPage(){

    const[email,setEmail] = useState('');
    const [subscribeMsg,setSubscribeMsg] = useState('');
    const [subscribing , setSubscribing] = useState(false) ;

    const handleSubscribe = async(e)=>{
        e.preventDefault();
        setSubscribing(true);
        setSubscribeMsg('') ;

        try{
            const response =await  fetch("http://localhost:5000/api/subscribe",{
                method:"POST",
                headers :{
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({email}) 
            })

            const data = await response.json() ;
            setSubscribeMsg(data.message) ;
            setEmail('');
        }
        catch(error){
            setSubscribeMsg("Something went wrong ,Please try again after sometime");

        }
        finally{
            setSubscribing(false);
        }
    }







    return(
        <div className='landing'>
            <section className='hero'>
                <h1>EcoSentinal</h1> 
                <p>Turn what you see into action</p>
                <Link to="/report" className="ctaBtn">Report an Issue</Link>
            </section>
            

            <section className='whycard'>
                <div>
                <h2>Why this matters</h2>
                <p>Every year, millions of liters of water are lost, lakes become polluted,
                and illegal dumping goes unreported because environmental issues are
                discovered too late or lack actionable evidence. EcoSentinel AI empowers
                citizens to become environmental inspectors by turning photos into
                structured, location-aware reports that NGOs and communities can act on.</p>
                </div>
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


            <section className="subscribe-card">
                <div>
                <h2>Get Alerted to Urgent Issues</h2>
                <p>NGOs and volunteers: subscribe to get instant email alerts for High/Critical severity reports.</p>
                <form className="subscribe-form" onSubmit={handleSubscribe}>
                    <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                    <button type="submit" disabled={subscribing}>
                    {subscribing ? 'Subscribing...' : 'Subscribe'}
                    </button>
                </form>
                {subscribeMsg && <p className="subscribe-message">{subscribeMsg}</p>}
                </div>
            </section>





        </div>
    )
}

export default LandingPage ;