
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import {useState,useEffect} from 'react'
import {Link} from 'react-router-dom' 
import 'leaflet/dist/leaflet.css';
import L from "leaflet";
import './MapPage.css'

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
const severityColors = {
  Low: '#40916c',
  Medium: '#f4a261',
  High: '#e76f51',
  Critical: '#c0392b',
};



const severitySize = {
  Low: 22,
  Medium: 26,
  High: 32,
  Critical: 38,
};





L.Icon.Default.mergeOptions({
    iconRetinaUrl : markerIcon2x ,
    iconUrl: markerIcon,
    shadowUrl:markerShadow
}) ;


function getSeverityIcon(severity) {
  const color = severityColors[severity] || '#888';
  const size = severitySize[severity] || 24;
 return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      background-color: ${color};
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 0 4px rgba(0,0,0,0.4);
    "></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}



function MapPage(){

    const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    const centerPosition = [17.385, 78.4867];
      useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/reports');
        if (!response.ok) throw new Error('Failed to load reports');
        const data = await response.json();
        setReports(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);



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

                {reports.map((report)=>(
                    <Marker key={report._id} position={[report.latitude,report.longitude]} icon={getSeverityIcon(report.severity)}> 
                    <Popup className='popupDetails'>
                        <strong>{report.issueType}</strong>
                        <br/>
                        {report.address}
                        <br/>
                        Severity: {report.severity}
                        <br/>
                        <Link to={`/report/${report._id}`}>View Details</Link>

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