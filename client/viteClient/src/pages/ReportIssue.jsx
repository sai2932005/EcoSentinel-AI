import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './ReportIssue.css';

const ISSUE_TYPES = [
  'Garbage Dumping',
  'Water Leak',
  'Sewage Overflow',
  'Polluted Water',
  'Open Drain',
  'Dead Tree',
  'Construction Waste',
  'Plastic Waste',
  'Other',
];

const SEVERITY_LEVELS = ['Low', 'Medium', 'High', 'Critical'];

function ReportIssue() {
  const navigate = useNavigate();

  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState('idle');
  const [step, setStep] = useState('form');

  const [analyzing, setAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState(null);
  const [aiResult, setAiResult] = useState(null);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const detectLocation = () => {
    setLocationStatus('loading');
    if (!navigator.geolocation) {
      setLocationStatus('unsupported');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocationStatus('success');
      },
      (error) => {
        console.error(error);
        setLocationStatus('error');
      }
    );
  };

  // Step 1: send image to Gemini for analysis (nothing saved yet)
  const handleAnalyze = async (e) => {
    e.preventDefault();
    setAnalysisError(null);

    if (!imageFile) {
      setAnalysisError('Please upload a photo of the issue.');
      return;
    }
    if (!location) {
      setAnalysisError('Please detect your location before submitting.');
      return;
    }

    setAnalyzing(true);

    try {
      const formData = new FormData();
      formData.append('image', imageFile);

      const response = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'AI analysis failed');
      }

      const result = await response.json();
      setAiResult(result);
      setStep('confirm');
    } catch (error) {
      setAnalysisError(error.message);
    } finally {
      setAnalyzing(false);
    }
  };

  // Step 2: user confirms (possibly corrected) data — NOW we actually save
  const handleConfirmSubmit = async () => {
    setSubmitError(null);
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('description', description);
      formData.append('latitude', location.lat);
      formData.append('longitude', location.lng);
      formData.append('issueType', aiResult.issueType);
      formData.append('severity', aiResult.severity);
      formData.append('confidence', aiResult.confidence);
      formData.append('recommendation', aiResult.recommendation);

      const response = await fetch('http://localhost:5000/api/reports', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

      const savedReport = await response.json();
      if(savedReport.duplicate){
        alert(savedReport.message)
      }
      navigate(`/report/${savedReport.report._id}`);
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const updateAiField = (field, value) => {
    setAiResult((prev) => ({ ...prev, [field]: value }));
  };

  const goBackToForm = () => {
    setStep('form');
    setAiResult(null);
  };

  // ---------- CONFIRMATION SCREEN ----------
  if (step === 'confirm' && aiResult) {
    return (
      <div className="report-page">
        <h1>Confirm AI Analysis</h1>
        <p className="confirm-subtitle">
          Review what our AI detected. You can correct anything before submitting.
        </p>

        <div className="confirm-card">
          <img src={imagePreview} alt="Uploaded issue" className="confirm-image" />

          <div className="form-group">
            <label>Issue Type</label>
            <select
              value={aiResult.issueType}
              onChange={(e) => updateAiField('issueType', e.target.value)}
            >
              {ISSUE_TYPES.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Severity</label>
            <select
              value={aiResult.severity}
              onChange={(e) => updateAiField('severity', e.target.value)}
            >
              {SEVERITY_LEVELS.map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>

          

          <div className="confidence-display">
            <span>AI Confidence: {aiResult.confidence}%</span>
            <div className="confidence-bar">
              <div className="confidence-fill" style={{ width: `${aiResult.confidence}%` }} />
            </div>
          </div>

          <div className="ai-reasoning">
            <strong>AI's reasoning:</strong>
            <p>{aiResult.reasoning}</p>
          </div>

          <div className="form-group">
            <label>Recommended Action</label>
            <textarea
              rows="3"
              value={aiResult.recommendation}
              onChange={(e) => updateAiField('recommendation', e.target.value)}
            />
          </div>

          {submitError && <p className="status-text error">{submitError}</p>}

          <div className="confirm-buttons">
            <button type="button" className="edit-button" onClick={goBackToForm}>
              ← Edit Photo/Location
            </button>
            <button
              type="button"
              className="submit-button"
              onClick={handleConfirmSubmit}
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : '✓ Confirm & Submit'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---------- UPLOAD FORM (default) ----------
  return (
    <div className="report-page">
      <h1>Report an Environmental Issue</h1>

      <form className="report-form" onSubmit={handleAnalyze}>
        <div className="form-group">
          <label>Upload a Photo</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="image-preview" />
          )}
        </div>

        <div className="form-group">
          <label>Location</label>
          <button type="button" className="location-button" onClick={detectLocation}>
            Detect My Location
          </button>
          {locationStatus === 'loading' && <p className="status-text">Detecting...</p>}
          {locationStatus === 'success' && location && (
            <p className="status-text success">
              Location found: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
            </p>
          )}
          {locationStatus === 'error' && (
            <p className="status-text error">Couldn't get location. Check permissions.</p>
          )}
          {locationStatus === 'unsupported' && (
            <p className="status-text error">Geolocation not supported by this browser.</p>
          )}
        </div>

        <div className="form-group">
          <label>Description (optional)</label>
          <textarea
            rows="4"
            placeholder="Add any extra details..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {analysisError && <p className="status-text error">{analysisError}</p>}

        <button type="submit" className="submit-button" disabled={analyzing}>
          {analyzing ? 'Analyzing with AI...' : 'Analyze Photo'}
        </button>
      </form>
    </div>
  );
}

export default ReportIssue;