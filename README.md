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

| **Method** | **Endpoint** | **Description** | **Authentication** |
| --- | --- | --- | --- |
| **POST** | `api/register` | Create a new user account | False |
| **POST** | `api/login` | Log in and receive a JWT access token | False |
| **GET** | `api/me` | Get the current logged-in user’s info | True |

wait for updates