from langgraph.graph import END, START, StateGraph

from app.agents.critic_agent import critic_agent
from app.agents.research_agent import research_agent
from app.agents.writer_agent import writer_agent
from app.graph.state import ResearchState


def build_graph():
    """
    Build the multi-agent workflow.
    """

    workflow = StateGraph(ResearchState)

    workflow.add_node("research", research_agent)
    workflow.add_node("writer", writer_agent)
    workflow.add_node("critic", critic_agent)

    workflow.add_edge(START, "research")
    workflow.add_edge("research", "writer")
    workflow.add_edge("writer", "critic")
    workflow.add_edge("critic", END)

    return workflow.compile()


graph = build_graph()