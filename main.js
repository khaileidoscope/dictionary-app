// main.js
const dictionaryApp = document.getElementById("app");
const inputText = document.getElementById("input-text");

inputText.addEventListener("keyup", (e) => {
  console.log(e.target.value);
});
