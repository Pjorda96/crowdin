import { render, screen } from '@testing-library/react';
import App from './App';

let component;

beforeEach(() => component = render(<App />));
afterEach(() => component = null);

test('renders modal', () => {
  expect(component).not.toBeUndefined();
});
