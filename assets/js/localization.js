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

// We check if the geolocation functionality is supported by the browser
const getLocation = () => {
  if(navigator.geolocation) {
    console.log('test');
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

// Function to get the coordinates for the user
const geoSuccess = (position) => {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  console.log("lat:" + lat + " lng:" + lng);
  codeLatLng(lat, lng);
}

// Error handling
const geoError = () => {
  alert("Geocoder failed.");
}

// Initialize geocoder
let geocoder;
const initialize = () => {
  geocoder = new google.maps.Geocoder();
}

// Transform the lat and lng into a comprehensive city
const codeLatLng = (lat, lng) => {
  const latlng = new google.maps.LatLng(lat, lng);

  geocoder.geocode({'latLng': latlng}, function(results, status) {
    if(status == google.maps.GeocoderStatus.OK) {
      console.log(results)
      if(results[1]) {
        // Formatted address
        const address = results[0].formatted_address;
        alert("address = " + address);
      } else {
        alert("No results found");
      }
    } else {
      alert("Geocoder failed due to: " + status);
    }
  });
}

initialize();