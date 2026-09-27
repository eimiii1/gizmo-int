from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Deck, Flashcard

flashcards_bp = Blueprint('flashcards', __name__, url_prefix='/api/decks')

@flashcards_bp.route('/<int:deck_id>/flashcards', methods=['POST'])
@jwt_required()
def create_flashcard(deck_id):
    user_id = get_jwt_identity()

    deck = Deck.query.filter_by(id=deck_id, user_id=user_id).first()
    if not deck:
        return jsonify({'error' : 'Deck not found.'}), 404

    data = request.get_json()
    front = data.get('front')
    back = data.get('back')

    if not front or not back:
        return jsonify({'error' : 'Front and back are required.'}), 400

    new_card = Flashcard(front=front, back=back, deck_id=deck.id)
    db.session.add(new_card)
    db.session.commit()

    return jsonify({
        'id' : new_card.id,
        'front' : new_card.front,
        'back' : new_card.back
    }), 201

@flashcards_bp.route('/<int:deck_id>/flashcards', methods=['GET'])
@jwt_required()
def get_flashcards(deck_id):
    user_id = get_jwt_identity() 

    deck = Deck.query.filter_by(id=deck_id, user_id=user_id).first() 
    if not deck:
        return jsonify({'error' : 'Deck not found.'}), 404

    return jsonify([
        {'id' : card.id, 'front' : card.front, 'back' : card.back}
        for card in deck.flashcards
    ]), 200

@flashcards_bp.route('/<int:deck_id>/flashcards/<int:card_id>', methods=['GET'])
@jwt_required()
def get_flashcard(deck_id, card_id):
    user_id = get_jwt_identity()

    deck = Deck.query.filter_by(id=deck_id, user_id=user_id).first()
    if not deck:
        return jsonify({'error' : 'Deck not found.'}), 404

    card = Flashcard.query.filter_by(id=card_id, deck_id=deck.id).first()
    if not card:
        return jsonify({'error' : 'Flashcard not found.'}), 404

    return jsonify({
        'id' : card.id,
        'front' : card.front,
        'back' : card.back
    }), 200

@flashcards_bp.route('/<int:deck_id>/flashcards/<int:card_id>', methods=['PUT'])
@jwt_required()
def update_flashcard(deck_id, card_id):
    user_id = get_jwt_identity()

    deck = Deck.query.filter_by(id=deck_id, user_id=user_id).first()
    if not deck:
        return jsonify({'error' : 'Deck not found.'}), 404

    card = Flashcard.query.filter_by(id=card_id, deck_id=deck.id).first()
    if not card:
        return jsonify({'error' : 'Flashcard not found.'}), 404

    data = request.get_json()
    front = data.get('front')
    back = data.get('back')

    if not front or not back:
        return jsonify({'error' : 'Front and back are required.'}), 400

    card.front = front
    card.back = back
    db.session.commit()

    return jsonify({
        'id' : card.id,
        'front' : card.front,
        'back' : card.back
    })

@flashcards_bp.route('/<int:deck_id>/flashcards/<int:card_id>', methods=['DELETE'])
@jwt_required()
def delete_flashcard(deck_id, card_id):
    user_id = get_jwt_identity()

    deck = Deck.query.filter_by(id=deck_id, user_id=user_id).first()
    if not deck:
        return jsonify({'error' : 'Deck not found.'}), 404

    card = Flashcard.query.filter_by(id=card_id, deck_id=deck.id).first()
    if not card:
        return jsonify({'error' : 'Flashcard not found.'}), 404

    db.session.delete(card)
    db.session.commit()

    return jsonify({'message' : 'Flashcard deleted successfully.'}), 200