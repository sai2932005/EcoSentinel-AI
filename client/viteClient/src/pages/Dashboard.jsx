
import "./Dashboard.css"

const dummyReports = [
  { id: '1', issueType: 'Garbage Dumping', severity: 'High' },
  { id: '2', issueType: 'Water Leak', severity: 'Medium' },
  { id: '3', issueType: 'Sewage Overflow', severity: 'Critical' },
  { id: '4', issueType: 'Plastic Waste', severity: 'Low' },
  { id: '5', issueType: 'Garbage Dumping', severity: 'Medium' },
];


function Dashboard(){

    const totalReports = dummyReports.length;

    const severityCounts = dummyReports.reduce((acc,report)=>{
        acc[report.severity] = (acc[report.severity] ||0) +1 ;
        return acc ;
    },{})
    const categoryCounts = dummyReports.reduce((acc,reports)=>{
        acc[reports.issueType] = (acc[reports.issueType]|| 0) +1 ;
        return acc ;
    },{}) ;


    const severityColors = {
        Low: '#40916c',
        Medium: '#f4a261',
        High: '#e76f51',
        Critical: '#c0392b',
    };

    const severityRank = {
        Critical: 4,
        High: 3,
        Medium: 2,
        Low: 1,
    };

    const sortedbySeverity = [...dummyReports].sort((a,b)=> severityRank[b.severity] - severityRank[a.severity]) ;

    const mostUrgent = sortedbySeverity.slice(0,3) ;


    

    return(
        <div className="dashboardPage">
            <h1>Dashboard</h1>

            <div className="summary-cards">
                <div className="card">
                    <p className="card-number">{totalReports}</p>
                    <p className="card_label">Total Reports</p>
                </div>

                {Object.entries(severityCounts).map(([severity,count])=>(
                    <div key={severity} className="card" style={{borderTop:`6px solid ${severityColors[severity]} || '#ccc'`}}>
                        <p className="card-number">{count}</p>
                        <p className="card_label">{severity}</p>
                    </div>

                ))}
                </div>

                <div className="urgent-section">
                    <h1>Most Urgent Issues</h1> 
                    <ul className="urgent-list">
                        {mostUrgent.map((report)=>(
                            <li className="urgent-item">
                                <span className="urgent-issue">{report.issueType}</span>
                                <span className="urgent-badge" style ={{backgroundColor: severityColors[report.severity]}}>{report.severity}</span>



                            </li>
                        ))

                        }



                    </ul>




                </div>

                <div className="category-section">
                    <h1>Reports by Category</h1>
                    <ul className="category-list">
                        {Object.entries(categoryCounts).map(([category,count])=>(
                            <li key={category} className="category-item">
                                <span>{category}</span>
                                <span className="category-count">{count}</span>
                            </li>
                        ))}
                    </ul>
                </div>
  
        </div>
    )
}


export default Dashboard ;