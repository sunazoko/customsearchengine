const params = new URLSearchParams(window.location.search);
const query = params.get("q");

if (query) {
  const decoded = decodeURIComponent(query);

  const target =
    "https://duckduckgo.com/?q=" + encodeURIComponent(decoded);

  window.location.replace(target);
}
