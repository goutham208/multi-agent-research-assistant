from app.tools.tavily_search import TavilySearch


def main() -> None:
    client = TavilySearch()

    results = client.search(
        "Latest developments in Generative AI"
    )

    print("=" * 80)

    for index, item in enumerate(results, start=1):
        print(index)
        print(item.get("title"))
        print(item.get("url"))
        print()

    print("=" * 80)


if __name__ == "__main__":
    main()