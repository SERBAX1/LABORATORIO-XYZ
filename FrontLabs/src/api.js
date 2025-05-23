const BASE_URL = 'http://localhost:8081/api'; // Cambia este URL si tu backend corre en otro puerto o ruta

// Obtener todos los empleados
export async function fetchEmployees() {
  const response = await fetch(`${BASE_URL}/empleados/todos`); // Updated path
  if (!response.ok) {
    throw new Error('Error al obtener empleados');
  }
  return response.json();
}

// Subir archivo CSV para importación masiva de empleados
export async function uploadEmployeesCSV(formData) {
  const response = await fetch(`${BASE_URL}/empleados/upload-csv`, {
    method: 'POST',
    body: formData, // FormData will automatically set Content-Type to multipart/form-data
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al subir el archivo CSV.');
  }
  return response.json();
}

// Crear nuevo empleado
export async function createEmployee(employee) {
  const response = await fetch(`${BASE_URL}/empleados/registrar`, { // Updated path
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employee),
  });
  if (!response.ok) {
    throw new Error('Error al crear empleado');
  }
  return response.json();
}

// Crear registro de entrada o salida
export async function createRegistro(registro) {
  const response = await fetch(`${BASE_URL}/registros`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(registro),
  });
  if (!response.ok) {
    throw new Error('Error al crear registro');
  }
  return response.json();
}

// Obtener todos los registros de turno
export async function fetchRegistros() {
  const response = await fetch(`${BASE_URL}/registros`);
  if (!response.ok) {
    throw new Error('Error al obtener registros de turno');
  }
  return response.json();
}

// Actualizar empleado existente
export async function updateEmployee(employee) {
  const response = await fetch(`${BASE_URL}/empleados/${employee.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employee),
  });
  if (!response.ok) {
    throw new Error('Error al actualizar empleado');
  }
  return response.json();
}

// Obtener registros de turno por ID de empleado
export async function fetchRegistrosByEmployeeId(employeeId) {
  const response = await fetch(`${BASE_URL}/registros/empleado/${employeeId}`);
  if (response.status === 204) { // Handle No Content
    return [];
  }
  if (!response.ok) {
    throw new Error('Error al obtener registros de turno del empleado');
  }
  return response.json();
}

// Obtener empleado por ID (opcional)
export async function fetchEmployeeById(id) {
  const response = await fetch(`${BASE_URL}/empleados/${id}`);
  if (response.status === 204) { // Handle No Content
    return null; // Or an empty object, depending on expected behavior for not found
  }
  if (!response.ok) {
    throw new Error('Empleado no encontrado');
  }
  return response.json();
}
