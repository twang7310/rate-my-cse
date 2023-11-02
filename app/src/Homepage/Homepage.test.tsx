import {render, screen} from '@testing-library/react';
import {GetClassNumber, HomeLayout, LevelTab} from './Homepage';
import {BrowserRouter as Router} from 'react-router-dom';

test('Checks HomeLayout has correct button names and in order within the sidebar', () => {
  render(
    <Router>
      <HomeLayout>placeholder child</HomeLayout>
    </Router>
  );

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

test('Renders LevelTab components with correct names', () => {
  render(
    <div>
      <Router>
        <LevelTab classlevel='test1' />
        <LevelTab classlevel='random' />
        <LevelTab classlevel='123' />
        <LevelTab classlevel='class' />
      </Router>
    </div>
  );

  const tab1 = screen.getByText('test1');
  const tab2 = screen.getByText('random');
  const tab3 = screen.getByText('123');
  const tab4 = screen.getByText('class');

  expect(tab1).toBeInTheDocument();
  expect(tab2).toBeInTheDocument();
  expect(tab3).toBeInTheDocument();
  expect(tab4).toBeInTheDocument();
});

test('GetClassNumber returns class number after space', () => {
  const str1 = "CSE 900s"
  const str2 = "100 200"
  const str3 = "CSE 403"
  const str4 = "CSE 5050505"

  expect(GetClassNumber(str1)).toEqual("900s");
  expect(GetClassNumber(str2)).toEqual("200");
  expect(GetClassNumber(str3)).toEqual("403");
  expect(GetClassNumber(str4)).toEqual("5050505");
});
