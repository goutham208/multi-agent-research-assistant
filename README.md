# 🚀 Multi-Agent Research Assistant

A production-grade **Multi-Agent Research Assistant** built with **FastAPI**, **LangGraph**, **OpenAI GPT-5 Mini**, and **Tavily Search**.

The application demonstrates how multiple AI agents can collaborate to research a topic, write a draft, critique the result, and generate a polished final answer.

---

# ✨ Features

* 🔍 Web research using Tavily Search
* 🤖 Multi-Agent workflow powered by LangGraph
* 📝 Research Agent for information gathering
* ✍️ Writer Agent for drafting responses
* 🧐 Critic Agent for reviewing and improving content
* ⚡ FastAPI REST API
* 🌐 Interactive web interface
* 🔐 Secure API key management using `.env`
* 🏗️ Modular and production-ready project structure
* 🔄 Easily switch between supported LLM providers

---

# 🏗️ Architecture

```
                User
                  │
                  ▼
          FastAPI Backend
                  │
                  ▼
           LangGraph Workflow
                  │
      ┌───────────┼───────────┐
      ▼           ▼           ▼
Research Agent  Writer Agent  Critic Agent
      │           │           │
      └───────────┼───────────┘
                  ▼
            Final Response
                  │
                  ▼
             Web Frontend
```

---

# 🛠️ Tech Stack

## Backend

* Python 3.14
* FastAPI
* LangGraph
* LangChain
* OpenAI
* Tavily Search

## Frontend

* HTML
* CSS
* JavaScript

## Configuration

* Pydantic Settings
* Environment Variables
* Modular Project Structure

---

# 📂 Project Structure

```text
multi-agent-research-assistant/
│
├── app/
│   ├── agents/
│   ├── api/
│   ├── core/
│   ├── graph/
│   ├── llms/
│   ├── prompts/
│   ├── services/
│   ├── tools/
│   └── main.py
│
├── static/
├── templates/
├── tests/
├── .env.example
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

Activate it:

### Windows

```bash
.venv\Scripts\activate
```

Install dependencies:

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

---

# ▶️ Run the Application

```bash
uvicorn app.main:app --reload
```

Application:

```
http://127.0.0.1:8000
```

Swagger UI:

```
http://127.0.0.1:8000/docs
```

---

# 🔄 Workflow

1. User submits a research topic.
2. Tavily gathers relevant web information.
3. Research Agent organizes findings.
4. Writer Agent creates the initial draft.
5. Critic Agent reviews and improves the draft.
6. Final answer is returned to the user.

---

# 📡 API

## POST `/research`

### Request

```json
{
  "query": "Future of AI Agents"
}
```

### Response

```json
{
  "query": "...",
  "research_notes": "...",
  "draft": "...",
  "critique": "...",
  "final_answer": "...",
  "sources": [],
  "status": "completed"
}
```

---

# 🧪 Testing

Run the available tests:

```bash
python tests/test_llm.py
python tests/test_tavily.py
python tests/test_graph.py
```

---

# 🔒 Security

* API keys are stored in `.env`
* `.env` is excluded from Git
* `.env.example` is included for configuration guidance
* Modular configuration using Pydantic Settings

---

# 🚀 Future Improvements

* Response streaming
* Markdown rendering
* PDF export
* Authentication
* Conversation history
* Docker support
* CI/CD pipeline
* Cloud deployment
* Observability and monitoring

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Goutham Kumar**

If you found this project useful, feel free to star the repository and share your feedback.
