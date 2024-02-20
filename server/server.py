from flask import Flask
from firebase_admin import credentials,initialize_app


app = Flask(__name__)

# Members API Route

@app.route("/members")
def members():
    return {"members": ["Member1", "Member2", "Member3"]}

if __name__ == "__main__":
    app.run(debug=True)