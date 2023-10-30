import { render, screen } from '@testing-library/react';
import { LevelTab } from './Homepage-components';

test('Renders LevelTab components with correct names', () => {
  render(
    <>
      <LevelTab classlevel='CSE 100s' />
      <LevelTab classlevel='CSE 300s' />
      <LevelTab classlevel='CSE 400s' />
      <LevelTab classlevel='CSE 500s' />
    </>
  );

  const cse100sLevelTab = screen.getByText('CSE 100s');
  const cse300sLevelTab = screen.getByText('CSE 300s');
  const cse400sLevelTab = screen.getByText('CSE 400s');
  const cse500sLevelTab = screen.getByText('CSE 500s');

  expect(cse100sLevelTab).toBeInTheDocument();
  expect(cse300sLevelTab).toBeInTheDocument();
  expect(cse400sLevelTab).toBeInTheDocument();
  expect(cse500sLevelTab).toBeInTheDocument();
});


