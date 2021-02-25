// ---------------------------------------------------- //

// Old code, using the inaccurate geolocation db API
// const buyButton = document.querySelector('.btn a');

// const adjustUI = (data) => {
//   const cities = ['Almirante Brown', 'Avellaneda', 'Berazategui', 'Buenos Aires', 'Berisso', 'Brandsen', 'Campana', 'Cañuelas', 'Ensenada', 'Escobar', 'Esteban Echeverría', 'Exaltación de la Cruz', 'Ezeiza', 'Florencio Varela', 'General Las Heras', 'General Rodríguez', 'General San Martín', 'Hurlingham', 'Ituzaingó', 'José C.Paz', 'La Matanza', 'Lanús', 'La Plata', 'Lomas de Zamora', 'Luján', 'Marcos Paz', 'Malvinas Argentinas', 'Moreno', 'Merlo', 'Morón', 'Pilar', 'Presidente Perón', 'Quilmes', 'San Fernando', 'San Isidro', 'San Miguel', 'San Vicente', 'Tigre', 'Tres de Febrero', 'Vicente López', 'Zárate', 'El Talar', null];

//   // If the current location exist on the array, return the fn
//   const result = cities.find(city => city === data.city || city === data.state);

//   if(result !== undefined) {
//     return;
//   } else {
//     buyButton.classList.add('hidden');
//   }
// }

// const fetchLocation = async () => {
//   // Get the data from the API
//   const response = await fetch('https://geolocation-db.com/json/0f761a30-fe14-11e9-b59f-e53803842572/');
//   const data = await response.json();

//   // Then adjust the elements we show on the UI
//   adjustUI(data);
// };

// fetchLocation();

// ---------------------------------------------------- //

// New code, using the HTML 5 geolocation feature
const buyButton = document.querySelector('.btn a');

// We check if the geolocation functionality is supported by the browser
const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
  } else {
    console.warn("Geolocation is not supported by this browser.");
  }
}

// Function to get the coordinates for the user
const geoSuccess = (position) => {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  codeLatLng(lat, lng);
}

// Error handling
const geoError = () => {
  console.error("Geocoder failed.");
}

// Initialize geocoder and get the location
let geocoder;
const initialize = () => {
  geocoder = new google.maps.Geocoder();
  getLocation();
}

// Transform the lat and lng into a comprehensive city
const codeLatLng = (lat, lng) => {
  const latlng = new google.maps.LatLng(lat, lng);

  geocoder.geocode({ 'latLng': latlng }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        // Get the city
        const location = results[0].formatted_address;

        // For debugging purposes
        console.info(`Unformatted data: ${results[0]}`);
        console.info(`Formatted location: ${location}`);

        // Array to hold the cities
        const cities = ['Belén de Escobar', 'Belen de Escobar', 'Escobar', 'Berazategui', 'Berisso', 'Brandsen', 'Campana', 'Cañuelas', 'Canuelas', 'Ezeiza', 'Florencio Varela', 'General Las Heras', 'Gral. Las Heras', 'Las Heras', 'General Rodríguez', 'General Rodriguez', 'Gral. Rodríguez', 'Gral. Rodriguez', 'Ciudad de Hurlingham', 'Hurlingham', 'Ituzaingó', 'Ituzaingo', 'José C. Paz', 'Jose C. Paz', 'Lanús', 'Lanus', 'La Plata', 'Luján', 'Lujan', 'Marcos Paz', 'Merlo', 'Moreno', 'Morón', 'Moron', 'Pilar', 'Quilmes', 'San Fernando de la Buena Vista', 'San Fernando', 'San Isidro', 'San Martín', 'San Martin', 'Martínez', 'Martinez', 'San Miguel', 'Ciudad de San Vicente', 'San Vicente', 'Tigre', 'Vicente López', 'Vicente Lopez', 'Zárate', 'Zarate', 'Malvinas Argentinas', 'Almirante Brown', 'Ciudad Autónoma de Buenos Aires', 'Ciudad Autonoma de Buenos Aires', 'CABA', 'Capital Federal', 'Capital', 'Esteban Echeverría', 'Esteban Echeverria', 'Lomas de Zamora', 'Provincia de Buenos Aires'];

        // Loop through the cities array
        cities.forEach(city => {
          // Search for the city in the location string. If we have a result, we show the buy button
          if (location.search(city) !== -1) {
            buyButton.classList.add('visible');
            return;
          }
        });
      } else {
        console.warn("No results found");
      }
    } else {
      buyButton.classList.add('visible');
      console.error("Geocoder failed due to: " + status);
    }
  });
}

// Initialize the fn
initialize();