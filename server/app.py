from flask import Flask
from config import Config
from models import db
from routes.auth import auth_bp
from flask_jwt_extended import JWTManager
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object(Config)

CORS(app, origins=["http://localhost:5173", "http://127.0.0.1:5173"])

db.init_app(app)
app.register_blueprint(auth_bp)

jwt = JWTManager(app)

@app.route('/')
def home():
    return "Hello nig"

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)