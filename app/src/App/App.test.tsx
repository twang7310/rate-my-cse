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

test('Checks App has correct button names and in order within the sidebar', () => {
  render(<App />);

  // Find the Sidebar element by class name
  const sidebarElement = document.getElementsByClassName('sidebar')[0];

  // Find LevelTabs within Sidebar
  const cse100sLevelTab = screen.getByText('CSE 100s');
  const cse300sLevelTab = screen.getByText('CSE 300s');
  const cse400sLevelTab = screen.getByText('CSE 400s');
  const cse500sLevelTab = screen.getByText('CSE 500s');

  // Check if LevelTabs are within Sidebar
  expect(sidebarElement).toContainElement(cse100sLevelTab);
  expect(sidebarElement).toContainElement(cse300sLevelTab);
  expect(sidebarElement).toContainElement(cse400sLevelTab);
  expect(sidebarElement).toContainElement(cse500sLevelTab);

  // Check the order
  const levelTabs = [cse100sLevelTab, cse300sLevelTab, cse400sLevelTab, cse500sLevelTab];
  for (let i = 0; i < levelTabs.length - 1; i++) {
    // Find out what level we are on, skipping 200-level classes since they don't exist
    let level = i >= 1 ? i + 2 : i + 1;
    expect(sidebarElement).toContainElement(screen.getByText(`CSE ${level * 100}s`));
    expect(levelTabs[i].compareDocumentPosition(levelTabs[i + 1]) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  }
});
