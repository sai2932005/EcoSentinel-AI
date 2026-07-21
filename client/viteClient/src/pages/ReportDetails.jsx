import{Link, useParams} from 'react-router-dom';
import {useState,useEffect} from 'react' ;
import "./ReportDetails.css"

const dummyReports = [
  {
    id: '1',
    issueType: 'Garbage Dumping',
    severity: 'High',
    confidence: 87,
    description: 'Large pile of household waste dumped near the roadside drain.',
    recommendation: 'Immediate municipal cleanup recommended to prevent water contamination.',
    lat: 17.385,
    lng: 78.4867,
    status: 'Pending',
    createdAt: '2026-07-15',
    image: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=600',
  },
  {
    id: '2',
    issueType: 'Water Leak',
    severity: 'Critical',
    confidence: 92,
    description: 'Continuous water leakage from a broken pipeline flooding the street.',
    recommendation: 'Urgent repair needed to prevent water wastage and road damage.',
    lat: 17.4,
    lng: 78.47,
    status: 'In Progress',
    createdAt: '2026-07-16',
    image: 'https://image.telanganatoday.com/wp-content/uploads/2025/09/Srinagar-Colony_V_jpg--816x480-4g.webp?sw=1536&dsz=816x480&iw=615&p=false&r=1.25',
  },
];

const severityColors = {
  Low: '#40916c',
  Medium: '#f4a261',
  High: '#e76f51',
  Critical: '#c0392b',
};


const ReportDetails =  ()=>{

    const {id} = useParams();


  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/reports/${id}`);
        if (!response.ok) {
          throw new Error('Report not found');
        }
        const data = await response.json();
        setReport(data);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]) 


  if (loading) {
    return <div className="details-page"><p>Loading report...</p></div>;
  }


  

    


    if(error || !report){
        return(

        
        <div className='detailsPage'>
            <h1>Report Not found</h1>
            <p>{`we couldnt find the report with id ${id}`}</p>
            <Link to="/dashboard" className='back-link'>Back to Dashboard</Link>



        </div>
        )
    }

    console.log(report) ;
    console.log(report.image);




    return(
        <div className='detailsPage'>
            <Link to="/dashboard" className='back-link'>Back to Dashboard</Link>
            <div className='detailsCard'>
               <img
  src={`${import.meta.env.VITE_API_URL}${report.image}`}
  alt={report.issueType}
  className='detailsImage'/>


                <div className='detailsHeader'>
                    <h1>{report.issueType}</h1>
                    <span className="severity-badge" style={{backgroundColor:severityColors[report.severity]}}>{report.severity}</span>


                </div>


                {report.confirmedCount > 1 && (
                  <p className="confirmed-badge">
                    ✅ Confirmed by {report.confirmedCount} people
                  </p>
                )}



                <p className='confidence'>AI Confidence : {report.confidence}%</p>
                <div className='detailsSection'>
                    <h2>Description :</h2>
                    <p>{report.description}</p>
                </div>

                <div className='detailsSection'>
                    <h2>Recommended Action :</h2>
                    <p>{report.recommendation}</p>
                </div>

                <div className='metaDetails'>
                    <p><strong>Location:</strong> {report.address || `${report.latitude.toFixed(4)}, ${report.longitude.toFixed(4)}`}</p>
                    <p><strong>Status : </strong>{report.status}</p>
                    <p><strong>Reported on : </strong>{report.createdAt}</p>
                </div>






            </div>
            
        </div>
    )
}

export default ReportDetails ;