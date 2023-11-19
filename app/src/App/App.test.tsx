import {render, screen} from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

test('HomeLayout sidebar buttons navigate to correct routes', () => {
  render(<App/>);

  const tabHome = screen.getByText('Home');
  const tab100s = screen.getByText('CSE 100s');
  const tab300s = screen.getByText('CSE 300s');
  const tab400s = screen.getByText('CSE 400s');
  const tab500s = screen.getByText('CSE 500s');

  userEvent.click(tabHome);
  expect(window.location.pathname).toEqual('/');

  userEvent.click(tab100s);
  expect(window.location.pathname).toEqual('/cse100s');

  userEvent.click(tab300s);
  expect(window.location.pathname).toEqual('/cse300s');

  userEvent.click(tab400s);
  expect(window.location.pathname).toEqual('/cse400s');

  userEvent.click(tab500s);
  expect(window.location.pathname).toEqual('/cse500s');
});

test('Header logo navigates to default route', () => {
  render(<App/>);

  const otherTab = screen.getByText('CSE 500s');
  userEvent.click(otherTab);
  expect(window.location.pathname).toEqual('/cse500s');

  const logo = screen.getByText('RateMyCSE');
  userEvent.click(logo);
  expect(window.location.pathname).toEqual('/');
});

test('Sign In navigates to correct route', () => {
  render(<App/>);

  const otherTab = screen.getByText('CSE 400s');
  userEvent.click(otherTab);
  expect(window.location.pathname).toEqual('/cse400s');

  const signin = screen.getByText('Sign In');
  userEvent.click(signin);
  expect(window.location.pathname).toEqual('/login');
});
