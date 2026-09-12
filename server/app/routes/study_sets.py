from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity 
from app import db 
from app.models import StudySet 

study_sets_bp = Blueprint('study_sets', __name__)

@study_sets_bp.route('/', methods=["GET"])
@jwt_required() 
def get_study_sets():
    user_id = get_jwt_identity() 
    study_sets = StudySet.query.filter_by(user_id=user_id).all()
    result = [{'id' : s.id, 'title' : s.title, 'description' : s.description} for s in study_sets]
    return jsonify(result), 200

@study_sets_bp.route('/', methods=['POST'])
@jwt_required()
def create_study_set():
    user_id = get_jwt_identity() 
    data = request.get_json() 
    
    study_set = StudySet(title=data['title'], description=data.get('description'), user_id=user_id)
    db.session.add(study_set)
    db.session.commit()
    
    return jsonify({'message' : 'Study set created', 'id' : study_set.id}), 201

@study_sets_bp.route('<int:id>', methods=['DELETE'])
@jwt_required()
def delete_study_set(id):
    user_id = get_jwt_identity() 
    study_set = StudySet.query.filter_by(id=id, user_id=user_id).first()
    
    if not study_set():
        return jsonify({'message' : 'Study set not found.'}), 404
    
    db.session.delete(study_set)
    db.session.commit()
    
    return jsonify({'message' : 'Study set deleted'}), 200