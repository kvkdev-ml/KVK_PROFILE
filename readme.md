# KVK Portfolio

A Flask-powered portfolio for **K. Vishal Kumar**, showcasing work across machine learning and generative AI. The site combines a personal portfolio, dedicated project galleries, contact links, and a downloadable resume.

[![Python](https://img.shields.io/badge/Python-3-blue?logo=python&logoColor=white)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-web%20app-black?logo=flask&logoColor=white)](https://flask.palletsprojects.com/)

## Contents

- [Highlights](#highlights)
- [Live links](#live-links)
- [Pages and routes](#pages-and-routes)
- [Technology](#technology)
- [Run locally](#run-locally)
- [Deploy](#deploy)
- [Project layout](#project-layout)
- [Configuration and notes](#configuration-and-notes)
- [Contact](#contact)

## Highlights

- Portfolio landing page with an introduction, selected work, skills, career timeline, and contact links.
- Separate galleries for machine-learning and generative-AI projects.
- Resume download served by Flask.
- Responsive page layouts with shared CSS and lightweight, dependency-free browser interactions.
- Flask-CORS enabled for cross-origin requests.
- A custom not-found page returned with HTTP `404` for unknown routes.

## Live links

- **Portfolio:** [kvk-profile-nu.vercel.app](https://kvk-profile-nu.vercel.app/)
- **GitHub:** [kvkdev-ml](https://github.com/kvkdev-ml)
- **LinkedIn:** [Vishal Kumar](https://www.linkedin.com/in/vishal-kumar-95b269390/)
- **Email:** [kvkwork05@gmail.com](mailto:kvkwork05@gmail.com)

## Pages and routes

| Route | Description |
| --- | --- |
| `/` | Main portfolio page |
| `/KVK` | Alias for the main portfolio page |
| `/projects/ML` | Machine-learning project gallery |
| `/projects/genai` | Generative-AI project gallery |
| `/download_resume` | Downloads the resume as `K Vishal Kumar.pdf` |
| Any other path | Not-found page with HTTP `404` |

Project cards may link to independently hosted demos. Those demo destinations are not routes served by this Flask application.

## Technology

| Area | Tools |
| --- | --- |
| Server | Python, Flask |
| Cross-origin requests | Flask-CORS |
| Production WSGI server | Gunicorn |
| Templates | Jinja-rendered HTML |
| Frontend | HTML, CSS, vanilla JavaScript, Tailwind CSS via CDN |

Python dependencies are listed in [`requirements.txt`](./requirements.txt). Tailwind CSS and web fonts are loaded from external CDNs by the templates, so an internet connection is needed to load those assets.

## Run locally

### Prerequisites

- Python 3
- `pip`

### Setup

Run these commands from the project directory.

1. Create a virtual environment:

   ```bash
   python -m venv .venv
   ```

2. Activate it:

   **Windows PowerShell**

   ```powershell
   .\.venv\Scripts\Activate.ps1
   ```

   **macOS / Linux**

   ```bash
   source .venv/bin/activate
   ```

3. Install dependencies:

   ```bash
   python -m pip install -r requirements.txt
   ```

4. Start the Flask development server:

   ```bash
   python app.py
   ```

5. Open [http://127.0.0.1:5000](http://127.0.0.1:5000).

The development server runs with debug mode enabled. It is intended only for local development; use a production WSGI server when deploying.

## Deploy

The project includes Gunicorn. For a platform that supplies a `PORT` environment variable, a typical start command is:

```bash
gunicorn --bind 0.0.0.0:${PORT:-8000} app:app
```

Configure the hosting platform to install dependencies from `requirements.txt` and use its assigned port. The resume PDF is read from the app's `static` directory, so include that file in the deployed application.

## Project layout

```text
KVK_PROFILE/
├── app.py                         # Flask app and page/download routes
├── readme.md                      # Project documentation
├── requirements.txt               # Python dependencies
├── static/
│   ├── K Vishal Kumar Resume.pdf  # Downloadable resume
│   ├── script.js                  # Shared browser interactions
│   └── style.css                  # Shared styles
└── templates/
    ├── error.html                 # Not-found / under-construction page
    ├── genai.html                 # Generative-AI project gallery
    ├── ml.html                    # Machine-learning project gallery
    └── portfolio.html             # Main portfolio page
```

## Configuration and notes

- No environment variables or database are required for the current app.
- Flask-CORS is enabled globally in `app.py`.
- The portfolio content and links are maintained in the HTML templates.
- Keep the resume at `static/K Vishal Kumar Resume.pdf`; the download route uses this exact filename.
- The app's built-in Flask server is for development only. Do not expose it as the production server.

## Contact

Questions, opportunities, or project feedback are welcome:

- **Email:** [kvkwork05@gmail.com](mailto:kvkwork05@gmail.com)
- **GitHub:** [kvkdev-ml](https://github.com/kvkdev-ml)
- **LinkedIn:** [Vishal Kumar](https://www.linkedin.com/in/vishal-kumar-95b269390/)
