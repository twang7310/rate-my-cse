import {render, screen} from '@testing-library/react';
import {GetStringAfterSpace, LevelTab} from './Homepage-components';
import {BrowserRouter as Router} from 'react-router-dom';

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

test('GetWordAfterSpace returns string of text after space', () => {
  const str1 = "CSE 900s"
  const str2 = "100 200"
  const str3 = "CSE 403"
  const str4 = "word1 word2"

  expect(GetStringAfterSpace(str1)).toEqual("900s");
  expect(GetStringAfterSpace(str2)).toEqual("200");
  expect(GetStringAfterSpace(str3)).toEqual("403");
  expect(GetStringAfterSpace(str4)).toEqual("word2");
});
