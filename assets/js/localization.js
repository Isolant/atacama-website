const buyButton = document.querySelector('.btn a');

const adjustUI = (data) => {
  const cities = ['Almirante Brown', 'Avellaneda', 'Berazategui', 'Buenos Aires', 'Berisso', 'Brandsen', 'Campana', 'Cañuelas', 'Ensenada', 'Escobar', 'Esteban Echeverría', 'Exaltación de la Cruz', 'Ezeiza', 'Florencio Varela', 'General Las Heras', 'General Rodríguez', 'General San Martín', 'Hurlingham', 'Ituzaingó', 'José C.Paz', 'La Matanza', 'Lanús', 'La Plata', 'Lomas de Zamora', 'Luján', 'Marcos Paz', 'Malvinas Argentinas', 'Moreno', 'Merlo', 'Morón', 'Pilar', 'Presidente Perón', 'Quilmes', 'San Fernando', 'San Isidro', 'San Miguel', 'San Vicente', 'Tigre', 'Tres de Febrero', 'Vicente López', 'Zárate'];

  // If the current location exist on the array, return the fn
  const result = cities.find(city => city === data.city || city === data.state);

  if(result !== undefined) {
    return;
  } else {
    buyButton.classList.add('hidden');
  }
}

const fetchLocation = async () => {
  // Get the data from the API
  const response = await fetch('https://geolocation-db.com/json/0f761a30-fe14-11e9-b59f-e53803842572/');
  const data = await response.json();

  // Then adjust the elements we show on the UI
  adjustUI(data);
};

fetchLocation();
