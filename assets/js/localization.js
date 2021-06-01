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
        // Get the location
        const location = results[0].address_components;

        // For debugging purposes
        console.info(results[0]);

        // And run the compare function
        checkProvince(location);
      }
    } else {
      console.error("Geocoder failed due to: " + status);
    }
  });
}

// Function to check the province
const checkProvince = (locationData) => {
  // Array with provinces
  const validProvinces = ['Provincia de Buenos Aires', 'Buenos Aires', 'Ciudad Autónoma de Buenos Aires', 'Ciudad Autonoma de Buenos Aires'];

  // Loop through the location and check if the province is valid
  const isProvinceValid = locationData.filter(addressComponent => validProvinces.find(province => (addressComponent.long_name === province)));

  // If the province is valid, we check the city. If not, we exit the function
  if (isProvinceValid.length) {
    checkCity(locationData)
  } else {
    return;
  }
}

// Function to check the city
const checkCity = (locationData) => {
  // Array to hold the cities
  const validCities = ['Paso del Rey', 'Tortuguitas', 'Villa Adelina', 'San Isidro', 'Boulogne', 'Munro', 'Olivos', 'Quilmes', 'Villa Ballester', 'Pablo Podesta', 'Pablo Podestá', 'Capital Federal', 'Moron', 'Morón', 'El Talar', 'Campana', 'Temperley', 'Castelar', 'Villa Bosch', 'Villa Zagala', 'Ing. Maschwitz', 'Ingeniero Maschwitz', 'Maschwitz', 'Isidro Casanova', 'Caseros', 'San Antonio de Padua', 'Villa Lynch', 'Haedo', 'Martinez', 'Martínez', 'Valentin Alsina', 'Longchamps', 'Lujan', 'Luján', 'Florencio Varela', 'Ramos Mejia', 'Ramos Mejía', 'Remedios de Escalada', 'San Fernando', 'Beccar', 'Berazategui', 'Correo Central', 'J.L. Suarez', 'J.L. Suárez', 'José León Suárez', 'Jose Leon Suarez', 'Ing Pablo Nogues', 'Ingeniero Pablo Nogues', 'Pablo Nogués', 'Pablo Nogues', 'Santos Lugares', 'Villa Martelli', 'Garin', 'Garín', 'Moreno', 'Florida', 'Dock Sud', 'Grand Bourg', 'Tigre', 'El Palomar', 'Banfield', 'San Andres', 'San Andrés', 'Luis Guillon', 'Luis Guillón', 'Monte Grande', 'Parque Industrial Pi', 'Rafael Castillo', 'Wilde', 'Del Viso', 'Zarate', 'Zárate', 'Villa Sagala', 'Chilavert', 'Pque Industrial Burz', 'Punta Chica', 'Santos Tesei', 'Bernal Oeste', 'Bernal', 'Villa Rosa', 'Vicente Lopez', 'Vicente López', 'Merlo', 'La Lonja', 'San Miguel', 'Villa Tesei', 'Belen de Escobar', 'Belén de Escobar', 'Saenz Peña', 'Bella Vista (Bs.As)', 'Bella Vista', 'Ciudad Jardin', 'Ciudad Jardín', 'Ituzaingo (Bs Aires)', 'Ituzaingó (Bs Aires)', 'Ituzaingo', 'Ituzaingó', 'Victoria (Bs Aires)', 'Victoria', 'San Justo (Bs As)', 'San Justo', 'Burzaco', 'Jose C. Paz', 'José C. Paz', 'Loma Hermosa', 'Fatima', 'Fátima', 'Canning', 'Troncos del Talar', 'Parada Robles', 'Tristan Suarez', 'Tristan Suárez', 'Tristán Suarez', 'Tristán Suárez', 'L. de Zamora', 'Lomas de Zamora', 'J.M.Ezeiza', 'Ezeiza', 'Carapachay', 'Carlos Spegazzini', 'General Pacheco', 'El Cazador (Escobar)', 'Escobar', 'Tropezon (S.Martin)', 'Tropezón (S.Martin)', 'Tropezón', 'Tropezon', 'La Reja (Bs.As.)', 'La Reja', 'Laferrere', 'Cañuelas', 'Villa Madero', 'Los Polvorines', 'Polvorines', 'Llavallol', 'Villa Maipu', 'Villa Maipú', 'Benavidez', 'Benavídez', 'Villa Dominico', 'Villa Domínico', 'Matheu', 'Jauregui', 'Jáuregui', 'Martin Coronado', 'Martín Coronado', 'Tapiales', 'La Lucila', 'Pte. Derqui', 'Presidente Derqui', 'Derqui', 'Villa Lugano', 'Villa Progreso', 'Pilar', 'Manzanares', 'Libertad Merlo', 'Merlo', 'Libertad', 'Villa Urquiza', 'Palermo', 'Virreyes', 'Acassuso', 'Ciudadela', 'La Tablada', 'Lomas del Mirador', 'Pompeya', 'Avellaneda', 'Don Torcuato', 'General Rodriguez', 'General Rodríguez', 'Parque Patricios', 'Barracas', 'Belgrano', 'Hurlingham', 'Capilla del Señor', 'Rincon de Milberg', 'Rincón de Milberg', 'Pontevedra', 'Villa Bonich', 'Jose Ingenieros', 'José Ingenieros', 'Adrogue', 'Adrogué', 'Villa de Mayo', 'Villa Luzuriaga', 'Luzuriaga', 'Lanus Este', 'Lanus', 'Lanús', 'Lanús Este', 'Tablada', 'Cardales', 'Los Cardales', 'San Vicente', 'Villa Morra (Pilar)', 'Villa Morra', 'Carupa', '9 de Abril', 'Lanus Oeste', 'Lanús Oeste', 'Hudson', 'Esteban Echeverria', 'Esteban Echeverra', 'Claypole', 'Parque industrial Tigre', 'Tigre', 'Sarandi', 'Sarandí', 'El Jagüel', 'El Jaguel', 'City Bell', 'Maquinista Francisco Savio', 'Maquinista Savio', 'Dique Lujan', 'Dique Luján', 'Muñíz', 'Muñiz', 'Virrey del Pino', 'Villa Libertad (San Martin)', 'Villa Libertad (San Martín)', 'Villa Libertad', 'Presidente Peron', 'Presidente Perón', 'Villa Sarmiento', 'Malvinas Argentinas', 'Exaltación de la Cruz', 'Exaltacion de la Cruz', 'Recoleta', 'Villa Crespo', 'Villa Raffo', 'Parque Avellaneda', 'Floresta', 'Mataderos', 'Once', 'Caballito', 'Tolosa', 'Centro Agricola El pato', 'Centro Agrícola El pato', 'Jose Clemento Paz', 'José Clemento Paz', 'Guernica', 'Piñeyro', 'Parque Avellaneda', 'Billinghurst', 'Troncos Del Talar', 'San Martín', 'San Martin', 'Chascomus', 'Chascomús', 'Juan Maria Gutierrez', 'Juan María Gutierrez', 'Juan Maria Gutiérrez', 'Juan María Gutiérrez', 'Gonzalez Catan', 'Gonzalez Catán', 'González Catan', 'González Catán', 'Ingeniero Budge', 'Trujui', 'El Pato', 'Alto del Talar', 'Francisco Alvarez', 'Francisco Alvárez', 'Villa Celina', 'Berisso', 'Brandsen', 'Berazategui', 'Berisso', 'Brandsen', 'Campana', 'Cañuelas', 'Canuelas', 'Ezeiza', 'Florencio Varela', 'General Las Heras', 'Gral. Las Heras', 'Las Heras', 'General Rodríguez', 'General Rodriguez', 'Gral. Rodríguez', 'Gral. Rodriguez', 'Ciudad de Hurlingham', 'Hurlingham', 'Ituzaingó', 'Ituzaingo', 'José C. Paz', 'Jose C. Paz', 'Lanús', 'Lanus', 'La Plata', 'Luján', 'Lujan', 'Marcos Paz', 'Merlo', 'Moreno', 'Morón', 'Moron', 'Pilar', 'Quilmes', 'San Fernando de la Buena Vista', 'San Fernando', 'San Isidro', 'San Martín', 'San Martin', 'Martínez', 'Martinez', 'San Miguel', 'Ciudad de San Vicente', 'San Vicente', 'Tigre', 'Vicente López', 'Vicente Lopez', 'Zárate', 'Zarate', 'Malvinas Argentinas', 'Almirante Brown', 'Ciudad Autónoma de Buenos Aires', 'Ciudad Autonoma de Buenos Aires', 'CABA', 'Capital Federal', 'Capital', 'Esteban Echeverría', 'Esteban Echeverria', 'Lomas de Zamora'];

  // Loop through the location and check if the city is valid
  const isCityValid = locationData.filter(addressComponent => validCities.find(city => (addressComponent.long_name === city)));

  // If the city is valid, we show the button
  isCityValid.length ? buyButton.classList.add('visible') : '';
}

// Initialize the fn
initialize();