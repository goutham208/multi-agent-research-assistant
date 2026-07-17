/* ==========================================================
   Multi-Agent Research Assistant
   app.js
   Part 1 of 3
========================================================== */

/* ==========================================================
   DOM ELEMENTS
========================================================== */

const queryInput = document.getElementById("queryInput");
const researchBtn = document.getElementById("researchBtn");
const copyBtn = document.getElementById("copyBtn");

const downloadBtn = document.getElementById("downloadBtn");
const clearBtn = document.getElementById("clearBtn");

const loading = document.getElementById("loading");
const loadingText = document.getElementById("loadingText");
const progressBar = document.getElementById("progressBar");

const results = document.getElementById("results");
const output = document.getElementById("output");

const themeToggle = document.getElementById("themeToggle");

const researchStatus = document.getElementById("researchStatus");
const writerStatus = document.getElementById("writerStatus");
const criticStatus = document.getElementById("criticStatus");

/* ==========================================================
   CONFIGURATION
========================================================== */

/*
 * Change this only if your backend uses a different URL.
 * Example:
 * http://127.0.0.1:8000/research
 */

const API_URL = "http://127.0.0.1:8000/research";

/* ==========================================================
   THEME
========================================================== */

function applyTheme(theme) {

    document.documentElement.setAttribute("data-theme", theme);

    localStorage.setItem("theme", theme);

    themeToggle.textContent =
        theme === "dark" ? "☀️" : "🌙";
}

(function initializeTheme() {

    const savedTheme =
        localStorage.getItem("theme") || "light";

    applyTheme(savedTheme);

})();

themeToggle.addEventListener("click", () => {

    const current =
        document.documentElement.getAttribute("data-theme");

    applyTheme(
        current === "dark"
            ? "light"
            : "dark"
    );

});

/* ==========================================================
   ENTER KEY SUPPORT
========================================================== */

queryInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        event.preventDefault();

        startResearch();

    }

});

/* ==========================================================
   STATUS HELPERS
========================================================== */

function resetAgentStatus() {

    [
        researchStatus,
        writerStatus,
        criticStatus
    ].forEach(status => {

        status.className =
            "agent-status pending";

    });

}

function setRunning(element) {

    element.className =
        "agent-status running";

}

function setCompleted(element) {

    element.className =
        "agent-status completed";

}

function setFailed(element) {

    element.className =
        "agent-status failed";

}

/* ==========================================================
   LOADING
========================================================== */

function showLoading() {

    loading.classList.add("active");

    results.classList.remove("active");

    progressBar.style.width = "0%";

    loadingText.textContent =
        "Initializing AI agents...";

    resetAgentStatus();

}

function hideLoading() {

    loading.classList.remove("active");

    results.classList.add("active");

}

/* ==========================================================
   PART 2 OF 3
   RESEARCH WORKFLOW
========================================================== */


/* ==========================================================
   PROGRESS ANIMATION
========================================================== */

function updateProgress(value, message){

    progressBar.style.width = `${value}%`;

    loadingText.textContent = message;

}


/* ==========================================================
   SIMULATE AGENT PROGRESS
========================================================== */

async function runAgentProgress(){

    setRunning(researchStatus);

    updateProgress(
        20,
        "Research Agent is collecting information..."
    );

    await delay(1200);


    setCompleted(researchStatus);

    setRunning(writerStatus);

    updateProgress(
        50,
        "Writer Agent is preparing the report..."
    );

    await delay(1200);


    setCompleted(writerStatus);

    setRunning(criticStatus);

    updateProgress(
        80,
        "Critic Agent is reviewing the output..."
    );

    await delay(1200);

}


/* ==========================================================
   DELAY HELPER
========================================================== */

function delay(ms){

    return new Promise(resolve => {

        setTimeout(resolve, ms);

    });

}


/* ==========================================================
   START RESEARCH
========================================================== */

async function startResearch(){

    const query =
        queryInput.value.trim();


    if(!query){

        showError(
            "Please enter a research topic."
        );

        return;

    }


    showLoading();


    try{

        const progressTask =
            runAgentProgress();


        const response =
            await fetch(
                API_URL,
                {
                    method:"POST",

                    headers:{
                        "Content-Type":
                        "application/json"
                    },

                    body:
                    JSON.stringify({
                        query:query
                    })
                }
            );


        if(!response.ok){

            throw new Error(
                `Server error: ${response.status}`
            );

        }


        const data =
            await response.json();


        await progressTask;


        updateProgress(
            100,
            "Research completed successfully."
        );


        setCompleted(criticStatus);


        await delay(500);


        hideLoading();


        /*
          Response rendering will be connected
          after confirming ResearchService.run()
          output structure.
        */

        renderResponse(data);


    }
    catch(error){

        hideLoading();

        resetAgentStatus();

        setFailed(researchStatus);


        showError(
            error.message
        );

        console.error(
            "Research Error:",
            error
        );

    }

}


