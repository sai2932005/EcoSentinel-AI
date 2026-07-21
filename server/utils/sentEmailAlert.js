const {Resend} = require("resend") ;

const resend = new Resend(process.env.RESEND_API_KEY) ;

const sendEmailAlert = async(toEmails,report)=>{
    try{
        await resend.emails.send({
            from: 'EcoSentinel AI <onboarding@resend.dev>',
            to : toEmails,
            subject : `${report.severity} Alert : ${report.issueType}` ,
            html:`<div style="font-family: sans-serif; max-width: 500px; margin: 0 auto;">
          <h2 style="color: #1b4332;">New ${report.severity} Environmental Report</h2>
          <p><strong>Issue:</strong> ${report.issueType}</p>
          <p><strong>AI Confidence:</strong> ${report.confidence}%</p>
          <p><strong>Description:</strong> ${report.description || 'No description provided'}</p>
          <p><strong>Recommended Action:</strong> ${report.recommendation}</p>
          <p><strong>Location:</strong> ${report.address}</p>
          <p>
            <a href="http://localhost:5173/report/${report._id}" 
               style="background-color: #1b4332; color: white; padding: 10px 18px; 
                      border-radius: 6px; text-decoration: none; display: inline-block; margin-top: 10px;">
              View Full Report
            </a>
          </p>
        </div>
            
            
            
            
            `
        });
        console.log(`Alert emails sent to ${toEmails.length} subscribers`);

    }
    catch(error){
        console.log("failed to send emails : ",error)
    }
}


module.exports = sendEmailAlert