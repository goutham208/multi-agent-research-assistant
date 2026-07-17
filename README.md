# 🚀 Multi-Agent Research Assistant

A production-grade **Multi-Agent Research Assistant** built with **FastAPI**, **LangGraph**, **OpenAI GPT-5 Mini**, and **Tavily Search**.

The application demonstrates how multiple AI agents collaborate to research a topic, organize information, write a structured report, critique the output, and generate a polished final research response.

---

# ✨ Features

* 🔍 Web research using Tavily Search
* 🤖 Multi-Agent workflow powered by LangGraph
* 📝 Research Agent for information gathering
* ✍️ Writer Agent for structured report generation
* 🧐 Critic Agent for reviewing and improving content
* ⚡ FastAPI REST API
* 🌐 Interactive web interface
* 🌓 Light and dark theme support
* 📊 Visual multi-agent research progress
* 📚 Interactive research source cards
* 📋 Copy research reports to clipboard
* 📄 Export research reports as PDF
* 🗑️ Clear and reset research results
* 📱 Responsive design for desktop and mobile
* 🔐 Secure API key management using environment variables
* 🏗️ Modular and production-ready project structure
* 🔄 Support for configurable LLM providers
* 🚀 Cloud deployment with Render

---

# 🏗️ Architecture

```text
                User
                  │
                  ▼
             Web Frontend
                  │
                  ▼
          FastAPI Backend
                  │
                  ▼
           Research Service
                  │
                  ▼
          LangGraph Workflow
                  │
        ┌─────────┴─────────┐
        │                   │
        ▼                   ▼
   Tavily Search      OpenAI LLM
        │                   │
        └─────────┬─────────┘
                  │
                  ▼
          🔍 Research Agent
                  │
                  ▼
           ✍️ Writer Agent
                  │
                  ▼
           🧐 Critic Agent
                  │
                  ▼
          Final Research Report
                  │
                  ▼
       Report + Research Sources
```

---

# 🔄 Multi-Agent Workflow

The application uses a sequential LangGraph workflow:

1. **User Query**  
   The user submits a research topic through the web interface.

2. **Research Agent**  
   Tavily Search gathers relevant information and web sources.

3. **Writer Agent**  
   The collected research is transformed into a structured research report.

4. **Critic Agent**  
   The generated report is reviewed for quality, completeness, and clarity.

5. **Final Response**  
   The polished research report and supporting sources are returned to the frontend.

---

# 🛠️ Tech Stack

## Backend

* Python
* FastAPI
* LangGraph
* LangChain
* OpenAI
* Tavily Search
* Pydantic

## Frontend

* HTML5
* CSS3
* JavaScript
* Responsive UI
* Light/Dark Theme

## Architecture & Configuration

* Multi-Agent Architecture
* Service Layer Pattern
* REST API
* Pydantic Settings
* Environment Variables
* Modular Project Structure

## Deployment

* GitHub
* Render

---

# 📂 Project Structure

```text
multi-agent-research-assistant/
│
├── app/
│   ├── agents/
│   ├── api/
│   │   └── research.py
│   ├── core/
│   ├── graph/
│   ├── llms/
│   ├── models/
│   ├── prompts/
│   ├── services/
│   │   └── research_service.py
│   ├── tools/
│   ├── utils/
│   └── main.py
│
├── static/
│   ├── app.js
│   └── style.css
│
├── templates/
│   └── index.html
│
├── tests/
│
├── .env.example
├── .gitignore
├── pyproject.toml
└── README.md
```

---

# ⚙️ Installation

Clone the repository:

```bash
git clone <repository-url>
cd multi-agent-research-assistant
```

Create a virtual environment:

```bash
python -m venv .venv
```

Activate the virtual environment.

### Windows PowerShell

```powershell
.\.venv\Scripts\Activate.ps1
```

### Windows Command Prompt

```bash
.venv\Scripts\activate
```

Install the project dependencies:

```bash
pip install -e .
```

---

# 🔐 Environment Variables

Create a `.env` file based on `.env.example`.

Example:

```env
LLM_PROVIDER=openai

OPENAI_API_KEY=your-openai-api-key
OPENAI_MODEL=gpt-5-mini

GOOGLE_API_KEY=your-google-api-key
GEMINI_MODEL=gemini-2.5-flash

TAVILY_API_KEY=your-tavily-api-key
```

> Never commit your `.env` file or real API keys to GitHub.

---

# ▶️ Run the Application

Start the FastAPI development server:

```bash
uvicorn app.main:app --reload
```

Open the application in your browser:

```text
http://127.0.0.1:8000
```

Swagger API documentation:

```text
http://127.0.0.1:8000/docs
```

Health endpoint:

```text
http://127.0.0.1:8000/health
```

Version endpoint:

```text
http://127.0.0.1:8000/version
```

---

# 📡 API

## POST `/research`

Executes the complete multi-agent research workflow.

### Request

```json
{
  "query": "Future of AI Agents"
}
```

### Response

```json
{
  "query": "Future of AI Agents",
  "research_notes": "...",
  "draft": "...",
  "critique": "...",
  "final_answer": "...",
  "sources": [],
  "status": "completed"
}
```

---

# 🎨 User Interface

The frontend provides a polished interface for interacting with the multi-agent research system.

Key UI capabilities include:

* Research topic input
* Multi-agent workflow progress indicators
* Research, Writer, and Critic agent status
* Final research report display
* Interactive source cards
* Copy report functionality
* PDF report export
* Clear report functionality
* Light and dark themes
* Responsive desktop and mobile layouts

---

# 🧪 Testing

Run the available tests:

```bash
python tests/test_llm.py
```

```bash
python tests/test_tavily.py
```

```bash
python tests/test_graph.py
```

---

# 🔒 Security

The project follows basic API security practices:

* API keys are stored using environment variables
* Local secrets are stored in `.env`
* `.env` is excluded from Git
* `.env.example` provides configuration guidance without exposing secrets
* Production API keys are configured as deployment environment variables
* No API keys are hardcoded in frontend or backend source code

---

# 🚀 Deployment

The application is designed for cloud deployment using Render.

The frontend uses a relative API endpoint:

```javascript
const API_URL = "/research";
```

This allows the same frontend code to communicate with the FastAPI backend in both local development and production environments.

Production API keys should be configured securely through the deployment platform's environment variables.

---

# 🚀 Future Improvements

* Response streaming
* Advanced Markdown rendering with syntax highlighting
* User authentication
* Conversation and research history
* Persistent research sessions
* Docker containerization
* CI/CD pipeline
* Observability and monitoring
* Database-backed research history
* Enhanced agent reasoning visualization

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Goutham Kumar**

Built as a portfolio project demonstrating practical experience with **Generative AI, LLM applications, LangGraph multi-agent systems, FastAPI, web search integration, and production deployment**.

If you find this project useful, feel free to star the repository and share your feedback.