import { render, screen } from '@testing-library/react';
import { LevelTab } from './Homepage-components';

test('Renders LevelTab components with correct names', () => {
  render(
    <>
      <LevelTab classlevel='test1' />
      <LevelTab classlevel='random' />
      <LevelTab classlevel='123' />
      <LevelTab classlevel='class' />
    </>
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


