from app.llms.factory import get_llm


def main() -> None:
    llm = get_llm()

    response = llm.invoke("Reply with exactly: Hello from Gemini!")

    print(response.content)


if __name__ == "__main__":
    main()