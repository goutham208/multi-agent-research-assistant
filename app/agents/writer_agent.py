from app.graph.state import ResearchState
from app.llms.factory import get_llm
from app.prompts.writer import WRITER_PROMPT

llm = get_llm()


def writer_agent(state: ResearchState) -> ResearchState:
    prompt = WRITER_PROMPT.format(
        research_notes=state["research_notes"]
    )

    response = llm.invoke(prompt)

    state["draft"] = response.content
    state["status"] = "draft_completed"

    return state