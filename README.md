# Gizmo Integration

## Overview

Gizmo Integration is the backend service powering the Gizmo studying platform. Built with Flask, it handles authentication, data management, and AI-powered features through the Gemini API — helping students study smarter through personalized learning experiences.

## Getting Started

### Prerequisites

- Python 3.12.7
- MySQL
- Node.js
- pip

#### Backend

1. Navigate to the `/server` folder
2. Create a virtual environment

```bash
python -m venv venv 
```

1. Activate the virtual environment

```bash
# macOS / Linux 
source venv/bin/activate 

# Windows 
venv/Scripts/Activate.ps1 # Powershell
venv/Scripts/activate     # cmd
```

1. Install dependencies. A `requirements.txt` file with all required dependencies is included.

```bash
pip install -r requirements.txt
```

1. Set up your environment variables. Create a `.env` file in `/server` with:

```bash
DATABASE_URL=mysql+pymysql://USERNAME:PASSWORD@localhost/DATABASE_NAME
SECRET_KEY=your-secret-key
JWT_SECRET_KEY=your-jwt-secret-key
```

1. Run the backend

```bash
python app.py
```

#### Frontend

1. Navigate to the `/client` folder
2. Install dependencies 

```bash
npm install
```

1. Run the dev server 

```bash
# npm 
npm run dev 

# pnpm 
pnpm dev

# yarn 
yarn dev
```

### API Endpoints

| **Method** | **Endpoint** | **Description** | **Auth Required** |
| --- | --- | --- | --- |
| **POST** | `/api/register` | Create a new user account | False |
| **POST** | `/api/login` | Log in and receive a JWT access token | False |
| **GET** | `/api/me` | Get the current logged-in user’s info | True |
| **POST** | `/api/decks` | Create a new deck | True |
| **GET** | `/api/decks` | List the current user’s decks | True |
| **POST** | `/api/decks/<deck_id>/flashcards` | Create a flashcard in a specific deck | True |
| **GET** | `/api/decks/<deck_id>/flashcards` | List all flashcards in a specific deck | True |

### Testing the API

You can test the API using cURL (Client URL) if you don’t have an API client like Postman. Otherwise, feel free to use Postman or your preferred API client instead.

```bash
curl -X <METHOD> http://127.0.0.1:5000/<ENDPOINT> \
	-H "Content-Type: application/json" \
	-H "Authorization:: Bearer <YOUR_TOKEN>" \
	-d '{"key" : "value"}'
```

- Swap `<METHOD>` and `<ENDPOINT>` for whichever route you’re testing (see the table above).
- The `Authorization` header is only needed for routes marked “True” under Authentication — grab `<YOUR_TOKEN>` from the `/api/login` response, for example.
- The `-d` flag (request body) is only needed for `POST` requests that expect JSON data.