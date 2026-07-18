
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import {Link} from 'react-router-dom' 
import 'leaflet/dist/leaflet.css';
import L from "leaflet";
import './MapPage.css'

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl : markerIcon2x ,
    iconUrl: markerIcon,
    shadowUrl:markerShadow
}) ;

const dummyReports = [
  {
    id: '1',
    issueType: 'Garbage Dumping',
    severity: 'High',
    lat: 17.385,
    lng: 78.4867,
  },
  {
    id: '2',
    issueType: 'Water Leak',
    severity: 'Medium',
    lat: 17.4,
    lng: 78.47,
  },
];


function MapPage(){

    const centerPosition = [17.385, 78.4867];


    return(
        <div className='map-page'>
            <h1>Reported Issues Map</h1>
            <div className='map-wrapper'>
                <MapContainer 
                    center={centerPosition}
                    zoom={12} 
                    scrollWheelZoom = {true}
                    className='leaflet-container'
                    >
                
                <TileLayer
                    attribution='&copy ; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' 
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                
                
                />

                {dummyReports.map((report)=>(
                    <Marker key={report.id} position={[report.lat,report.lng]}> 
                    <Popup className='popupDetails'>
                        <strong>{report.issueType}</strong>
                        <br/>
                        Severity: {report.severity}
                        <br/>
                        <Link to={`/report/${report.id}`}>View Details</Link>

                    </Popup>





                    </Marker>

                ))

                }





            </MapContainer>

            </div>
            
        </div>
    )
}

export default MapPage ;