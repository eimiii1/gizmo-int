from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import StudySet, Flashcard, Quiz
from app.services.ai_service import generate_flashcards, generate_quiz

ai_bp = Blueprint('ai', __name__)

@ai_bp.route('/generate', methods=['POST'])
@jwt_required()
def generate():
    user_id = get_jwt_identity()
    data = request.get_json()
    
    text = data.get('text')
    title = data.get('title', 'Untitled')
    
    if not text:
        return jsonify({'message' : 'No text provided'}), 400
    
    study_set = StudySet(title=title, user_id=user_id)
    db.session.add(study_set)
    db.session.commit() 
    
    flashcards = generate_flashcards(text)
    for f in flashcards:
        flashcard = Flashcard(question=f['question'], answer=f['answer'], study_set_id=study_set.id)
        db.session.add(flashcard)