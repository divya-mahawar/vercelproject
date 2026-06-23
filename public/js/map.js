document.addEventListener("DOMContentLoaded", () => {
  const map = L.map("map").setView(window.mapCoords, 10);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
  }).addTo(map);

  L.marker(window.mapCoords)
    .addTo(map)
    .bindPopup("Location")
    .openPopup();
});