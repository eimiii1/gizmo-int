def build_quiz_prompt(flashcards):
    flashcard_text = "\n".join([
        f"- Front: {card.front} | Back: {card.back}"
        for card in flashcards
    ])

    prompt = f"""
You are helping generate a multiple-choice quiz from flashcards.

For each flashcard below, create one multiple-choice questio where:
- The question is based on the flashcard's "Front"
- The correct answer is the flashcard's "Back"
- Generate 3 plausible but incorrect answer choices related to the same topic

Flashcards:
{flashcard_text}

Return ONLY a valid JSON array, with no extra text, in this exact format:
[
    {{
        "question_text" : "...",
        "correct_answer" : "...",
        "choices" : ["...", "...", "...", "..."]
    }}
]

the "choices" array must contain exactly 4 options total, including the correct answer, in random order.
"""
    return prompt