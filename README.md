# 🤖 AI Investment Research Agent

An AI-powered investment research tool that analyzes companies and provides investment recommendations using Google's Gemini AI.

## ✨ Features

- 🔍 Company search and analysis
- 📊 Financial metrics visualization
- 📰 News sentiment analysis
- 🤖 AI-powered recommendations
- 📈 Visual metric scoring
- ⚡ Real-time analysis

## 🛠️ Tech Stack

### Frontend
- React 18
- Axios
- CSS3

### Backend
- Node.js
- Express
- Google Gemini AI
- LangChain

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (v7 or higher) - Comes with Node.js
- **Git** - [Download here](https://git-scm.com/downloads)

To check if you have Node.js and npm installed, run:
```bash
node --version
npm --version
Installation & Setup
Step 1: Clone the Repository
Open your terminal/command prompt and run:

bash
git clone https://github.com/yourusername/investment-research-agent.git
cd investment-research-agent
Step 2: Install All Dependencies
From the root directory, install dependencies for both frontend and backend:

bash
npm run install:all
This command will:

Install root dependencies

Install backend dependencies

Install frontend dependencies
Step 4: Start the Application
Option A: Run Both Frontend and Backend Together (Recommended)
From the root directory:

bash
npm run dev
Option B: Run Separately
Terminal 1 - Start Backend:

bash
cd backend
npm run dev
Terminal 2 - Start Frontend:

bash
cd frontend
npm start
Step 5: Access the Application
Open your browser and go to:

Frontend: http://localhost:3000

Backend API Health Check: http://localhost:5000/api/health

You should see the AI Investment Research Agent interface.