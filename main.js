const apiKey = `https://api.dictionaryapi.dev/api/v2/entries/en/<word>`;
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const wordKeyword = document.querySelector(".word-keyword h2");
const wordType = document.querySelector(".word-type span");
const wordMeaning = document.querySelector(".word-meaning span");
const wordSamples = document.querySelector(".word-samples span");
const wordSynonyms = document.querySelector(
  ".word-synonyms .synonyms-list span"
);
const wordAntonyms = document.querySelector(
  ".word-antonyms .antonyms-list span"
);

searchBtn.addEventListener("click", searchWord);

async function searchWord() {
  const word = searchInput.value.trim();

  if (word === "") {
    alert("Please enter a word to search.");
    return;
  }

  try {
    const response = await fetch(
      `https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`
    );
    const data = await response.json();

    if (Array.isArray(data) && data.length > 0) {
      const entry = data[0];

      // Display the word and type
      wordKeyword.textContent = entry.meta.id;
      wordType.textContent = entry.fl || "Not Available";

      // Display the first definition's meaning, example, synonyms, and antonyms
      if (entry.shortdef) {
        wordMeaning.textContent = entry.shortdef[0] || "Not Available";
      }
      if (entry.hwi && entry.hwi.prs) {
        wordSamples.textContent = entry.hwi.prs[0].mw || "Not Available";
      }
      if (entry.meta.syns) {
        wordSynonyms.textContent =
          entry.meta.syns[0].join(", ") || "Not Available";
      }
      if (entry.meta.ants) {
        wordAntonyms.textContent =
          entry.meta.ants[0].join(", ") || "Not Available";
      }
    } else {
      alert("Word not found in the dictionary.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while fetching data. Please try again later.");
  }
}
