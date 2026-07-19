from flask import Flask, render_template,request,jsonify
import pickle as pk
app = Flask(__name__)
route_dict = {
    "/": "portfolio.html",
    "/KVK": "portfolio.html",
    "/profile": "profile.html",
    "/skills": "skill.html",
    "/contacts": "error.html",
    "/download_resume": "error.html",
    "/projects/ML": "ml.html",
    "/projects/DL": "dl.html",
    "/diabetes_prediction": "diabetes.html",
    "/crop_recommendation": "crop.html",
    "/email_classification": "email.html"
}
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def page(path):
    route = "/" + path
    if route in route_dict:
        return render_template(route_dict[route])
    return render_template("error.html"), 404
@app.route('/api/<name>', methods=['POST'])
def api_function(name):
    data = request.get_json()
    if name == "diabetes":
        with open("diabetes_model.pkl", "rb") as f:
            model = pk.load(f)
        prediction = int(model.predict([[
            data["pregnancies"],
            data["glucose"],
            data["bp"],
            data["st"],
            data["insulin"],
            data["bmi"],
            data["dpf"],
            data["age"]
        ]])[0])

        return jsonify({
            "prediction": prediction,
            "confidence": 97
        })
    elif name == "spam":
        email = data["email"]
        with open('transform_model.pkl','rb') as mf:
            vectorizer=pk.load(mf)
        with open("email_model.pkl", "rb") as f:
            model = pk.load(f)
        ip = vectorizer.transform([email])
        prediction = 1 if model.predict(ip)[0]=='spam' else 0
        return jsonify({
            "predicion":prediction,
            "confidence":97
        })
    elif name == "crop":
        with open("crop_model.pkl", "rb") as f:
            model = pk.load(f)
        prediction = int(model.predict([[]])[0])
        return jsonify({
            "prediction": "Rice",
            "confidence": 96
        })
    else:
        return jsonify({
            "error": "Invalid API name"
        }), 404
if __name__=='__main__':
    app.run(debug=True)