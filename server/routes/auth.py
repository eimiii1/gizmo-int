from flask import Blueprint, request, jsonify
from models import db, User

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