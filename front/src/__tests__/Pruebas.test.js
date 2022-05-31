import { render, screen } from '@testing-library/react';
import userEvent  from '@testing-library/user-event';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from '../Home.js'
import BuscarPaciente from '../BuscarPaciente.js'
import Login from '../Login';
import BusquedaComponent from '../BusquedaComponent.js'

test('Render MedicalSoft en Home', () => {
  render(<BrowserRouter> <Home/> </BrowserRouter>
  );
  expect(screen.getByText('MedicalSoft')).toBeInTheDocument();

});
test('renders login component', () => {
  render(<Login />);
  expect(screen.getByText('INGRESAR')).toBeInTheDocument();

});

test('Render BUSCAR PACIENTE en Ficha de paciente', () => {
  render(<BrowserRouter> <BuscarPaciente /> </BrowserRouter>
  );
  expect(screen.getByText('BUSCAR PACIENTE')).toBeInTheDocument();

});

test('Render Informacion en Ficha de paciente', () => {
  render(<BrowserRouter> <BusquedaComponent /> </BrowserRouter>
  );
  expect(screen.getByText('Informacion')).toBeInTheDocument();

});
