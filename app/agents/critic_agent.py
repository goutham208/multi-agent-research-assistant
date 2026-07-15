from app.graph.state import ResearchState
from app.llms.factory import get_llm
from app.prompts.critic import CRITIC_PROMPT

llm = get_llm()


def critic_agent(state: ResearchState) -> ResearchState:
    prompt = CRITIC_PROMPT.format(
        draft=state["draft"]
    )

    response = llm.invoke(prompt)

    state["final_answer"] = response.content
    state["status"] = "completed"

    return state