from flask import Blueprint, request, jsonify
from models import db, User
from flask_jwt_extended import create_access_token

auth_bp = Blueprint('auth', __name__, url_prefix='/api')

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({"error" : "Missing fields"}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({"error" : "Username already taken"}), 409

    if User.query.filter_by(email=email).first():
        return jsonify({"error" : "Email already registered"}), 409

    new_user = User(username=username, email=email)
    new_user.set_password(password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message" : "User created successfully"}), 201

@auth_bp.route('/login', methods=["POST"])
def login():
    data = request.get_json()

    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error' : 'Missing username or password'}), 400

    user = User.query.filter_by(username=username).first()

    if not user or not user.check_password(password):
        return jsonify({'error' : 'Invalid username or password'}), 401

    access_token = create_access_token(identity=str(user.id))

    return jsonify({
        "access_token" : access_token,
        "user" : {
            "id" : user.id,
            "username" : user.username,
            "email" : user.email
        }
    }), 200