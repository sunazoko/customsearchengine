const params = new URLSearchParams(window.location.search);
const query = params.get("q");

const output = document.getElementById("output");

if (query) {
  const decoded = decodeURIComponent(query);
  output.textContent = decoded;
} else {
  output.textContent = "No query";
}
