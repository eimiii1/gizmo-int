from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy() 

# user model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)

    # to set password
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    # to check password
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

# deck model
class Deck(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    parent_deck_id = db.Column(db.Integer, db.ForeignKey('deck.id'), nullable=True)

    owner = db.relationship('User', backref='decks')
    subdecks = db.relationship(
        'Deck', 
        backref=db.backref('parent_deck', remote_side=[id]),
        cascade='all, delete-orphan'
        )


# flashcard model 
class Flashcard(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    front = db.Column(db.Text, nullable=False)
    back = db.Column(db.Text, nullable=False)
    deck_id = db.Column(db.Integer, db.ForeignKey('deck.id'), nullable=False)

    deck = db.relationship('Deck', backref=db.backref('flashcards', cascade='all, delete-orphan'))


# note model
class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    content = db.Column(db.Text, nullable=False)
    deck_id = db.Column(db.Integer, db.ForeignKey('deck.id'), nullable=False)

    deck = db.relationship('Deck', backref=db.backref('notes', cascade='all, delete-orphan'))
    
class Furniture(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    image_url = db.Column(db.String(255), nullable=True)

class UserFurniture(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    furniture_id = db.Column(db.Integer, db.ForeignKey('furniture.id'), nullable=False)

    owner = db.relationship('User', backref='furniture_collection')
    furniture = db.relationship('Furniture')