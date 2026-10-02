# Features Overview

## Auth

Register, log in, and a protected `/me` route. JWT-based — tokens are issued on login and sent in the `Authorization`header on protected requests.

## Decks & Subdecks

Decks organize flashcards and notes. A deck can optionally have **one level** of subdecks nested underneath it (no deeper nesting). Subdecks can't be edited and can't have their own subdecks. Deleting a deck cascades to everything inside it — subdecks, flashcards, notes, and its quiz.

## Flashcards

Simple front/back cards attached to a deck or subdeck. Full CRUD.

## Notes

Title + content, attached to a deck or subdeck. A deck can have any number of notes. Full CRUD.

## Quizzes (AI-generated)

Clicking "Study Deck" generates a multiple-choice quiz from that deck's flashcards via the Gemini API — one question per flashcard, with the flashcard's back as the correct answer and three AI-generated incorrect choices. The quiz is generated once per deck and saved, so later study sessions reuse it instead of calling the AI again.

Currently multiple-choice only. The data model also supports identification and fill-in-the-blank question types for future expansion.

## Furniture Rewards

Answering a quiz question correctly awards the user a furniture item, meant for a future room-building feature. Furniture ownership is tracked per user, with a quantity, so earning a duplicate item just increases its count rather than creating a new record.

## Planned / Not Yet Built

- Email verification
- Identification and fill-in-the-blank quiz question types
- Furniture reward routes (the models exist, the awarding logic and routes don't yet)
- A `/decks` response that reflects the deck/subdeck tree structure instead of a flat list