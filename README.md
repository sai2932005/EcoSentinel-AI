# 🌱 EcoSentinel AI

**Turn what you see into action.**

EcoSentinel AI empowers citizens to become environmental inspectors by turning photos of environmental issues into structured, location-aware, AI-classified reports — verified by humans, mapped for communities, and pushed directly to NGOs and municipal responders.

---

## The Problem

Every year, millions of liters of water are lost, lakes become polluted, and illegal dumping goes unreported — not because people don't notice, but because there's no fast, structured way to document what they see and get it in front of someone who can act. By the time an issue is escalated through informal channels, it's often too late to prevent real damage.

## The Solution

EcoSentinel AI lets anyone report an environmental issue in under 60 seconds:

1. **Snap a photo** of the issue (garbage dumping, water leaks, sewage overflow, etc.)
2. **AI analyzes it** — Google Gemini classifies the issue type, estimates severity, and recommends action
3. **You confirm or correct** the AI's analysis — nothing is ever saved without human verification
4. **The report goes live** on a public map and NGO-facing dashboard
5. **Critical/High severity reports trigger instant email alerts** to subscribed NGOs and activists

---

## Key Features

- 📸 **Photo-based reporting** with automatic geolocation
- 🤖 **AI-powered classification** (issue type, severity, confidence, reasoning, recommended action) via Google Gemini
- ✅ **Human-in-the-loop verification** — every AI suggestion is reviewable and editable before saving, so nothing goes live unverified
- 🗺️ **Interactive map** with severity-based marker styling (size and color scale with urgency)
- 📊 **NGO dashboard** — total reports, severity breakdown, category breakdown, and a "Most Urgent Issues" quick-glance list
- 🔁 **Duplicate detection** — reports of the same issue type within ~100m and 7 days are merged into a single "confirmed by N people" entry instead of creating spam-like duplicates
- 📧 **Automatic email alerts** — subscribed NGOs/activists get emailed instantly when a High or Critical severity report is submitted
- 📱 **Fully responsive** — usable on both desktop and mobile

---

## Tech Stack

**Frontend:** React (Vite), React Router, Leaflet (maps), plain CSS
**Backend:** Node.js, Express
**Database:** MongoDB Atlas (via Mongoose)
**AI:** Google Gemini API (`gemini-flash-latest`) for image classification
**Image Storage:** Cloudinary
**Email:** Resend
**Deployment:** Vercel (frontend), Render (backend)

---



**The Path:**
```
Citizen sees issue → Opens EcoSentinel → Uploads photo → Location auto-detected
    → AI analyzes image → Citizen confirms/corrects AI → Report saved
    → Map & dashboard update → NGO gets emailed (if High/Critical) → NGO takes action
```

---

## Project Structure

```
EcoSentinel-AI/
├── client/               # React frontend (Vite)
│   └── src/
│       ├── pages/        # Landing, ReportIssue, MapPage, Dashboard, ReportDetails
│       └── components/   # Navbar, Footer
└── server/               # Express backend
    ├── config/           # DB, Multer/Cloudinary, Gemini config
    ├── controllers/       # Route logic (reports, analyze, subscribers)
    ├── models/            # Mongoose schemas (Report, Subscriber)
    ├── routes/            # API route definitions
    └── utils/             # Email alerts, reverse geocoding
```

---



## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/analyze` | Send an image to Gemini for AI classification (no data saved) |
| POST | `/api/reports` | Save a confirmed report (checks for duplicates, sends alerts if High/Critical) |
| GET | `/api/reports` | Get all reports |
| GET | `/api/reports/:id` | Get a single report by ID |
| POST | `/api/subscribe` | Subscribe an email to receive High/Critical alerts |

---

## Known Limitations & Roadmap

This is an MVP built under hackathon time constraints. Known limitations, and what we'd tackle next:

- **Email sending domain:** Currently uses Resend's sandbox sender (`onboarding@resend.dev`), which only delivers to the developer's verified email. Verifying a custom domain would enable alerts to all subscribed NGOs.
- **Rate limiting / spam prevention:** No per-user/per-IP submission limits yet — worth adding via `express-rate-limit`.
- **Low-confidence auto-flagging:** Reports with very low AI confidence could be routed to a "Needs Review" queue instead of publishing immediately.
- **PDF report export:** Planned but not yet built — would let NGOs download a formatted report for offline use or official filing.
- **Moderator/NGO review tools:** Status updates (Pending → In Progress → Resolved) exist in the schema but have no UI yet for NGOs to manage them.
- **SMS/Slack alerts:** Email is the only notification channel currently; SMS (Twilio) or Slack/Discord webhooks would reach time-sensitive responders faster.
- **Authentication:** Deliberately left out of this MVP to keep the core reporting loop frictionless; would be needed for a NGO-side moderation portal.

---

