(() => {
  'use strict';
  const select = document.getElementById('cliente_servicio');
  if (!select || select.value) return;
  // Solo se admiten códigos conocidos. No se cargan datos personales desde la URL.
  const services = {
    alquiler: 'Alquiler de baños portátiles con mantenimiento',
    mantenimiento: 'Mantenimiento de baños portátiles que ya tiene mi empresa',
    residuos: 'Manejo de residuos líquidos',
    pozos: 'Limpieza de pozos sépticos',
    transporte: 'Transporte especializado',
    trampas: 'Limpieza de trampas de grasa'
  };
  const code = new URLSearchParams(window.location.search).get('servicio');
  if (!Object.prototype.hasOwnProperty.call(services, code)) return;
  const option = Array.from(select.options).find(item => item.value === services[code]);
  if (option) select.value = option.value;
})();
