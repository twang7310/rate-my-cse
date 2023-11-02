import {render, screen} from '@testing-library/react';
import App from './App';

test('Checks route paths are correct', () => {
  render(<App />);

  // Routes expected for site
  const expectedRoutes = ['rate-my-cse', 'rate-my-cse/cse100s', 'rate-my-cse/cse300s', 
                  'rate-my-cse/cse400s', 'rate-my-cse/cse500s']

  // Get all Route elements in App
  const routes = document.getElementsByTagName('Routes');

  // Verify all existing routes match expected one
  for (var i = 0; i < routes.length; i++) {
    expect(expectedRoutes).toContain(routes[i].getAttribute('path'));
  }
});

test('Checks routes are in correct order', () => {
  render(<App />);

  // Routes expected for site
  const expectedRoutes = ['rate-my-cse', 'rate-my-cse/cse100s', 'rate-my-cse/cse300s', 
                  'rate-my-cse/cse400s', 'rate-my-cse/cse500s']

  // Get all Route elements in App
  const routes = document.getElementsByTagName('Routes');

  // Routes match expected ordering of routes defined in expectedRoutes
  for (var i = 0; i < routes.length; i++) {
    expect(routes[i].getAttribute('path')).toEqual(expectedRoutes[i]);
    expect(routes[i].compareDocumentPosition(routes[i + 1]) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  }
});
