import traceback

import highlight_io
from flask import Flask, jsonify
from flask_cors import CORS
from highlight_io.integrations.flask import FlaskIntegration

app = Flask(__name__)

# Enable CORS for the Flask app
CORS(app)

H = highlight_io.H(
    "0dq8zjqd",
    integrations=[FlaskIntegration()],
    instrument_logging=True,
    service_name="fullstack",
    service_version="1.0.0",
    environment="development",
)


@app.errorhandler(Exception)
def handle_general_exception(exc: Exception):
    highlight_io.H.get_instance().record_exception(exc)
    return jsonify(error="internal error", message=str(exc), trace=traceback.format_exc()), 503


@app.route('/')
def hello_world():
    return jsonify(message="Hello, World!")  # Return a JSON response


@app.route("/hello")
def hello():
    return f"<h1>bad idea {5 / 0}</h1>"


if __name__ == '__main__':
    app.run(debug=True)
