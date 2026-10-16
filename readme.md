# KVK Portfolio

A Flask-powered portfolio for K Vishal Kumar, presenting AI, machine-learning, and generative-AI work. It includes a main portfolio page, project catalogue pages, shared static assets, and a downloadable resume.

## Features

- Portfolio page with an introduction, skills, featured projects, and contact links.
- Separate pages for machine-learning and generative-AI projects.
- Resume download endpoint.
- Responsive HTML templates styled with Tailwind CSS and local CSS/JavaScript.
- Flask-CORS enabled for cross-origin requests.

## Pages

| URL | Page |
| --- | --- |
| `/` | Main portfolio |
| `/KVK` | Main portfolio |
| `/projects/ML` | Machine-learning projects |
| `/projects/genai` | Generative-AI projects |
| `/download_resume` | Downloads the resume PDF |

Other paths return the site's not-found page with an HTTP 404 response.

## Run locally

You need Python and pip installed.

1. Open a terminal in this project directory.
2. (Optional) Create and activate a virtual environment:

   ```bash
   python -m venv .venv
   ```

   On Windows:

   ```powershell
   .\.venv\Scripts\Activate.ps1
   ```

   On macOS or Linux:

   ```bash
   source .venv/bin/activate
   ```

3. Install the dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Start the development server:

   ```bash
   python app.py
   ```

5. Visit [http://127.0.0.1:5000](http://127.0.0.1:5000).

The development server runs with Flask debug mode enabled. Do not use it as a production server.

## Production

The requirements include Gunicorn. From the project directory, start the app with:

```bash
gunicorn app:app
```

Configure your hosting platform to run this command and expose the port it provides.

## Project structure

```text
.
├── app.py                  # Flask application and page routes
├── requirements.txt        # Python dependencies
├── readme.md
├── static/
│   ├── image.png           # Portfolio image
│   ├── K Vishal Kumar Resume.pdf
│   ├── script.js           # Shared browser interactions
│   └── style.css           # Shared styles
└── templates/
    ├── portfolio.html      # Main portfolio page
    ├── ml.html             # Machine-learning projects
    ├── genai.html          # Generative-AI projects
    ├── crop.html            # Crop-advisor page template
    └── error.html          # Not-found / under-construction page
```

The Flask routes currently serve the main portfolio, ML, and GenAI templates listed above. Some links shown within the project catalogue refer to separate demo pages or services and are not routes implemented by this Flask app.

## Dependencies

See [`requirements.txt`](./requirements.txt) for the complete list. The app uses Flask to render pages, Flask-CORS for CORS support, and Gunicorn as a production WSGI server. Scikit-learn and pandas are also listed as project dependencies.