from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity 
from models import db, Deck, Note

notes_bp = Blueprint('notes', __name__, url_prefix='/api/decks')

@notes_bp.route('<int:deck_id>/notes', methods=['POST'])
@jwt_required()
def create_note(deck_id):
    user_id = get_jwt_identity()

    deck = Deck.query.filter_by(id=deck_id, user_id=user_id).first()
    if not deck:
        return jsonify({'error' : 'Deck not found.'}), 404

    data = request.get_json()
    title = data.get('title')
    content = data.get('content')

    if not title or not content:
        return jsonify({'error' : 'Title and content are required.'}), 400

    new_note = Note(title=title, content=content, deck_id=deck.id)
    db.session.add(new_note)
    db.session.commit()

    return jsonify({
        'id' : new_note.id,
        'title' : new_note.title,
        'content' : new_note.content,
        'deck_id' : new_note.deck_id
    }), 201

@notes_bp.route('<int:deck_id>/notes', methods=['GET'])
@jwt_required()
def get_notes(deck_id):
    user_id = get_jwt_identity()

    deck = Deck.query.filter_by(id=deck_id, user_id=user_id).first()
    if not deck:
        return jsonify({'error' : 'Deck not found.'}), 404

    return jsonify([
        {'id' : note.id, 'title' : note.title, 'content' : note.content, 'deck_id' : note.deck_id}
        for note in deck.notes
    ]), 200