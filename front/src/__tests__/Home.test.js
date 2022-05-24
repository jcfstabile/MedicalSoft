import { render, screen } from '@testing-library/react';
import userEvent  from '@testing-library/user-event';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from '../Home.js'

test('Render MedicalSoft en Home', () => {
  render(<BrowserRouter> <Home/> </BrowserRouter>
  );
  expect(screen.getByText('MedicalSoft')).toBeInTheDocument();

});

