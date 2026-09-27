from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Deck

decks_bp = Blueprint('decks', __name__, url_prefix='/api/decks')

@decks_bp.route('', methods=['POST'])
@jwt_required() 
def create_deck():
    user_id = get_jwt_identity()
    data = request.get_json()

    title = data.get('title')
    description = data.get('description')

    if not title:
        return jsonify({'error' : 'Title is required.'}), 400

    new_deck = Deck(title=title, description=description, user_id=user_id)

    db.session.add(new_deck)
    db.session.commit()

    return jsonify({
        'id' : new_deck.id,
        'title' : new_deck.title,
        'description' : new_deck.description
    }), 201

@decks_bp.route('', methods=['GET'])
@jwt_required() 
def get_decks():
    return 'Hello nigga!'