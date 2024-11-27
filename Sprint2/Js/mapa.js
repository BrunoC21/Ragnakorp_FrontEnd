// Inicializar el mapa
const map = L.map("map").setView([0, 0], 2); // Coordenadas iniciales (mundo)

// Añadir una capa de mapa
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Añadir un marcador arrastrable
const marker = L.marker([0, 0], { draggable: true }).addTo(map);

// Actualizar coordenadas en el formulario cuando el marcador se mueve
marker.on("dragend", function () {
  const position = marker.getLatLng();
  document.getElementById("latitude").value = position.lat.toFixed(6);
  document.getElementById("longitude").value = position.lng.toFixed(6);
});

// Obtener campos del formulario
const addressInput = document.getElementById("address");
const latitudeInput = document.getElementById("latitude");
const longitudeInput = document.getElementById("longitude");
const searchAddressBtn = document.getElementById("searchAddressBtn");

// Función para buscar una dirección usando la API de Nominatim
searchAddressBtn.addEventListener("click", () => {
  const address = addressInput.value.trim();
  if (!address) {
    alert("Por favor, ingresa una dirección.");
    return;
  }

  // Realizar la petición a la API de Nominatim
  fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      address
    )}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.length === 0) {
        alert("No se encontró la dirección. Intenta con otra.");
        return;
      }

      // Obtener la primera coincidencia
      const { lat, lon } = data[0];

      // Mover el marcador y centrar el mapa
      const newLatLng = [parseFloat(lat), parseFloat(lon)];
      marker.setLatLng(newLatLng);
      map.setView(newLatLng, 13);

      // Actualizar los campos de latitud y longitud
      latitudeInput.value = parseFloat(lat).toFixed(6);
      longitudeInput.value = parseFloat(lon).toFixed(6);
    })
    .catch((error) => {
      console.error("Error al buscar la dirección:", error);
      alert(
        "Hubo un problema al buscar la dirección. Inténtalo más tarde."
      );
    });
});

// Centrar el mapa en la ubicación del usuario (si está disponible)
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const userLat = position.coords.latitude;
      const userLng = position.coords.longitude;

      // Mover el marcador y centrar el mapa
      map.setView([userLat, userLng], 13);
      marker.setLatLng([userLat, userLng]);

      // Llenar los campos del formulario
      latitudeInput.value = userLat.toFixed(6);
      longitudeInput.value = userLng.toFixed(6);
    },
    () => {
      alert(
        "No se pudo obtener tu ubicación automáticamente. Usa el mapa para seleccionarla."
      );
    }
  );
}

// ---------------------------------------------

tinymce.init({
  selector: "#editor", // Selecciona el textarea con este ID
  menubar: false, // Opcional: Ocultar barra de menú
  plugins: [
    "advlist autolink lists link image charmap print preview anchor",
    "searchreplace visualblocks code fullscreen",
    "insertdatetime media table paste code help wordcount",
  ],
  toolbar:
    "undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | help",
});

// ----------------------------------------------

src="https://cdn.tiny.cloud/1/4fdc2y5574mndy843hleikms0pom58d3aul2f24mhlcj0bcy/tinymce/6/tinymce.min.js"
referrerpolicy="origin"