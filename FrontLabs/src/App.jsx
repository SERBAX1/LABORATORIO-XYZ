import React, { useState } from 'react';
import Login from './components/login';
import EmployeeList from './components/EmployeeList';
import NewEmployee from './components/NewEmployee';
import RegisterShiftForm from './components/RegisterShiftForm';
import ShiftList from './components/ShiftList';
import EditEmployee from './components/EditEmployee';
import EmployeeShiftHistory from './components/EmployeeShiftHistory';
import Reports from './components/Reports'; // Import Reports
import { createEmployee, updateEmployee } from './api';
import './App.css';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [view, setView] = useState('list'); // 'list', 'new', 'registerShift', 'shiftList', 'edit', 'employeeShiftHistory', o 'reports'
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const [employeeIdForHistory, setEmployeeIdForHistory] = useState(null);

  // Para refrescar la lista tras agregar nuevo empleado
  const [refreshList, setRefreshList] = useState(false);

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="app-container">
      {view === 'list' && (
        <>
          <EmployeeList 
            onLogout={() => setIsLoggedIn(false)} 
            onCreateNew={() => setView('new')}
            onRegisterShift={() => setView('registerShift')}
            onViewShifts={() => setView('shiftList')}
            onEditEmployee={(employee) => {
              setEmployeeToEdit(employee);
              setView('edit');
            }}
            onViewEmployeeHistory={(id) => {
              setEmployeeIdForHistory(id);
              setView('employeeShiftHistory');
            }}
            onGenerateReports={() => setView('reports')} // New prop for generating reports
            refresh={refreshList}
            setRefresh={setRefreshList}
          />
        </>
      )}
      {view === 'new' && (
        <NewEmployee 
          onCancel={() => setView('list')}
          onSave={async (employeeData) => {
            try {
              await createEmployee(employeeData);
              setView('list');
              setRefreshList(!refreshList);
            } catch (error) {
              console.error('Error saving employee:', error);
              alert('Error al guardar empleado. Por favor, inténtalo de nuevo.');
            }
          }}
        />
      )}
      {view === 'edit' && (
        <EditEmployee
          employee={employeeToEdit}
          onCancel={() => {
            setEmployeeToEdit(null);
            setView('list');
          }}
          onSave={async (updatedEmployeeData) => {
            try {
              await updateEmployee(updatedEmployeeData);
              setEmployeeToEdit(null);
              setView('list');
              setRefreshList(!refreshList);
            } catch (error) {
              console.error('Error updating employee:', error);
              alert('Error al actualizar empleado. Por favor, inténtalo de nuevo.');
            }
          }}
        />
      )}
      {view === 'registerShift' && (
        <RegisterShiftForm
          onCancel={() => setView('list')}
          onSave={() => {
            setView('list');
            // No need to refresh employee list for shift registration
          }}
        />
      )}
      {view === 'shiftList' && (
        <ShiftList
          onBack={() => setView('list')}
        />
      )}
      {view === 'employeeShiftHistory' && (
        <EmployeeShiftHistory
          employeeId={employeeIdForHistory}
          onBack={() => {
            setEmployeeIdForHistory(null);
            setView('list');
          }}
        />
      )}
      {view === 'reports' && ( // New view for Reports
        <Reports
          onBack={() => setView('list')}
        />
      )}
    </div>
  );
}
