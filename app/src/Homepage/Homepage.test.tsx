import { render, screen } from '@testing-library/react';
import App from './Homepage';

test('Checks App has correct button names within the sidebar', () => {
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
});
