document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const body = document.getElementById("response-body");
  const empty = document.getElementById("response-empty");

  const labels = {
    hobby: "Hobby",
    name: "Name",
    email: "Email",
    phone: "Phone number",
    country: "Country",
    trip_start: "Trip start",
    trip_end: "Trip end",
    fishing_experience: "Fishing experience",
    fishing_date: "Preferred session date",
    message: "Message",
  };

  const keysWithValues = [...params.keys()].filter((k) => params.get(k));
  if (keysWithValues.length === 0) {
    empty.classList.remove("d-none");
    return;
  }

  Object.entries(labels).forEach(([key, label]) => {
    const value = params.get(key);
    if (!value) return; 
    const row = document.createElement("tr");
    row.innerHTML = `<th scope="row">${label}</th><td>${escapeHtml(value)}</td>`;
    body.appendChild(row);
  });
});

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}