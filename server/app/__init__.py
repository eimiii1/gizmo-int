from flask import Flask , jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy 
from dotenv import load_dotenv
import os

load_dotenv()
db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    CORS(app)
    
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    
    db.init_app(app)

    @app.route('/ping')
    def ping():
        return jsonify({'message' : 'pong'})
    
    return app