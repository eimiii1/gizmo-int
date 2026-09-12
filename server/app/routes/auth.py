from flask import Blueprint, request, jsonify 
from flask_jwt_extended import create_access_token 
from app import db 
from app.models import User 
from app.services.auth_service import hash_password, check_password 

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json() 
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message' : 'Email already exists.'}), 400
    
    hashed = hash_password(data['password'])
    user = User(username=data['username'], email=data['email'], password=hashed)
    
    db.session.add(user)
    db.session.commit()
    
    return jsonify({'message' : 'User registered successfully'}), 201