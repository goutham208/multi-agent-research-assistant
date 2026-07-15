const queryInput = document.getElementById("query");
const researchButton = document.getElementById("researchBtn");
const loading = document.getElementById("loading");
const result = document.getElementById("result");

researchButton.addEventListener("click", runResearch);

async function runResearch() {
    const query = queryInput.value.trim();

    if (!query) {
        alert("Please enter a research topic.");
        queryInput.focus();
        return;
    }

    loading.style.display = "block";
    result.innerHTML = "";
    researchButton.disabled = true;

    try {
        const response = await fetch("/research", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: query,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        result.innerHTML = `
            <h2>Research Report</h2>
            <pre>${escapeHtml(data.final_answer || "No report generated.")}</pre>
        `;

    } catch (error) {
        console.error(error);

        result.innerHTML = `
            <div class="error">
                <h3>Error</h3>
                <p>Unable to generate research.</p>
                <p>Please try again.</p>
            </div>
        `;
    } finally {
        loading.style.display = "none";
        researchButton.disabled = false;
    }
}

function escapeHtml(text) {
    if (!text) return "";

    return text
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}