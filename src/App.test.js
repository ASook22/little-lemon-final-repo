// src/App.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('rener app', () => {
  render(
    <MemoryRouter >
      <App />
    </MemoryRouter>
  );

});