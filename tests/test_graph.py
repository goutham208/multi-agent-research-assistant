print("Step 1")

from app.graph.workflow import graph

print("Step 2")


def main():
    print("Step 3")

    state = {
        "query": "Explain Retrieval-Augmented Generation (RAG) in simple terms.",
        "research_notes": "",
        "draft": "",
        "critique": "",
        "final_answer": "",
        "sources": [],
        "status": "started",
        "error": "",
    }

    print("Step 4")

    result = graph.invoke(state)

    print("Step 5")

    print(result["final_answer"])


if __name__ == "__main__":
    main()