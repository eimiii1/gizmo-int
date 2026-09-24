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
# macOS / Linux 
python3 -m venv venv

# Windows
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

1. Install dependencies. I’ve created a .txt file containing all the required dependencies to install. See the command below

```bash
python run.py
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

wait for updates