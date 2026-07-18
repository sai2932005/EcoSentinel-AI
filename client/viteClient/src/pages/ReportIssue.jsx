
import { useState} from "react";
import './ReportIssue.css' 

function ReportIssue(){

    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [description, SetDescription] = useState('');
    const [location, setLocation] = useState(null);
    const [locationStatus, setLocationStatus] = useState('idle');


    const handleImageChange =(e)=>{

        const file = e.target.files[0] ;
        if(!file) return ;

        setImageFile(file) ;

        setImagePreview(URL.createObjectURL(file)) ;

    }

    const detectLocation =()=>{
        setLocationStatus("loading") ;

        if(!navigator.geolocation){
            setLocationStatus('unsupported');
            return ;
        }

        navigator.geolocation.getCurrentPosition((position) =>{
            setLocation({
                lat :position.coords.latitude,
                lng: position.coords.longitude
            });
             setLocationStatus('success');
            
            
        }, (error) =>{
                console.log(error);
                setLocationStatus('error')
            }
        ) ;

    }




    const handleSubmit=(e)=>{
        e.preventDefault() ;
        console.log(imageFile,description,location) ;
        alert("Form data is logged in console , (not connected to backend yet)")
    }




    return(
        <div className="report_page">
            <h1>Report an Environmental Issue</h1>
            <form onSubmit={handleSubmit} className="formPage">

                <div className="form-group">
                    <label>Upload your image</label>
                    <input type="file" accept="image/*" onChange={handleImageChange}v/>
                    {imagePreview && (
                        <img src={imagePreview} alt="preview" className="image-preview" />
                    )}
                </div>

                <div className="form-group">
                    <label>Location</label>
                    <button type="button" onClick={detectLocation} className="locationBtn">detect my location</button>

                    {locationStatus === 'loading' && <p className="status-text">Detecting...</p>}
                    {locationStatus === 'success' && location && ( <p className="status-text success" >Location found :{location.lat.toFixed(4)} ,{location.lng.toFixed(4)} </p> )}

                    {locationStatus === 'error' && <p className="status-text error">Couldnt get location, please check your browser permissions</p>}

                    {locationStatus === 'unsupported' && <p className="status-text error" >GeoLocation is not supported by this browser</p>}

                   
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea className="textArea" rows ="4" placeholder="Add any extra details" value={description}  onChange={(e)=> SetDescription(e.target.value)}/>
                </div>

                <button className="submit-button" type="submit">Analyze and submit</button>




            </form>

            
        </div>
    )
}

export default ReportIssue ;