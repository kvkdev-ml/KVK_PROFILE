from flask import Flask, render_template,send_file
from flask_cors import CORS
import os
app = Flask(__name__)
CORS(app=app)
route_dict = {
    "/": "portfolio.html",
    "/KVK": "portfolio.html",
    "/download_resume": "error.html",
    "/projects/ML": "ml.html",
    "/projects/genai":"genai.html"
}
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def page(path):
    route = "/" + path
    if route in route_dict:
        return render_template(route_dict[route])
    return render_template("error.html"), 404
@app.route('/download_resume')
def resume():
    return send_file(path_or_file=rf'{os.getcwd()}/static/K Vishal Kumar Resume.pdf',download_name='K Vishal Kumar.pdf')
if __name__=='__main__':
    app.run(debug=True)