/* ==========================================================
   BUTTON EVENT
========================================================== */

researchBtn.addEventListener(
    "click",
    startResearch
);


/* ==========================================================
   ERROR HANDLING
========================================================== */

function showError(message){

    results.classList.add("active");

    output.innerHTML = `

        <div class="alert alert-error">

            ${message}

        </div>

    `;

}

/* ==========================================================
   PART 3 OF 3
   RESPONSE RENDERING
========================================================== */


/* ==========================================================
   RENDER RESPONSE
========================================================== */

function renderResponse(data){

    if(!data){

        showError(
            "No response received from server."
        );

        return;

    }

    const finalAnswer =
        data.final_answer ||
        "No final answer generated.";

    const sources =
        data.sources || [];

    output.innerHTML = `

        <div class="final-report">

            <h3>
                Final Research Report
            </h3>

            <div class="report-content mt-16">

                ${formatText(finalAnswer)}

            </div>

            ${
                sources.length > 0
                ?
                `

                <div class="sources-section">

                    <hr>

                    <h3>
                        📚 Research Sources
                    </h3>

                    <p class="sources-description">
                        Sources used by the Research Agent to prepare this report.
                    </p>

                    <div class="sources-grid">

                        ${
                            sources.map((source, index) => {

                                const sourceUrl =
                                    typeof source === "string"
                                        ? source
                                        : source.url || "";

                                const sourceTitle =
                                    typeof source === "string"
                                        ? `Source ${index + 1}`
                                        : source.title || `Source ${index + 1}`;

                                return `

                                    <a
                                        class="source-card"
                                        href="${sourceUrl}"
                                        target="_blank"
                                        rel="noopener noreferrer">

                                        <div class="source-icon">
                                            🌐
                                        </div>

                                        <div class="source-info">

                                            <strong>
                                                ${sourceTitle}
                                            </strong>

                                            <span>
                                                ${sourceUrl}
                                            </span>

                                        </div>

                                        <div class="source-arrow">
                                            ↗
                                        </div>

                                    </a>

                                `;

                            }).join("")
                        }

                    </div>

                </div>

                `
                :
                ""

            }

        </div>

    `;

}


/* ==========================================================
   TEXT FORMATTER
========================================================== */

function formatText(text){

    if(!text){

        return "";

    }


    return text

        .replace(
            /\n\n/g,
            "<br><br>"
        )

        .replace(
            /\n/g,
            "<br>"
        );

}


/* ==========================================================
   CLEAN RESET
========================================================== */

function resetInterface(){

    queryInput.value = "";

    output.innerHTML = "";

    results.classList.remove(
        "active"
    );

    resetAgentStatus();

    progressBar.style.width =
        "0%";

}


/* ==========================================================
   INITIAL STATE
========================================================== */

window.addEventListener(
    "load",
    () => {

        resetAgentStatus();

    }
);

/* ==========================================================
   REPORT ACTIONS
========================================================== */

// Copy Report
copyBtn.addEventListener("click", async () => {

    const text = output.innerText.trim();

    if (!text) {
        alert("No report available.");
        return;
    }

    try {

        await navigator.clipboard.writeText(text);

        copyBtn.textContent = "✅ Copied";

        setTimeout(() => {
            copyBtn.textContent = "📋 Copy";
        }, 2000);

    } catch (error) {

        console.error("Copy failed:", error);

        alert("Unable to copy the report.");

    }

});


// Download Report as PDF
downloadBtn.addEventListener("click", () => {

    const text = output.innerText.trim();

    if (!text) {
        alert("No report available.");
        return;
    }

    const printWindow = window.open("", "_blank");

    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Research Report</title>

            <style>
                body {
                    font-family: Arial, sans-serif;
                    max-width: 850px;
                    margin: 40px auto;
                    padding: 20px;
                    color: #111827;
                    line-height: 1.7;
                }

                h1 {
                    font-size: 28px;
                    margin-bottom: 24px;
                }

                .report-content {
                    white-space: pre-wrap;
                }

                @media print {
                    body {
                        margin: 0;
                    }
                }
            </style>

        </head>

        <body>

            <h1>Multi-Agent Research Report</h1>

            <div class="report-content"></div>

        </body>
        </html>
    `);

    printWindow.document.close();

    printWindow.document.querySelector(
        ".report-content"
    ).textContent = text;

    printWindow.focus();

    setTimeout(() => {

        printWindow.print();

    }, 300);

});


// Clear Report
clearBtn.addEventListener("click", () => {

    queryInput.value = "";

    output.innerHTML = `
        <div class="empty-state">

            <h2>No Results Yet</h2>

            <p>
                Enter a research topic above and click
                <strong>Start Research</strong>.
            </p>

        </div>
    `;

    results.classList.remove("active");

    resetAgentStatus();

    progressBar.style.width = "0%";

});