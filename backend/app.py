from flask import Flask, request, jsonify
from wb import get_countries_indicators

# Create Flask app
app = Flask(__name__)

# CORS
@app.after_request
def after_request(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type")
    response.headers.add("Access-Control-Allow-Methods", "GET")
    return response

# Default route
@app.route("/", methods=["GET"])
def home():
    return "Flask API up and running."

@app.route("/indicators", methods=["POST"])
def get_indicators():
    try:
        # Get the country list from the request JSON body
        countries = request.json["countries"]
    except KeyError:
        return jsonify({"error": "No countries provided."}), 400  # Return a 400 Bad Request status

    response_dict = get_countries_indicators(countries)
    return jsonify(response_dict)


if __name__ == "__main__":
    app.run(debug=True, port=3001)
