const sheetID = "1Oi1DML6PvgD1AfzaVewpeaTgiTLfXkbxSH3S49jw3Y0";
const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:json`;

fetch(sheetURL)
  .then(res => res.text())
  .then(data => {
    const json = JSON.parse(data.substring(47).slice(0, -2));
    const rows = json.table.rows;
    const container = document.getElementById("notes-container");
    container.innerHTML = ""; // clear "Loading..." message

    rows.slice(1).forEach(row => {
      const name = row.c[1]?.v || "Anonymous";
      const subject = row.c[2]?.v || "No Subject";
      const topic = row.c[3]?.v || "No Topic";
      const link = row.c[4]?.v || "#";

      const card = document.createElement("div");
      card.className = "note-card";
      card.innerHTML = `
        <h3>${subject}</h3>
        <p><strong>${topic}</strong></p>
        <p>👤 Uploaded by: ${name}</p>
        <a href="${link}" target="_blank">📄 View Notes</a>
      `;
      container.appendChild(card);
    });
  })
  .catch(err => {
    document.getElementById("notes-container").innerHTML =
      "<p>⚠️ Error loading notes. Please check your Google Sheet permissions.</p>";
    console.error(err);
  });
